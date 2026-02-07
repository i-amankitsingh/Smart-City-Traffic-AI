import { useState } from "react";
import { Upload, Play, FileVideo, Eye, Car, Activity, Gauge, AlertTriangle, Clock, CheckCircle, Loader2 } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { cn } from "../lib/utils";

interface ProcessedVideo {
  id: number;
  name: string;
  dateUploaded: string;
  status: "Processing" | "Completed" | "Failed";
  congestionLevel: "Low" | "Medium" | "High";
  metrics?: {
    totalFrames: number;
    avgCarCount: number;
    vehicleDensity: number;
    motionScore: number;
  };
}

const mockVideos: ProcessedVideo[] = [
  {
    id: 1,
    name: "highway_morning_traffic.mp4",
    dateUploaded: "2024-01-15",
    status: "Completed",
    congestionLevel: "High",
    metrics: { totalFrames: 18540, avgCarCount: 42, vehicleDensity: 78, motionScore: 65 },
  },
  {
    id: 2,
    name: "intersection_peak_hours.mp4",
    dateUploaded: "2024-01-14",
    status: "Completed",
    congestionLevel: "Medium",
    metrics: { totalFrames: 12800, avgCarCount: 28, vehicleDensity: 52, motionScore: 48 },
  },
  {
    id: 3,
    name: "market_area_weekend.mp4",
    dateUploaded: "2024-01-13",
    status: "Processing",
    congestionLevel: "Low",
  },
  {
    id: 4,
    name: "downtown_evening.mp4",
    dateUploaded: "2024-01-12",
    status: "Completed",
    congestionLevel: "Low",
    metrics: { totalFrames: 9200, avgCarCount: 15, vehicleDensity: 28, motionScore: 32 },
  },
];

const RecordedAnalysis = () => {
  const [selectedVideo, setSelectedVideo] = useState<ProcessedVideo | null>(null);

  const getCongestionColor = (level: string) => {
    switch (level) {
      case "Low":
        return "status-online";
      case "Medium":
        return "bg-warning/20 text-warning border border-warning/30";
      case "High":
        return "status-offline";
      default:
        return "status-online";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "Processing":
        return <Loader2 className="w-4 h-4 text-warning animate-spin" />;
      case "Failed":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Recorded Video Analysis</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Upload and analyze traffic recordings
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all glow-blue">
            <Upload className="w-4 h-4" />
            Upload Traffic Video
          </button>
        </div>

        {/* Video Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Processed Videos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Video Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date Uploaded</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Congestion</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockVideos.map((video) => (
                  <tr
                    key={video.id}
                    className={cn(
                      "border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer",
                      selectedVideo?.id === video.id && "bg-primary/5"
                    )}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileVideo className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">{video.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {video.dateUploaded}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(video.status)}
                        <span className="text-sm text-foreground">{video.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getCongestionColor(video.congestionLevel))}>
                        {video.congestionLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVideo(video);
                        }}
                      >
                        <Eye className="w-4 h-4 text-primary" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Video Analysis */}
        {selectedVideo && selectedVideo.status === "Completed" && selectedVideo.metrics && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{selectedVideo.name}</h3>
                </div>
              </div>
              <div className="aspect-video bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">Video playback simulation</p>
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Analysis Results
                </h3>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Frames</span>
                    <span className="font-semibold text-foreground">{selectedVideo.metrics.totalFrames.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Car Count</span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Car className="w-4 h-4 text-primary" />
                      {selectedVideo.metrics.avgCarCount}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Vehicle Density</span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Gauge className="w-4 h-4 text-primary" />
                      {selectedVideo.metrics.vehicleDensity}%
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Motion Score</span>
                    <span className="font-semibold text-foreground">{selectedVideo.metrics.motionScore}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Congestion Prediction</span>
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getCongestionColor(selectedVideo.congestionLevel))}>
                      {selectedVideo.congestionLevel}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-4 py-2.5 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-colors">
                  View Model Explainability
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RecordedAnalysis;
