import { BarChart3, TrendingUp, TrendingDown, Clock, MapPin } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const hourlyData = [
  { hour: "6AM", congestion: 25 },
  { hour: "7AM", congestion: 45 },
  { hour: "8AM", congestion: 85 },
  { hour: "9AM", congestion: 78 },
  { hour: "10AM", congestion: 55 },
  { hour: "11AM", congestion: 48 },
  { hour: "12PM", congestion: 62 },
  { hour: "1PM", congestion: 58 },
  { hour: "2PM", congestion: 52 },
  { hour: "3PM", congestion: 65 },
  { hour: "4PM", congestion: 72 },
  { hour: "5PM", congestion: 92 },
  { hour: "6PM", congestion: 88 },
  { hour: "7PM", congestion: 65 },
  { hour: "8PM", congestion: 42 },
];

const weeklyTrend = [
  { day: "Mon", avg: 58 },
  { day: "Tue", avg: 62 },
  { day: "Wed", avg: 55 },
  { day: "Thu", avg: 68 },
  { day: "Fri", avg: 75 },
  { day: "Sat", avg: 42 },
  { day: "Sun", avg: 35 },
];

const locationStats = [
  { name: "Highway I-95", avgCongestion: 72, peakTime: "5:00 PM", status: "High" },
  { name: "Main St Intersection", avgCongestion: 58, peakTime: "8:30 AM", status: "Medium" },
  { name: "Market District", avgCongestion: 45, peakTime: "12:00 PM", status: "Medium" },
  { name: "Downtown Core", avgCongestion: 35, peakTime: "6:00 PM", status: "Low" },
];

const TrafficAnalytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Traffic Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Historical traffic patterns and insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="metric-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Peak Hour</p>
                <p className="text-xl font-bold text-foreground">5:00 PM</p>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lowest Hour</p>
                <p className="text-xl font-bold text-foreground">6:00 AM</p>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Daily</p>
                <p className="text-xl font-bold text-foreground">56%</p>
              </div>
            </div>
          </div>
          <div className="metric-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rush Hours</p>
                <p className="text-xl font-bold text-foreground">4 hrs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hourly Congestion */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Hourly Congestion Pattern</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 20%)" />
                  <XAxis dataKey="hour" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220 18% 10%)",
                      border: "1px solid hsl(220 15% 20%)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(210 20% 95%)" }}
                  />
                  <Bar dataKey="congestion" fill="hsl(210 100% 52%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Trend */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Weekly Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 20%)" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220 18% 10%)",
                      border: "1px solid hsl(220 15% 20%)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(210 20% 95%)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="hsl(210 100% 52%)"
                    strokeWidth={2}
                    dot={{ fill: "hsl(210 100% 52%)", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Location Stats Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Location Statistics</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Avg Congestion</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Peak Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {locationStats.map((loc) => (
                  <tr key={loc.name} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">{loc.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${loc.avgCongestion}%` }}
                          />
                        </div>
                        <span className="text-sm text-foreground">{loc.avgCongestion}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{loc.peakTime}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          loc.status === "High"
                            ? "status-offline"
                            : loc.status === "Medium"
                            ? "bg-warning/20 text-warning border border-warning/30"
                            : "status-online"
                        }`}
                      >
                        {loc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrafficAnalytics;
