'use client';

import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { CameraIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { createWorker } from 'tesseract.js';

export function CardScanner() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedText, setScannedText] = useState('');
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setIsProcessing(true);
        try {
          const worker = await createWorker();
          await worker.loadLanguage('eng');
          await worker.initialize('eng');
          const { data: { text } } = await worker.recognize(imageSrc);
          setScannedText(text);
          await worker.terminate();
        } catch (error) {
          console.error('OCR Error:', error);
        }
        setIsProcessing(false);
        setIsCameraActive(false);
      }
    }
  }, [webcamRef]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      try {
        const worker = await createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(file);
        setScannedText(text);
        await worker.terminate();
      } catch (error) {
        console.error('OCR Error:', error);
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        {isCameraActive ? (
          <div className="space-y-4">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg"
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={capture}
                disabled={isProcessing}
                className="btn-primary"
              >
                Capture
              </button>
              <button
                onClick={() => setIsCameraActive(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <div className="space-y-4 text-center">
                <button
                  onClick={() => setIsCameraActive(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <CameraIcon className="h-5 w-5" />
                  <span>Open Camera</span>
                </button>
                <div className="text-sm text-gray-500">or</div>
                <label className="btn-secondary inline-flex items-center space-x-2 cursor-pointer">
                  <DocumentTextIcon className="h-5 w-5" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="text-center py-4">
            <div className="animate-pulse">Processing...</div>
          </div>
        )}

        {scannedText && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Scanned Text:</h3>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              {scannedText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 