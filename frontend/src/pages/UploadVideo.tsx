import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileVideo, X, CheckCircle, ArrowLeft, Film, HardDrive, BarChart3, Car, Layers, Gauge, Activity } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Progress } from "../components/ui/progress";
import { cn } from "../lib/utils";
import { processVideo } from "@/services/videoService";
import { toast } from "sonner";
import type { MLResponseData } from "@/schema/videoSchema";

const UploadVideo = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [mlResult, setMlResult] = useState<MLResponseData>();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("video/")) {
      setSelectedFile(file);
      setUploadComplete(false);
      setUploadProgress(0);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const data = await processVideo({ file: selectedFile!, onProgress: setUploadProgress });
      console.log("Data: ", data);
      setMlResult(data?.data);
      toast.success("Video process successfully!");
    } catch (error) {
      toast.error("Error while procssing the video!");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  console.log("Progress: ", uploadProgress);

  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/recorded")}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Upload Traffic Video</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Upload a video file for traffic congestion analysis
            </p>
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={cn(
            "glass-card rounded-xl p-8 border-2 border-dashed transition-all duration-300",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!selectedFile ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Drag and drop your video here
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Supports MP4, AVI, MOV, MKV files up to 500MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all glow-blue"
              >
                Browse Files
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Selected File Info */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileVideo className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />
                        {formatFileSize(selectedFile.size)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Film className="w-3 h-3" />
                        {selectedFile.type.split("/")[1]?.toUpperCase() || "VIDEO"}
                      </span>
                    </div>
                  </div>
                </div>
                {!isUploading && !uploadComplete && (
                  <button
                    onClick={removeFile}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                {uploadComplete && (
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Uploaded</span>
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {(isUploading || uploadProgress > 0) && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Upload Progress</span>
                    <span className="text-foreground font-medium">
                      {Math.min(100, Math.round(uploadProgress))}%
                    </span>
                  </div>
                  <Progress value={Math.min(100, uploadProgress)} className="h-2" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                {!uploadComplete ? (
                  <>
                    <button
                      onClick={simulateUpload}
                      disabled={isUploading}
                      className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all glow-blue disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? (uploadProgress >= 100 ? "Processing frames with AI detection…" : "Uploading...") : "Start Upload & Analysis"}
                    </button>
                    <button
                      onClick={removeFile}
                      disabled={isUploading}
                      className="px-6 py-3 rounded-lg border border-border text-muted-foreground font-medium hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/recorded")}
                      className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all glow-blue"
                    >
                      View Analysis Results
                    </button>
                    <button
                      onClick={removeFile}
                      className="px-6 py-3 rounded-lg border border-border text-muted-foreground font-medium hover:bg-muted transition-colors"
                    >
                      Upload Another
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {uploadComplete && mlResult && (
          <div className="glass-card rounded-xl p-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground text-lg">ML Model Analysis Results</h3>
              <span className={cn(
                "ml-auto px-3 py-1 rounded-full text-xs font-semibold",
                mlResult?.congestion_level === "Low" ? "status-online" :
                  mlResult?.congestion_level === "Medium" ? "bg-warning/20 text-warning border border-warning/30" :
                    "status-offline"
              )}>
                {mlResult?.congestion_level} Congestion
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Average Car Count", value: mlResult?.avg_card_count, icon: Car, unit: "" },
                { label: "Total Frames", value: mlResult?.total_frames.toLocaleString(), icon: Layers, unit: "" },
                { label: "Motion Score", value: mlResult?.motion_score, icon: Activity, unit: "/100" },
                { label: "Vehicle Density", value: mlResult?.vehicle_denisty, icon: Gauge, unit: "%" },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-muted/40 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{item.value}{item.unit}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supported Formats Info */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Supported Formats & Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm font-medium text-foreground mb-1">Video Formats</p>
              <p className="text-sm text-muted-foreground">MP4, AVI, MOV, MKV, WMV</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm font-medium text-foreground mb-1">Max File Size</p>
              <p className="text-sm text-muted-foreground">500 MB per video</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm font-medium text-foreground mb-1">Resolution</p>
              <p className="text-sm text-muted-foreground">Up to 4K (3840x2160)</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadVideo;
