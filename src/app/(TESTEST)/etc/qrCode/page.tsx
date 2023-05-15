'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useQRCode } from 'next-qrcode';
import { toast } from 'react-hot-toast';

const DEFAULT_OPTIONS = {
  level: 'M',
  margin: 3,
  scale: 4,
  width: 200,
  color: {
    dark: '#000000FF',
    light: '#FFFFFFFF',
  },
};

function QRCodePage() {
  const [text, setText] = useState('https://fortunegpt.cc');
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [colors, setColors] = useState({
    dark: options.color.dark,
    light: options.color.light,
  });

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (...args: any[]) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  //디바운서로 색상 변경
  const debouncedSetColor = useMemo(
    () =>
      debounce((colorType: 'dark' | 'light', colorValue: string) => {
        setColors((prev) => ({ ...prev, [colorType]: colorValue }));
      }, 20),
    [],
  );

  useEffect(() => {
    setOptions((prev) => ({ ...prev, color: colors }));
  }, [colors]);

  const { Canvas } = useQRCode();
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [debouncedSetOptions, setDebouncedSetOptions] = useState(() => debounce(setOptions, 250));

  //기본값으로 생성하는 url
  useEffect(() => {
    if (text) {
      const canvas = document.getElementsByTagName('canvas')[0];
      if (canvas) {
        setImageDataUrl(canvas.toDataURL());
      }
    }
  }, [text, options]);

  //초기값 설정
  useEffect(() => {
    const savedOptions = localStorage.getItem('options');
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions));
    }
  }, []);

  //로컬 스토리지에 옵션저장
  useEffect(() => {
    localStorage.setItem('options', JSON.stringify(options));
  }, [options]);

  //설정리셋
  const handleResetColors = () => {
    debouncedSetOptions(DEFAULT_OPTIONS);
  };

  const handleCopyAndDownload = async () => {
    if (imageDataUrl) {
      // Convert imageDataUrl to Blob
      const res = await fetch(imageDataUrl);
      const blob = await res.blob();

      // Copy to clipboard
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        toast.success('클립보드에 복사했어요');
      } catch (err) {
        // If image copy fails, copy the URL text instead
        navigator.clipboard.writeText(text);
        toast.success('클립보드에 복사했어요');
      }

      // Download
      const a = document.createElement('a');
      a.href = imageDataUrl;
      a.download = 'qrcode.png';
      a.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-5 text-gray-800 dark:text-white text-center">
        QR Code Generator
      </h1>
      <form onSubmit={(e) => e.preventDefault()} className="mb-5 space-y-3">
        <div className="flex items-center space-x-4">
          <label className="text-gray-800 dark:text-white">URL:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="URL"
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
          />
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-gray-800 dark:text-white">Dark Color:</label>
            <input
              type="color"
              value={options.color.dark}
              onChange={(e) => debouncedSetColor('dark', e.target.value)}
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-gray-800 dark:text-white">Light Color:</label>
            <input
              type="color"
              value={options.color.light}
              onChange={(e) => debouncedSetColor('light', e.target.value)}
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-gray-800 dark:text-white">Margin:</label>
          <input
            type="range"
            min="0"
            max="10"
            value={10 - options.margin}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, margin: 10 - parseInt(e.target.value) }))
            }
            className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
          />
        </div>

        <div className="flex items-center space-x-2 justify-center">
          <label className="text-gray-800 dark:text-white">Width:</label>
          <input
            type="range"
            min="50"
            max="1000"
            value={options.width}
            onChange={(e) => setOptions((prev) => ({ ...prev, width: parseInt(e.target.value) }))}
            className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleResetColors}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleCopyAndDownload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Copy & Download
          </button>
        </div>
      </form>
      {text && <Canvas text={text} options={options} />}
    </div>
  );
}

export default QRCodePage;
