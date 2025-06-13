import { config } from './config';

/**
 * Image processing utility class
 */
export class ImageProcessor {
  /**
   * Compress image to specified quality
   * @param file Original image file
   * @param quality Compression quality (0-1)
   * @param maxWidth Maximum width
   * @param maxHeight Maximum height
   * @returns Promise<Blob> Compressed image
   */
  static async compressImage(
    file: File, 
    quality: number = config.vlm.imageQuality,
    maxWidth: number = 1024,
    maxHeight: number = 1024
  ): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions, maintaining aspect ratio
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw compressed image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            resolve(blob!);
          },
          file.type,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Validate image format
   * @param file Image file
   * @returns boolean Whether format is supported
   */
  static validateImageFormat(file: File): boolean {
    return config.vlm.supportedFormats.includes(file.type);
  }

  /**
   * Validate image size
   * @param file Image file
   * @returns boolean Whether size is within allowed range
   */
  static validateImageSize(file: File): boolean {
    return file.size <= config.vlm.maxImageSize;
  }

  /**
   * Convert file to base64
   * @param file Image file
   * @returns Promise<string> Base64 encoded image
   */
  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Get image dimensions
   * @param file Image file
   * @returns Promise<{width: number, height: number}> Image dimensions
   */
  static async getImageDimensions(file: File): Promise<{width: number, height: number}> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Preprocess image for VLM analysis
   * @param file Original image file
   * @returns Promise<{processedFile: Blob, base64: string, info: any}> Processing result
   */
  static async preprocessForVLM(file: File): Promise<{
    processedFile: Blob;
    base64: string;
    info: {
      originalSize: number;
      processedSize: number;
      dimensions: {width: number, height: number};
      format: string;
    };
  }> {
    // Validate file
    if (!this.validateImageFormat(file)) {
      throw new Error(`Unsupported image format: ${file.type}`);
    }

    if (!this.validateImageSize(file)) {
      throw new Error(`Image file too large, maximum supported size is ${config.vlm.maxImageSize / (1024 * 1024)}MB`);
    }

    // Get original dimensions
    const dimensions = await this.getImageDimensions(file);

    // Compress image (if needed)
    let processedFile: Blob = file;
    if (file.size > 1024 * 1024) { // If larger than 1MB, compress
      processedFile = await this.compressImage(file);
    }

    // Convert to base64
    const processedFileObject = new File([processedFile], file.name, { type: file.type });
    const base64 = await this.fileToBase64(processedFileObject);

    return {
      processedFile,
      base64,
      info: {
        originalSize: file.size,
        processedSize: processedFile.size,
        dimensions,
        format: file.type
      }
    };
  }
}

/**
 * Image drag and drop hook
 */
export const useImageDragDrop = () => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, onFileDrop: (file: File) => void) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      onFileDrop(imageFile);
    }
  };

  return {
    dragProps: {
      onDragOver: handleDragOver,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
    },
    getDragDropProps: (onFileDrop: (file: File) => void) => ({
      onDragOver: handleDragOver,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDrop: (e: React.DragEvent) => handleDrop(e, onFileDrop),
    }),
  };
}; 