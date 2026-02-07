import { Map } from "lucide-react";

export function HeatmapPlaceholder() {
  return (
    <div className="glass-card rounded-xl p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">City Traffic Heatmap</h2>
        <span className="px-3 py-1 rounded-full bg-warning/20 text-warning text-xs font-medium">
          Coming Soon
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center rounded-lg bg-muted/30 border border-border/50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Map className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">
            Interactive heatmap visualization coming soon
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            Real-time traffic density across the city
          </p>
        </div>
      </div>
    </div>
  );
}
