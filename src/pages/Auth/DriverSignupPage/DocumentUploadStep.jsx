import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
];

export function DocumentUploadStep({ formData = {}, setFormData }) {
  const [files, setFiles] = useState(() => formData.documents || []);
  const [errors, setErrors] = useState([]);

  // ✅ Keep local file list synced to parent formData, without triggering auto-submit
  useEffect(() => {
    if (setFormData) {
      setFormData((prev) => ({ ...prev, documents: files }));
    }
  }, [files, setFormData]);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    const newErrors = [];

    // Handle rejected files
    fileRejections.forEach((rej) => {
      rej.errors.forEach((e) => {
        newErrors.push(`${rej.file.name}: ${e.message}`);
      });
    });

    // Validate and prepare accepted files
    const validFiles = acceptedFiles
      .map((file) => {
        if (!ACCEPTED_TYPES.includes(file.type) && file.type !== "") {
          newErrors.push(`${file.name}: unsupported file type`);
          return null;
        }
        if (file.size > MAX_FILE_SIZE) {
          newErrors.push(
            `${file.name}: exceeds ${(MAX_FILE_SIZE / (1024 * 1024)).toFixed(1)} MB`
          );
          return null;
        }

        const preview = file.type.startsWith("image/")
          ? Object.assign(file, { preview: URL.createObjectURL(file) })
          : file;

        return preview;
      })
      .filter(Boolean);

    // ✅ Don’t trigger form submission — just update state
    setErrors((prev) => [...prev, ...newErrors]);
    setFiles((prev) => [...prev, ...validFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: MAX_FILE_SIZE,
    multiple: true,
    noClick: true, // prevent auto click behavior
    noKeyboard: true, // avoid Enter key triggering
  });

  const removeFile = (index) => {
    setFiles((prev) => {
      const next = prev.slice();
      const f = next.splice(index, 1)[0];
      if (f?.preview) URL.revokeObjectURL(f.preview);
      return next;
    });
  };

  useEffect(() => {
    return () => {
      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">
          Step 2: Document Upload
        </h2>

        <div className="space-y-4">
          <div className="text-sm">
            <p className="font-medium text-text1 mb-2">Required Documents:</p>
            <ul className="list-disc list-inside space-y-1 text-text2">
              <li>Commercial Driver's License (CDL)</li>
              <li>Medical Certificate</li>
              <li>Insurance Certificate</li>
              <li>Vehicle Registration</li>
              <li>IRP Registration (if applicable)</li>
              <li>Proof of Van Ownership</li>
              <li>VIN Number of the Vehicle</li>
            </ul>
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragActive ? "border-green-400 bg-white/5" : "border-white/30"
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-gray-400 mb-2">
              <svg
                className="mx-auto h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="text-lg font-medium text-white mb-1">
              {isDragActive ? "Drop files here" : "Upload Required Documents"}
            </div>
            <div className="text-sm text-text2 mb-4">
              Drag & drop files here, or click below to select files.
              <br />
              Accepted: PDF, JPG, PNG, WEBP, DOC, DOCX, ZIP — Max 10MB each.
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={open} // ✅ manually open file picker
              className="mx-auto"
            >
              Choose Files
            </Button>
          </div>

          {errors.length > 0 && (
            <div className="text-sm text-rose-400 space-y-1">
              {errors.map((e, i) => (
                <div key={i}>{e}</div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 bg-white/5 rounded"
                >
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-20 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-14 flex items-center justify-center bg-white/10 rounded text-sm text-text2">
                      {file.name.split(".").pop()?.toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-white truncate">
                      {file.name}
                    </div>
                    <div className="text-xs text-text2">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-sm text-rose-400 underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentUploadStep;
