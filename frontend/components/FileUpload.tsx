import React, { useCallback, useState } from "react";
import { Upload, X, FileText, Image, File } from "lucide-react";

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
  existingFiles?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  maxFiles = 5,
  maxSize = 10,
  acceptedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".gif"],
  existingFiles = [],
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `${file.name} exceeds ${maxSize}MB limit`;
    }

    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      return `${file.name} has unsupported file type`;
    }

    return null;
  };

  const handleFiles = (newFiles: FileList) => {
    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];
    const newErrors: string[] = [];

    fileArray.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else if (files.length + validFiles.length < maxFiles) {
        validFiles.push(file);
      }
    });

    setErrors(newErrors);

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        handleFiles(droppedFiles);
      }
    },
    [files, maxFiles],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      handleFiles(selectedFiles);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <Image className="h-5 w-5 text-blue-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
        } hover:border-gray-400`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-600">
            Drag & drop files here or{" "}
            <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
              browse
              <input
                type="file"
                className="hidden"
                multiple
                accept={acceptedTypes.join(",")}
                onChange={handleFileInput}
              />
            </label>
          </p>
          <p className="text-xs text-gray-500">
            Max {maxFiles} files, {maxSize}MB each
          </p>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mt-2 space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Selected Files:</h4>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                {getFileIcon(file.name)}
                <span className="text-sm text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)}MB)</span>
              </div>
              <button type="button" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {existingFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Existing Files:</h4>
          {existingFiles.map((file, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              {getFileIcon(file)}
              <span className="text-sm text-gray-700">{file}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
