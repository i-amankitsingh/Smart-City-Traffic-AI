

// import { useState, useEffect } from "react";
// import { Play, Square, Camera, Car, Activity, Gauge, AlertTriangle } from "lucide-react";
// import { DashboardLayout } from "../components/layout/DashboardLayout";
// import { cn } from "../lib/utils";

// const cameras = [
//   { id: 1, name: "Camera 1 – Highway", location: "Interstate 95" },
//   { id: 2, name: "Camera 2 – Intersection", location: "Main St & 5th Ave" },
//   { id: 3, name: "Camera 3 – Market Area", location: "Downtown District" },
// ];

// const LiveFeed = () => {
//   const [selectedCamera, setSelectedCamera] = useState(cameras[0]);
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [metrics, setMetrics] = useState({
//     carsDetected: 0,
//     vehicleDensity: 0,
//     motionScore: 0,
//     congestionLevel: "Low" as "Low" | "Medium" | "High",
//   });

//   // Simulate real-time metrics updates
//   useEffect(() => {
//     if (!isStreaming) return;

//     const interval = setInterval(() => {
//       const carsDetected = Math.floor(Math.random() * 50) + 10;
//       const vehicleDensity = Math.floor(Math.random() * 100);
//       const motionScore = Math.floor(Math.random() * 100);

//       let congestionLevel: "Low" | "Medium" | "High" = "Low";
//       if (vehicleDensity > 70) congestionLevel = "High";
//       else if (vehicleDensity > 40) congestionLevel = "Medium";

//       setMetrics({ carsDetected, vehicleDensity, motionScore, congestionLevel });
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [isStreaming]);

//   const getCongestionColor = (level: string) => {
//     switch (level) {
//       case "Low":
//         return "status-online";
//       case "Medium":
//         return "bg-warning/20 text-warning border border-warning/30";
//       case "High":
//         return "status-offline";
//       default:
//         return "status-online";
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="space-y-6 animate-fade-in">
//         {/* Page Header */}
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Live CCTV Feed</h1>
//           <p className="text-muted-foreground text-sm mt-1">
//             Monitor real-time traffic from connected cameras
//           </p>
//         </div>

//         {/* Main Content - Split Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left - Video Player */}
//           <div className="lg:col-span-2 space-y-4">
//             <div className="glass-card rounded-xl overflow-hidden">
//               {/* Video Header */}
//               <div className="p-4 border-b border-border flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Camera className="w-5 h-5 text-primary" />
//                   <h2 className="font-semibold text-foreground">Live CCTV Feed</h2>
//                   {isStreaming && (
//                     <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-xs">
//                       <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
//                       LIVE
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Video Area */}
//               <div className="aspect-video bg-black/50 flex items-center justify-center">
//                 {isStreaming ? (
//                   <div className="text-center">
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
//                       <Camera className="w-8 h-8 text-primary" />
//                     </div>
//                     <p className="text-foreground font-medium">{selectedCamera.name}</p>
//                     <p className="text-muted-foreground text-sm">{selectedCamera.location}</p>
//                     <p className="text-primary text-xs mt-2">Simulated stream active</p>
//                   </div>
//                 ) : (
//                   <div className="text-center">
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
//                       <Camera className="w-8 h-8 text-muted-foreground" />
//                     </div>
//                     <p className="text-muted-foreground">No active stream</p>
//                     <p className="text-muted-foreground/60 text-sm">Select a camera and start streaming</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Camera Selection & Controls */}
//             <div className="glass-card rounded-xl p-4">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 {/* Camera Dropdown */}
//                 <div className="flex-1">
//                   <label className="block text-sm text-muted-foreground mb-2">Select Camera</label>
//                   <select
//                     value={selectedCamera.id}
//                     onChange={(e) => {
//                       const camera = cameras.find((c) => c.id === Number(e.target.value));
//                       if (camera) setSelectedCamera(camera);
//                     }}
//                     className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   >
//                     {cameras.map((camera) => (
//                       <option key={camera.id} value={camera.id}>
//                         {camera.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Control Buttons */}
//                 <div className="flex gap-3 sm:self-end">
//                   <button
//                     onClick={() => setIsStreaming(true)}
//                     disabled={isStreaming}
//                     className={cn(
//                       "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all",
//                       isStreaming
//                         ? "bg-muted text-muted-foreground cursor-not-allowed"
//                         : "bg-primary text-primary-foreground hover:bg-primary/90 glow-blue"
//                     )}
//                   >
//                     <Play className="w-4 h-4" />
//                     Start Stream
//                   </button>
//                   <button
//                     onClick={() => setIsStreaming(false)}
//                     disabled={!isStreaming}
//                     className={cn(
//                       "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all border",
//                       !isStreaming
//                         ? "bg-muted border-muted text-muted-foreground cursor-not-allowed"
//                         : "bg-transparent border-destructive text-destructive hover:bg-destructive/10"
//                     )}
//                   >
//                     <Square className="w-4 h-4" />
//                     Stop Stream
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right - Real-time Metrics */}
//           <div className="space-y-4">
//             <div className="glass-card rounded-xl p-4">
//               <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
//                 <Activity className="w-5 h-5 text-primary" />
//                 Real-time Metrics
//               </h3>

//               <div className="space-y-4">
//                 {/* Cars Detected */}
//                 <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-muted-foreground">Cars Detected</span>
//                     <Car className="w-4 h-4 text-primary" />
//                   </div>
//                   <p className="text-2xl font-bold text-foreground">{metrics.carsDetected}</p>
//                 </div>

//                 {/* Vehicle Density */}
//                 <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-muted-foreground">Vehicle Density</span>
//                     <Gauge className="w-4 h-4 text-primary" />
//                   </div>
//                   <p className="text-2xl font-bold text-foreground">{metrics.vehicleDensity}%</p>
//                   <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
//                     <div
//                       className="h-full bg-primary transition-all duration-500"
//                       style={{ width: `${metrics.vehicleDensity}%` }}
//                     />
//                   </div>
//                 </div>

//                 {/* Motion Score */}
//                 <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-muted-foreground">Motion Score</span>
//                     <Activity className="w-4 h-4 text-primary" />
//                   </div>
//                   <p className="text-2xl font-bold text-foreground">{metrics.motionScore}</p>
//                 </div>

//                 {/* Congestion Level */}
//                 <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-muted-foreground">Congestion Level</span>
//                     <AlertTriangle className="w-4 h-4 text-primary" />
//                   </div>
//                   <span className={cn("px-3 py-1.5 rounded-full text-sm font-medium", getCongestionColor(metrics.congestionLevel))}>
//                     {metrics.congestionLevel}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default LiveFeed;




import { useState, useEffect } from "react";
import { Play, Square, Camera, Car, Activity, Gauge, AlertTriangle, Link, Lock, Plus, Trash2, Check } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

interface ConnectedCamera {
  id: number;
  name: string;
  location: string;
  url: string;
  connected: boolean;
}

const defaultCameras: ConnectedCamera[] = [
  { id: 1, name: "Camera 1 – Highway", location: "Interstate 95", url: "rtsp://192.168.1.101:554/stream1", connected: true },
  { id: 2, name: "Camera 2 – Intersection", location: "Main St & 5th Ave", url: "rtsp://192.168.1.102:554/stream1", connected: true },
  { id: 3, name: "Camera 3 – Market Area", location: "Downtown District", url: "rtsp://192.168.1.103:554/stream1", connected: true },
];

const LiveFeed = () => {
  const [cameras, setCameras] = useState<ConnectedCamera[]>(defaultCameras);
  const [selectedCamera, setSelectedCamera] = useState<ConnectedCamera>(defaultCameras[0]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showAddCamera, setShowAddCamera] = useState(false);
  const [newCamera, setNewCamera] = useState({ name: "", location: "", url: "", username: "", password: "" });
  const [metrics, setMetrics] = useState({
    carsDetected: 0,
    vehicleDensity: 0,
    motionScore: 0,
    congestionLevel: "Low" as "Low" | "Medium" | "High",
  });

  const handleAddCamera = () => {
    if (!newCamera.name || !newCamera.url) return;
    const camera: ConnectedCamera = {
      id: Date.now(),
      name: newCamera.name,
      location: newCamera.location,
      url: newCamera.url,
      connected: true,
    };
    setCameras((prev) => [...prev, camera]);
    setNewCamera({ name: "", location: "", url: "", username: "", password: "" });
    setShowAddCamera(false);
  };

  const handleRemoveCamera = (id: number) => {
    setCameras((prev) => prev.filter((c) => c.id !== id));
    if (selectedCamera.id === id && cameras.length > 1) {
      setSelectedCamera(cameras.find((c) => c.id !== id)!);
    }
  };

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

            {/* CCTV Connection Panel */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Link className="w-5 h-5 text-primary" />
                  Connected Cameras
                </h3>
                <button
                  onClick={() => setShowAddCamera(!showAddCamera)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Camera
                </button>
              </div>

              {/* Add Camera Form */}
              {showAddCamera && (
                <div className="mb-4 p-4 rounded-lg bg-muted/50 border border-border/50 space-y-3 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Camera Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Camera 4 – Bridge"
                        value={newCamera.name}
                        onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="e.g. River Bridge South"
                        value={newCamera.location}
                        onChange={(e) => setNewCamera({ ...newCamera, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Stream URL (RTSP/HTTP) *</label>
                    <input
                      type="text"
                      placeholder="rtsp://192.168.1.100:554/stream1"
                      value={newCamera.url}
                      onChange={(e) => setNewCamera({ ...newCamera, url: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Username (optional)</label>
                      <input
                        type="text"
                        placeholder="admin"
                        value={newCamera.username}
                        onChange={(e) => setNewCamera({ ...newCamera, username: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Password (optional)</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={newCamera.password}
                        onChange={(e) => setNewCamera({ ...newCamera, password: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleAddCamera}
                      disabled={!newCamera.name || !newCamera.url}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        newCamera.name && newCamera.url
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      )}
                    >
                      <Check className="w-4 h-4" />
                      Connect Camera
                    </button>
                    <button
                      onClick={() => setShowAddCamera(false)}
                      className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Camera List */}
              <div className="space-y-2">
                {cameras.map((camera) => (
                  <div
                    key={camera.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-colors",
                      selectedCamera.id === camera.id
                        ? "bg-primary/10 border-primary/30"
                        : "bg-muted/30 border-border/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => setSelectedCamera(camera)}>
                      <div className={cn("w-2 h-2 rounded-full", camera.connected ? "bg-success" : "bg-destructive")} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{camera.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{camera.url}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveCamera(camera.id)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
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
