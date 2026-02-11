import { useState } from "react";
import { User, Mail, Shield, Camera, Clock, Edit2, Save, X, Activity, Key, Bell } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const Account = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        fullName: "John Doe",
        email: "john.doe@smarttraffic.ai",
        role: "System Administrator",
        department: "Traffic Operations",
        phone: "+1 (555) 123-4567",
        timezone: "EST (UTC-5)",
    });
    const [editProfile, setEditProfile] = useState(profile);

    const handleSave = () => {
        setProfile(editProfile);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditProfile(profile);
        setIsEditing(false);
    };

    const stats = [
        { label: "Cameras Managed", value: "12", icon: Camera },
        { label: "Sessions This Month", value: "47", icon: Clock },
        { label: "Videos Analyzed", value: "128", icon: Activity },
        { label: "Alerts Received", value: "23", icon: Bell },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-fade-in max-w-5xl">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-foreground">My Account</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage your profile and account settings
                    </p>
                </div>

                {/* Profile Card */}
                <div className="glass-card rounded-xl p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                <User className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">{profile.fullName}</h2>
                                <p className="text-muted-foreground text-sm">{profile.role}</p>
                                <span className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium status-online">
                                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                                    Active
                                </span>
                            </div>
                        </div>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                                >
                                    <Save className="w-4 h-4" />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors text-sm font-medium"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Profile Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: "Full Name", key: "fullName" as const, icon: User },
                            { label: "Email Address", key: "email" as const, icon: Mail },
                            { label: "Role", key: "role" as const, icon: Shield },
                            { label: "Department", key: "department" as const, icon: Activity },
                            { label: "Phone", key: "phone" as const, icon: Bell },
                            { label: "Timezone", key: "timezone" as const, icon: Clock },
                        ].map((field) => (
                            <div key={field.key} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                                <label className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                    <field.icon className="w-3.5 h-3.5" />
                                    {field.label}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editProfile[field.key]}
                                        onChange={(e) => setEditProfile({ ...editProfile, [field.key]: e.target.value })}
                                        className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                ) : (
                                    <p className="text-sm font-medium text-foreground">{profile[field.key]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Security Section */}
                <div className="glass-card rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Key className="w-5 h-5 text-primary" />
                        Security
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
                            <div>
                                <p className="text-sm font-medium text-foreground">Password</p>
                                <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                            </div>
                            <button className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
                                Change Password
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
                            <div>
                                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                            </div>
                            <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                                Enable 2FA
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Account;
