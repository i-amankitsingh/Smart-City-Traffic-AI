import { useState } from "react";
import { Settings as SettingsIcon, Bell, Moon, Globe, Shield, Database, Save } from "lucide-react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { cn } from "../lib/utils";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoProcess, setAutoProcess] = useState(true);
  const [highQuality, setHighQuality] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-3xl">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configure your traffic monitoring system
          </p>
        </div>

        {/* Notification Settings */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">Manage alert preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Get alerts for high congestion events</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  notifications ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                    notifications ? "translate-x-7" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Processing Settings */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Video Processing</h2>
              <p className="text-sm text-muted-foreground">Configure analysis settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
              <div>
                <p className="font-medium text-foreground">Auto-Process Uploads</p>
                <p className="text-sm text-muted-foreground">Automatically analyze uploaded videos</p>
              </div>
              <button
                onClick={() => setAutoProcess(!autoProcess)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  autoProcess ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                    autoProcess ? "translate-x-7" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
              <div>
                <p className="font-medium text-foreground">High Quality Analysis</p>
                <p className="text-sm text-muted-foreground">Use enhanced detection (slower)</p>
              </div>
              <button
                onClick={() => setHighQuality(!highQuality)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  highQuality ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                    highQuality ? "translate-x-7" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">System Information</h2>
              <p className="text-sm text-muted-foreground">Technical details</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm text-muted-foreground">Version</p>
              <p className="font-semibold text-foreground">v1.0.0</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm text-muted-foreground">Model Version</p>
              <p className="font-semibold text-foreground">RF-2024-01</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-semibold text-foreground">Jan 15, 2024</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm text-muted-foreground">API Status</p>
              <p className="font-semibold text-success">Connected</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all glow-blue">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
