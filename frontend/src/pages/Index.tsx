import { Camera, Video, PlayCircle, Gauge } from "lucide-react";
import { KPICard } from "../components/dashboard/KIPCard";
import { HeatmapPlaceholder } from "../components/dashboard/HeatmapPlaceholder";
import { DashboardLayout } from "../components/layout/DashboardLayout";

const kpiData = [
  {
    title: "Total Cameras Connected",
    value: "24",
    icon: Camera,
    trend: { value: 4, isPositive: true },
  },
  {
    title: "Active Live Feeds",
    value: "18",
    icon: Video,
    trend: { value: 2, isPositive: true },
  },
  {
    title: "Videos Processed",
    value: "1,247",
    icon: PlayCircle,
    trend: { value: 12, isPositive: true },
  },
  {
    title: "Average Congestion Today",
    value: "42%",
    icon: Gauge,
    trend: { value: 8, isPositive: false },
  },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time overview of traffic monitoring system
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi) => (
            <KPICard
              key={kpi.title}
              title={kpi.title}
              value={kpi.value}
              icon={kpi.icon}
              trend={kpi.trend}
            />
          ))}
        </div>

        {/* Heatmap Section */}
        <HeatmapPlaceholder />
      </div>
    </DashboardLayout>
  );
};

export default Index;
