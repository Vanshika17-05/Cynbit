"use client";

import * as React from "react";
import { UploadCloud, CheckCircle2, FileText, AlertTriangle, Loader2 } from "lucide-react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ActionChecklistItem } from "@/types/candidate";
import { toast } from "sonner";

interface DocumentUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ActionChecklistItem | null;
  candidateId: string;
  onSuccess: (actionId: string, fileName: string) => void;
}

export function DocumentUploadModal({
  open,
  onOpenChange,
  item,
  candidateId,
  onSuccess,
}: DocumentUploadModalProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) {
      setFile(null);
      setProgress(0);
      setUploading(false);
    }
  }, [open]);

  if (!item) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setProgress(15);

    // Simulate progressive network upload
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 250);

    try {
      const res = await fetch("/api/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId,
          actionId: item.id,
          fileName: file.name,
          fileSize: file.size,
          status: "completed",
        }),
      });

      clearInterval(interval);
      setProgress(100);

      const data = await res.json();
      if (data.success) {
        toast.success(`"${file.name}" uploaded successfully!`);
        onSuccess(item.id, file.name);
        setTimeout(() => {
          onOpenChange(false);
        }, 500);
      } else {
        toast.error(data.error || "Upload failed. Please try again.");
      }
    } catch {
      toast.error("Network error while uploading document.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{item.title}</DialogTitle>
        <DialogDescription>{item.description}</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-2">
        {/* Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            isDragOver
              ? "border-cynbit-500 bg-cynbit-50/80 dark:bg-cynbit-950/40"
              : file
              ? "border-emerald-500/80 bg-emerald-50/40 dark:bg-emerald-950/20"
              : "border-slate-300 dark:border-slate-700 hover:border-cynbit-400 bg-slate-50/50 dark:bg-slate-900/40"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={item.meta?.allowedFormats?.join(",") || ".pdf,.png,.jpg"}
            className="hidden"
          />

          {file ? (
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <FileText className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 max-w-xs truncate">
                {file.name}
              </p>
              <p className="text-xs text-slate-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to submit
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-cynbit-100 dark:bg-cynbit-950/60 flex items-center justify-center text-cynbit-600 dark:text-cynbit-400">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Click to browse or drag and drop
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Supported formats: PDF, PNG, JPG (Max 10MB)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Upload Progress Bar */}
        {uploading && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Uploading to secure Cynbit Vault...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-cynbit-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={uploading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          isLoading={uploading}
        >
          Confirm & Upload
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
