import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

import {
  Settings,
  Bell,
  Shield,
  Palette,
  Smartphone,
  Key,
  LogOut,
  Trash2,
  Camera,
  User,
  ChevronRight,
} from "lucide-react";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Profile photo upload
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  // Store object URL so we can revoke it
  const objectUrlRef = useRef<string | null>(null);

  // Switch states
  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    paymentReminders: true,
    vacancyAlerts: true,
    priceDropAlerts: false,
    promotionalOffers: false,
  });

  const [privacy, setPrivacy] = useState({
    showProfileToOwners: true,
    shareLocation: true,
    searchHistory: true,
  });

  // Select states
  const [language, setLanguage] = useState("en");
  const [pgType, setPgType] = useState("boys");
  const [budget, setBudget] = useState("medium");
  const [location, setLocation] = useState("hitech");
  const [themeMode, setThemeMode] = useState("light");

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file only (JPG/PNG).",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 2MB.",
        variant: "destructive",
      });
      return;
    }

    // Revoke previous URL
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setProfilePhoto(url);

    toast({
      title: "Photo updated",
      description: "Profile photo updated successfully.",
    });

    // Later: upload file to backend
    // await uploadProfilePhoto(file)
  };

  const removePhoto = () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;

    setProfilePhoto("");
    if (fileRef.current) fileRef.current.value = "";

    toast({
      title: "Photo removed",
      description: "Profile photo removed successfully.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    const ok = confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!ok) return;

    // call API delete account here
    toast({
      title: "Request submitted",
      description: "Account delete request submitted!",
    });
  };

  const SettingRow = ({
    title,
    description,
    checked,
    onChange,
  }: {
    title: string;
    description: string;
    checked: boolean;
    onChange: (val: boolean) => void;
  }) => (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-secondary/60 border">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Settings & Preferences
          </h1>
          <p className="text-muted-foreground mt-1">
            Customize your app experience and manage your preferences
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Profile */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-secondary flex items-center justify-center border">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <p className="font-medium">Profile Photo</p>
                  <p className="text-sm text-muted-foreground">
                    Upload JPG/PNG (max 2MB)
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      className="btn-gradient"
                      onClick={() => fileRef.current?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={removePhoto}
                      disabled={!profilePhoto}
                    >
                      Remove
                    </Button>

                    <Input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <SettingRow
                  title="Booking Updates"
                  description="Get notified about your booking status"
                  checked={notifications.bookingUpdates}
                  onChange={(v) =>
                    setNotifications((p) => ({ ...p, bookingUpdates: v }))
                  }
                />
                <SettingRow
                  title="Payment Reminders"
                  description="Receive rent payment reminders"
                  checked={notifications.paymentReminders}
                  onChange={(v) =>
                    setNotifications((p) => ({ ...p, paymentReminders: v }))
                  }
                />
                <SettingRow
                  title="Vacancy Alerts"
                  description="Alerts when saved PGs have vacancies"
                  checked={notifications.vacancyAlerts}
                  onChange={(v) =>
                    setNotifications((p) => ({ ...p, vacancyAlerts: v }))
                  }
                />
                <SettingRow
                  title="Price Drop Alerts"
                  description="Notifications when PG prices drop"
                  checked={notifications.priceDropAlerts}
                  onChange={(v) =>
                    setNotifications((p) => ({ ...p, priceDropAlerts: v }))
                  }
                />
                <SettingRow
                  title="Promotional Offers"
                  description="Special deals and offers"
                  checked={notifications.promotionalOffers}
                  onChange={(v) =>
                    setNotifications((p) => ({ ...p, promotionalOffers: v }))
                  }
                />
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <SettingRow
                  title="Show Profile to Owners"
                  description="Allow PG owners to view your profile"
                  checked={privacy.showProfileToOwners}
                  onChange={(v) =>
                    setPrivacy((p) => ({ ...p, showProfileToOwners: v }))
                  }
                />
                <SettingRow
                  title="Share Location"
                  description="Use location for nearby PG recommendations"
                  checked={privacy.shareLocation}
                  onChange={(v) =>
                    setPrivacy((p) => ({ ...p, shareLocation: v }))
                  }
                />
                <SettingRow
                  title="Search History"
                  description="Save your search history for recommendations"
                  checked={privacy.searchHistory}
                  onChange={(v) =>
                    setPrivacy((p) => ({ ...p, searchHistory: v }))
                  }
                />
              </CardContent>
            </Card>

            {/* App Preferences */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  App Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred PG Type</Label>
                    <Select value={pgType} onValueChange={setPgType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boys">Boys PG</SelectItem>
                        <SelectItem value="girls">Girls PG</SelectItem>
                        <SelectItem value="coliving">Co-Living</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Budget Range</Label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">₹3,000 - ₹6,000</SelectItem>
                        <SelectItem value="medium">₹6,000 - ₹10,000</SelectItem>
                        <SelectItem value="high">₹10,000 - ₹15,000</SelectItem>
                        <SelectItem value="premium">₹15,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Location</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hitech">HITEC City</SelectItem>
                        <SelectItem value="gachibowli">Gachibowli</SelectItem>
                        <SelectItem value="madhapur">Madhapur</SelectItem>
                        <SelectItem value="kondapur">Kondapur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Security */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => navigate("/change-password")}
                >
                  <span className="flex items-center">
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => navigate("/devices")}
                >
                  <span className="flex items-center">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Manage Devices
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => navigate("/login-history")}
                >
                  <span className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Login History
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label>Theme Mode</Label>
                <Select
                  value={themeMode}
                  onValueChange={(v) => {
                    setThemeMode(v);

                    // Optional: integrate dark mode logic here
                    // if (v === "dark") document.documentElement.classList.add("dark");
                    // else if (v === "light") document.documentElement.classList.remove("dark");

                    toast({
                      title: "Theme updated",
                      description: `Theme set to ${v}`,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="shadow-card border-destructive/30">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
