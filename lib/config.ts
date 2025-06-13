// Development configuration
export const isDevelopment = process.env.NODE_ENV === 'development';

// AI API Configuration
export const USE_MOCK_AI = process.env.NEXT_PUBLIC_USE_MOCK_AI === 'true' || isDevelopment;

// Mock data settings
export const MOCK_PROCESSING_DELAY = 2000; // 2 seconds to simulate AI processing

// VLM API Configuration
export const VLM_CONFIG = {
  apiUrl: process.env.VLM_API_URL || 'https://api.openai.com/v1',
  apiKey: process.env.VLM_API_KEY || '',
  model: process.env.VLM_MODEL || 'gpt-4-vision-preview',
  maxTokens: parseInt(process.env.VLM_MAX_TOKENS || '2000'),
  temperature: parseFloat(process.env.VLM_TEMPERATURE || '0.7'),
  // Image processing configuration
  maxImageSize: 1024 * 1024 * 4, // 4MB maximum image size
  supportedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  imageQuality: 0.8, // Compression quality
};

export const config = {
  useMockAI: USE_MOCK_AI,
  mockDelay: MOCK_PROCESSING_DELAY,
  apiEndpoint: '/api/transform',
  vlm: VLM_CONFIG
}; 