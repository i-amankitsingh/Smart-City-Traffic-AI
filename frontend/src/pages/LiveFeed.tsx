import { useState, useEffect } from "react";
import { Play, Square, Camera, Car, Activity, Gauge, AlertTriangle } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { cn } from "../lib/utils";

const cameras = [
  { id: 1, name: "Camera 1 – Highway", location: "Interstate 95" },
  { id: 2, name: "Camera 2 – Intersection", location: "Main St & 5th Ave" },
  { id: 3, name: "Camera 3 – Market Area", location: "Downtown District" },
];

const LiveFeed = () => {
  const [selectedCamera, setSelectedCamera] = useState(cameras[0]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [metrics, setMetrics] = useState({
    carsDetected: 0,
    vehicleDensity: 0,
    motionScore: 0,
    congestionLevel: "Low" as "Low" | "Medium" | "High",
  });

  // Simulate real-time metrics updates
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const carsDetected = Math.floor(Math.random() * 50) + 10;
      const vehicleDensity = Math.floor(Math.random() * 100);
      const motionScore = Math.floor(Math.random() * 100);
      
      let congestionLevel: "Low" | "Medium" | "High" = "Low";
      if (vehicleDensity > 70) congestionLevel = "High";
      else if (vehicleDensity > 40) congestionLevel = "Medium";

      setMetrics({ carsDetected, vehicleDensity, motionScore, congestionLevel });
    }, 2000);

    return () => clearInterval(interval);
  }, [isStreaming]);

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

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Live CCTV Feed</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor real-time traffic from connected cameras
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Video Player */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card rounded-xl overflow-hidden">
              {/* Video Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Live CCTV Feed</h2>
                  {isStreaming && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>
              </div>

              {/* Video Area */}
              <div className="aspect-video bg-black/50 flex items-center justify-center">
                {isStreaming ? (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-foreground font-medium">{selectedCamera.name}</p>
                    <p className="text-muted-foreground text-sm">{selectedCamera.location}</p>
                    <p className="text-primary text-xs mt-2">Simulated stream active</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No active stream</p>
                    <p className="text-muted-foreground/60 text-sm">Select a camera and start streaming</p>
                  </div>
                )}
              </div>
            </div>

            {/* Camera Selection & Controls */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Camera Dropdown */}
                <div className="flex-1">
                  <label className="block text-sm text-muted-foreground mb-2">Select Camera</label>
                  <select
                    value={selectedCamera.id}
                    onChange={(e) => {
                      const camera = cameras.find((c) => c.id === Number(e.target.value));
                      if (camera) setSelectedCamera(camera);
                    }}
                    className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {cameras.map((camera) => (
                      <option key={camera.id} value={camera.id}>
                        {camera.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-3 sm:self-end">
                  <button
                    onClick={() => setIsStreaming(true)}
                    disabled={isStreaming}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all",
                      isStreaming
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 glow-blue"
                    )}
                  >
                    <Play className="w-4 h-4" />
                    Start Stream
                  </button>
                  <button
                    onClick={() => setIsStreaming(false)}
                    disabled={!isStreaming}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all border",
                      !isStreaming
                        ? "bg-muted border-muted text-muted-foreground cursor-not-allowed"
                        : "bg-transparent border-destructive text-destructive hover:bg-destructive/10"
                    )}
                  >
                    <Square className="w-4 h-4" />
                    Stop Stream
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Real-time Metrics */}
          <div className="space-y-4">
            <div className="glass-card rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Real-time Metrics
              </h3>

              <div className="space-y-4">
                {/* Cars Detected */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Cars Detected</span>
                    <Car className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{metrics.carsDetected}</p>
                </div>

                {/* Vehicle Density */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Vehicle Density</span>
                    <Gauge className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{metrics.vehicleDensity}%</p>
                  <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${metrics.vehicleDensity}%` }}
                    />
                  </div>
                </div>

                {/* Motion Score */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Motion Score</span>
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{metrics.motionScore}</p>
                </div>

                {/* Congestion Level */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Congestion Level</span>
                    <AlertTriangle className="w-4 h-4 text-primary" />
                  </div>
                  <span className={cn("px-3 py-1.5 rounded-full text-sm font-medium", getCongestionColor(metrics.congestionLevel))}>
                    {metrics.congestionLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveFeed;
