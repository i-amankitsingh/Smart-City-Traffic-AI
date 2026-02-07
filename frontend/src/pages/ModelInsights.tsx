import { Brain, BarChart3, Cpu, Zap, TrendingUp, AlertCircle } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const congestionDistribution = [
  { level: "Low", count: 245, percentage: 35 },
  { level: "Medium", count: 312, percentage: 45 },
  { level: "High", count: 140, percentage: 20 },
];

const pieData = [
  { name: "Low", value: 35, color: "hsl(142 76% 45%)" },
  { name: "Medium", value: 45, color: "hsl(38 92% 50%)" },
  { name: "High", value: 20, color: "hsl(0 72% 51%)" },
];

const modelMetrics = [
  { metric: "Accuracy", value: 92.4 },
  { metric: "Precision", value: 89.7 },
  { metric: "Recall", value: 91.2 },
  { metric: "F1 Score", value: 90.4 },
];

const ModelInsights = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Model Insights</h1>
          <p className="text-muted-foreground text-sm mt-1">
            AI model performance and predictions overview
          </p>
        </div>

        {/* Model Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Model */}
          <div className="glass-card rounded-xl p-6 glow-blue">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <span className="px-2 py-1 rounded-full bg-success/20 text-success text-xs font-medium border border-success/30">
                Active
              </span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Current Model</h3>
            <p className="text-2xl font-bold text-gradient">Random Forest</p>
            <p className="text-sm text-muted-foreground mt-2">
              Trained on 50,000+ traffic samples
            </p>
          </div>

          {/* Model Accuracy */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Overall Accuracy</h3>
            <p className="text-3xl font-bold text-foreground">92.4%</p>
            <p className="text-sm text-muted-foreground mt-2">
              +2.1% from last week
            </p>
          </div>

          {/* Coming Soon */}
          <div className="glass-card rounded-xl p-6 border-dashed">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-warning" />
              </div>
              <span className="px-2 py-1 rounded-full bg-warning/20 text-warning text-xs font-medium border border-warning/30">
                Coming Soon
              </span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">Deep Learning</h3>
            <p className="text-lg font-bold text-muted-foreground">CNN + LSTM</p>
            <p className="text-sm text-muted-foreground mt-2">
              Enhanced temporal analysis
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Congestion Distribution Bar Chart */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Congestion Distribution</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={congestionDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 20%)" />
                  <XAxis type="number" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} />
                  <YAxis dataKey="level" type="category" tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220 18% 10%)",
                      border: "1px solid hsl(220 15% 20%)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(210 20% 95%)" }}
                  />
                  <Bar dataKey="count" fill="hsl(210 100% 52%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Prediction Breakdown</h3>
            </div>
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220 18% 10%)",
                      border: "1px solid hsl(220 15% 20%)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-semibold text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Model Metrics */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Model Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {modelMetrics.map((item) => (
              <div key={item.metric} className="p-4 rounded-lg bg-muted/50 border border-border/50 text-center">
                <p className="text-sm text-muted-foreground mb-1">{item.metric}</p>
                <p className="text-2xl font-bold text-foreground">{item.value}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="glass-card rounded-xl p-4 flex items-start gap-3 border-l-4 border-l-warning">
          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">Deep Learning Model Coming Soon</p>
            <p className="text-sm text-muted-foreground mt-1">
              We are training a CNN + LSTM hybrid model for improved temporal pattern recognition and higher accuracy predictions.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ModelInsights;
