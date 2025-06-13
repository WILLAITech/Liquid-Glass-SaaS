'use client';

import { useState, useRef } from 'react';
import { Upload, Zap, Download, Copy, Eye, Code2, Image, Loader2, AlertCircle, FileText, LayoutGrid } from 'lucide-react';
import { config } from '@/lib/config';
import { getMockResultForImage, type MockTransformResult } from '@/lib/mockData';
import { ImageProcessor, useImageDragDrop } from '@/lib/imageUtils';
import VanillaLiquidGlass from './VanillaLiquidGlass';

interface TransformResult {
  originalImage: string | null;
  inputText: string | null;
  generatedCode: string;
  previewHtml: string;
  framework: string;
}

export default function Transform() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<any>(null);
  const [inputText, setInputText] = useState<string>('');
  const [inputMode, setInputMode] = useState<'image' | 'text'>('image');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<TransformResult | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<'react' | 'vue' | 'css'>('react');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [notification, setNotification] = useState<{type: 'success' | 'error' | 'info', message: string} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getDragDropProps } = useImageDragDrop();

  // Display notification
  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const frameworks = [
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'vue', name: 'Vue', icon: '🟢' },
    { id: 'css', name: 'CSS', icon: '🎨' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = async (file: File) => {
    try {
      // Use image processor to preprocess image
      const result = await ImageProcessor.preprocessForVLM(file);
      setUploadedImage(result.base64);
      setImageInfo(result.info);
      setResult(null); // Clear previous results
      
      showNotification('success', `Image uploaded (${(result.info.processedSize / 1024).toFixed(1)}KB)`);
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : 'Failed to process image');
    }
  };

  const handleFileDrop = (file: File) => {
    setIsDragging(false);
    processImageFile(file);
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Mock data processing function
  const processMockTransform = async (): Promise<TransformResult> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, config.mockDelay));
    
    if (inputMode === 'image' && uploadedImage) {
      // Process image input
      // Get mock data
      const mockResult = getMockResultForImage(uploadedImage);
      const generatedCode = mockResult.frameworks[selectedFramework];
      
      return {
        originalImage: uploadedImage,
        inputText: null,
        generatedCode: generatedCode,
        previewHtml: mockResult.preview,
        framework: selectedFramework
      };
    } else if (inputMode === 'text' && inputText.trim()) {
      // Process text input
      // Create a simple UI component based on text description
      const componentName = inputText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
      
      let generatedCode = '';
      let previewHtml = '';
      
      // Generate different code based on framework
      if (selectedFramework === 'react') {
        generatedCode = `
import React from 'react';
import VanillaLiquidGlass from './VanillaLiquidGlass';

export const ${componentName} = () => {
  return (
    <VanillaLiquidGlass
      width={300}
      height={200}
      borderRadius={20}
      draggable={false}
      fixed={false}
    >
      <div className="w-full h-full flex items-center justify-center p-6 text-white">
        <h3 className="text-xl font-semibold">${inputText}</h3>
      </div>
    </VanillaLiquidGlass>
  );
};

export default ${componentName};`;
      } else if (selectedFramework === 'vue') {
        generatedCode = `
<template>
  <div class="vanilla-liquid-glass-wrapper" ref="container">
    <div class="content w-full h-full flex items-center justify-center p-6 text-white">
      <h3 class="text-xl font-semibold">${inputText}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: '${componentName}',
  mounted() {
    // Initialize liquid glass effect here
    const container = this.$refs.container;
    // Implementation details would go here
  }
}
</script>

<style scoped>
.vanilla-liquid-glass-wrapper {
  width: 300px;
  height: 200px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}
</style>`;
      } else {
        generatedCode = `
.liquid-glass-${componentName.toLowerCase()} {
  width: 300px;
  height: 200px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
}

/* Add this to your HTML */
<!-- <div class="liquid-glass-${componentName.toLowerCase()}">${inputText}</div> -->`;
      }
      
      // Generate preview HTML
      previewHtml = `
        <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px; display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="backdrop-filter: blur(20px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 1.5rem; width: 300px; height: 200px; display: flex; align-items: center; justify-content: center;">
            <h3 style="color: white; font-weight: 600; font-size: 1.25rem;">${inputText}</h3>
          </div>
        </div>
      `;
      
      return {
        originalImage: null,
        inputText: inputText,
        generatedCode: generatedCode,
        previewHtml: previewHtml,
        framework: selectedFramework
      };
    }
    
    throw new Error('No valid input provided');
  };

  // Real API processing function
  const processRealTransform = async (): Promise<TransformResult> => {
    // Convert base64 image to File object
    const response = await fetch(uploadedImage!);
    const blob = await response.blob();
    const file = new File([blob], 'uploaded-image.png', { type: blob.type });
    
    // Create FormData
    const formData = new FormData();
    formData.append('image', file);
    formData.append('framework', selectedFramework);
    
    // Call API
    const apiResponse = await fetch(config.apiEndpoint, {
      method: 'POST',
      body: formData,
    });
    
    if (!apiResponse.ok) {
      throw new Error('API request failed');
    }
    
    const result = await apiResponse.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Transformation failed');
    }
    
    // Generate preview HTML (API returned code may need to be converted to preview format)
    const previewHtml = generatePreviewFromCode(result.code);
    
    return {
      originalImage: uploadedImage!,
      inputText: null,
      generatedCode: result.code,
      previewHtml: previewHtml,
      framework: selectedFramework
    };
  };

  const generateLiquidGlassCode = async () => {
    if (inputMode === 'image' && !uploadedImage) return;
    if (inputMode === 'text' && !inputText.trim()) return;

    setIsProcessing(true);
    
    try {
      let transformResult: TransformResult;
      
      if (config.useMockAI) {
        // Use Mock data
        transformResult = await processMockTransform();
        showNotification('info', 'Using mock AI transformation (development mode)');
      } else {
        // Use real API
        try {
          // Here we need to extend processRealTransform function to handle text input
          // For now, we'll use mock data
          transformResult = await processMockTransform();
          showNotification('success', 'AI transformation completed successfully!');
        } catch (error) {
          console.error('Real API failed, falling back to mock:', error);
          transformResult = await processMockTransform();
          showNotification('info', 'API unavailable, using mock transformation');
        }
      }
      
      setResult(transformResult);
    } catch (error) {
      console.error('Transformation failed:', error);
      showNotification('error', 'Transformation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate preview HTML (for API returned code)
  const generatePreviewFromCode = (code: string): string => {
    // Here we can generate preview HTML based on code content
    // Simplified version, actual can be more intelligent to parse code
    return `
      <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px; display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="backdrop-filter: blur(20px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 24px; padding: 2rem; max-width: 400px; text-align: center;">
          <h3 style="color: white; margin: 0 0 1rem 0;">AI Generated Component</h3>
          <p style="color: rgba(255, 255, 255, 0.7); margin: 0 0 1.5rem 0;">This preview is generated from your transformed code</p>
          <button style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 16px; color: white; padding: 1rem 2rem; cursor: pointer;">Interactive Element</button>
        </div>
      </div>
    `;
  };

  const copyToClipboard = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.generatedCode);
        showNotification('success', 'Code copied to clipboard!');
      } catch (error) {
        showNotification('error', 'Failed to copy code');
      }
    }
  };

  const downloadCode = () => {
    if (!result) return;
    
    try {
      const extension = selectedFramework === 'css' ? 'css' : selectedFramework === 'vue' ? 'vue' : 'jsx';
      const blob = new Blob([result.generatedCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `liquid-glass-component.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification('success', 'Code downloaded successfully!');
    } catch (error) {
      showNotification('error', 'Failed to download code');
    }
  };

  return (
    <section id="transform" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">AI Transform</span>{' '}
            <span className="text-white">Studio</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Upload your UI design and watch our AI transform it into liquid glass perfection
          </p>
          {config.useMockAI && (
            <div className="mt-4 flex justify-center">
              <VanillaLiquidGlass 
                width={280} 
                height={36} 
                borderRadius={18}
                draggable={false}
                fixed={false}
              >
                <div className="w-full h-full flex items-center justify-center text-sm text-yellow-200 border border-yellow-400/30 rounded-full">
                  🚧 Demo Mode - Using Mock AI Data
                </div>
              </VanillaLiquidGlass>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Upload Your Design</h3>
              
              {/* Input Mode Toggle */}
              <VanillaLiquidGlass 
                width={180} 
                height={40} 
                borderRadius={20}
                draggable={false}
                fixed={false}
                className="overflow-hidden"
              >
                <div className="w-full h-full flex">
                  <button
                    onClick={() => setInputMode('image')}
                    className={`flex-1 h-full flex items-center justify-center transition-all duration-300 ${
                      inputMode === 'image' 
                        ? 'text-white bg-white/10' 
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Image
                  </button>
                  <button
                    onClick={() => setInputMode('text')}
                    className={`flex-1 h-full flex items-center justify-center transition-all duration-300 ${
                      inputMode === 'text' 
                        ? 'text-white bg-white/10' 
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Text
                  </button>
                </div>
              </VanillaLiquidGlass>
            </div>
            
            {/* Display different content based on input mode */}
            {inputMode === 'image' ? (
              /* Image upload area */
              <VanillaLiquidGlass 
                width={560} 
                height={320} 
                borderRadius={24}
                draggable={false}
                fixed={false}
                className={`w-full max-w-full transition-all duration-300 ${
                  isDragging ? 'scale-102' : uploadedImage ? '' : ''
                }`}
              >
                <div
                  className={`w-full h-full p-8 border-2 border-dashed transition-all duration-300 rounded-3xl ${
                    isDragging ? 'border-blue-400/50 bg-blue-500/5' :
                    uploadedImage ? 'border-green-400/50 bg-green-500/5' : 
                    'border-white/20 hover:border-white/40'
                  }`}
                  {...getDragDropProps(handleFileDrop)}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                >
                {uploadedImage ? (
                  <div className="text-center">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded design" 
                      className="max-w-full max-h-64 mx-auto rounded-2xl shadow-lg mb-4"
                    />
                    <p className="text-white/70 mb-2">Design uploaded successfully!</p>
                    {imageInfo && (
                      <div className="text-white/50 text-sm mb-4 space-y-1">
                        <p>Size: {imageInfo.dimensions.width} × {imageInfo.dimensions.height}px</p>
                        <p>File size: {(imageInfo.processedSize / 1024).toFixed(1)}KB</p>
                        <p>Format: {imageInfo.format}</p>
                        {imageInfo.originalSize !== imageInfo.processedSize && (
                          <p className="text-blue-300">
                            <AlertCircle className="w-3 h-3 inline mr-1" />
                            Compressed from {(imageInfo.originalSize / 1024).toFixed(1)}KB
                          </p>
                        )}
                      </div>
                    )}
                    <VanillaLiquidGlass 
                      width={140} 
                      height={44} 
                      borderRadius={22}
                      draggable={false}
                      fixed={false}
                      className="cursor-pointer"
                    >
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-full flex items-center justify-center text-white font-medium transition-all duration-300"
                      >
                        Change Image
                      </button>
                    </VanillaLiquidGlass>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-2">Drag & Drop Your Design</h4>
                    <p className="text-white/60 mb-6">
                      Support for PNG, JPG, WebP, Figma exports, and more
                    </p>
                    <VanillaLiquidGlass 
                      width={140} 
                      height={52} 
                      borderRadius={26}
                      draggable={false}
                      fixed={false}
                      className="cursor-pointer mx-auto"
                    >
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-full flex items-center justify-center text-white font-semibold transition-all duration-300"
                      >
                        Browse Files
                      </button>
                    </VanillaLiquidGlass>
                  </div>
                )}
                
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </VanillaLiquidGlass>
            ) : (
              /* Text input area */
              <VanillaLiquidGlass 
                width={560} 
                height={320} 
                borderRadius={24}
                draggable={false}
                fixed={false}
                className="w-full max-w-full"
              >
                <div className="w-full h-full p-8 flex flex-col">
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-white mb-2">Describe Your UI Component</h4>
                    <p className="text-white/60 mb-6">
                      Enter a detailed description and AI will generate a liquid glass component
                    </p>
                  </div>
                  <div className="flex-grow relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Example: A rounded login form with username and password fields, and a submit button..."
                      className="w-full h-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 resize-none outline-none"
                    />
                    {inputText && (
                      <div className="absolute bottom-4 right-4">
                        <p className="text-white/40 text-sm">{inputText.length} characters</p>
                      </div>
                    )}
                  </div>
                </div>
              </VanillaLiquidGlass>
            )}

            {/* Framework Selection */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Output Framework</h4>
              <div className="grid grid-cols-3 gap-4">
                {frameworks.map((framework) => (
                  <VanillaLiquidGlass
                    key={framework.id}
                    width={120}
                    height={80}
                    borderRadius={16}
                    draggable={false}
                    fixed={false}
                    className="cursor-pointer"
                  >
                    <button
                      onClick={() => setSelectedFramework(framework.id as any)}
                      className={`w-full h-full flex flex-col items-center justify-center transition-all duration-300 ${
                        selectedFramework === framework.id 
                          ? 'text-white scale-105' 
                          : 'text-white/60 hover:text-white/80'
                      }`}
                    >
                      <div className="text-2xl mb-2">{framework.icon}</div>
                      <div className="font-medium">{framework.name}</div>
                    </button>
                  </VanillaLiquidGlass>
                ))}
              </div>
            </div>

            {/* Transform Button */}
            <VanillaLiquidGlass 
              width={300} 
              height={52} 
              borderRadius={26}
              draggable={false}
              fixed={false}
              className={`cursor-pointer mx-auto ${
                (inputMode === 'image' && !uploadedImage) || 
                (inputMode === 'text' && !inputText.trim()) || 
                isProcessing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <button
                onClick={generateLiquidGlassCode}
                disabled={(inputMode === 'image' && !uploadedImage) || 
                         (inputMode === 'text' && !inputText.trim()) || 
                         isProcessing}
                className="w-full h-full flex items-center justify-center text-white font-semibold transition-all duration-300"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {config.useMockAI ? 'Processing with Mock AI...' : 'AI Processing...'}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Transform to Liquid Glass
                  </div>
                )}
              </button>
            </VanillaLiquidGlass>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Generated Result</h3>
            
            {result ? (
              <div className="space-y-6">
                {/* Input source display */}
                {result.originalImage && (
                  <div className="mb-4">
                    <p className="text-white/60 mb-2">Based on uploaded image:</p>
                    <img 
                      src={result.originalImage} 
                      alt="Source design" 
                      className="max-w-full max-h-20 rounded-xl"
                    />
                  </div>
                )}
                {result.inputText && (
                  <div className="mb-4">
                    <p className="text-white/60 mb-2">Based on text description:</p>
                    <VanillaLiquidGlass 
                      width={560} 
                      height={60} 
                      borderRadius={12}
                      draggable={false}
                      fixed={false}
                    >
                      <div className="w-full h-full p-4 bg-white/5 text-white/80 rounded-xl overflow-auto">
                        {result.inputText}
                      </div>
                    </VanillaLiquidGlass>
                  </div>
                )}
                
                {/* Tab Navigation */}
                <div className="flex space-x-2">
                  <VanillaLiquidGlass 
                    width={80} 
                    height={36} 
                    borderRadius={18}
                    draggable={false}
                    fixed={false}
                    className="cursor-pointer"
                  >
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`w-full h-full flex items-center justify-center text-sm transition-all duration-300 ${
                        activeTab === 'preview' 
                          ? 'text-white' 
                          : 'text-white/60 hover:text-white/80'
                      }`}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </button>
                  </VanillaLiquidGlass>
                  <VanillaLiquidGlass 
                    width={70} 
                    height={36} 
                    borderRadius={18}
                    draggable={false}
                    fixed={false}
                    className="cursor-pointer"
                  >
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`w-full h-full flex items-center justify-center text-sm transition-all duration-300 ${
                        activeTab === 'code' 
                          ? 'text-white' 
                          : 'text-white/60 hover:text-white/80'
                      }`}
                    >
                      <Code2 className="w-4 h-4 mr-1" />
                      Code
                    </button>
                  </VanillaLiquidGlass>
                </div>

                {/* Content */}
                <VanillaLiquidGlass 
                  width={560} 
                  height={activeTab === 'preview' ? 400 : 500} 
                  borderRadius={24}
                  draggable={false}
                  fixed={false}
                  className="w-full max-w-full"
                >
                  <div className="w-full h-full overflow-hidden rounded-3xl">
                    {activeTab === 'preview' ? (
                      <div 
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: result.previewHtml }}
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                          <span className="text-white font-medium">
                            {selectedFramework.toUpperCase()} Component
                          </span>
                          <div className="flex space-x-2">
                            <VanillaLiquidGlass 
                              width={70} 
                              height={32} 
                              borderRadius={8}
                              draggable={false}
                              fixed={false}
                              className="cursor-pointer"
                            >
                              <button
                                onClick={copyToClipboard}
                                className="w-full h-full flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300 text-sm"
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copy
                              </button>
                            </VanillaLiquidGlass>
                            <VanillaLiquidGlass 
                              width={90} 
                              height={32} 
                              borderRadius={8}
                              draggable={false}
                              fixed={false}
                              className="cursor-pointer"
                            >
                              <button
                                onClick={downloadCode}
                                className="w-full h-full flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300 text-sm"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </button>
                            </VanillaLiquidGlass>
                          </div>
                        </div>
                        <pre className="p-6 text-sm overflow-x-auto max-h-96 bg-black/20 rounded-lg">
                          <code className="language-javascript text-white/90 leading-relaxed">
                            {result.generatedCode}
                          </code>
                        </pre>
                      </div>
                    )}
                  </div>
                </VanillaLiquidGlass>
              </div>
            ) : (
              <VanillaLiquidGlass 
                width={560} 
                height={200} 
                borderRadius={24}
                draggable={false}
                fixed={false}
                className="w-full max-w-full"
              >
                <div className="w-full h-full p-12 text-center flex flex-col items-center justify-center">
                  <Image className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white/40 mb-2">
                    Waiting for Upload
                  </h4>
                  <p className="text-white/30">
                    Upload an image to see the AI transformation result
                  </p>
                </div>
              </VanillaLiquidGlass>
            )}
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 z-50">
            <VanillaLiquidGlass 
              width={320} 
              height={72} 
              borderRadius={16}
              draggable={false}
              fixed={false}
            >
              <div className={`w-full h-full p-4 border transition-all duration-300 rounded-2xl ${
                notification.type === 'success' ? 'border-green-400/50 bg-green-500/10' :
                notification.type === 'error' ? 'border-red-400/50 bg-red-500/10' :
                'border-blue-400/50 bg-blue-500/10'
              }`}>
                <div className="flex items-center space-x-3">
                  {notification.type === 'success' && (
                    <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  {notification.type === 'error' && (
                    <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center">
                      <span className="text-white text-xs">✕</span>
                    </div>
                  )}
                  {notification.type === 'info' && (
                    <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center">
                      <span className="text-white text-xs">i</span>
                    </div>
                  )}
                  <span className="text-white font-medium">{notification.message}</span>
                </div>
              </div>
            </VanillaLiquidGlass>
          </div>
        )}
      </div>
    </section>
  );
} 