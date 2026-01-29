import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Calendar,
  CreditCard,
  Home,
  MessageSquare,
  Settings,
  Trash2,
  Filter,
  Clock,
  AlertCircle,
  PartyPopper,
  Info,
} from "lucide-react";

const notifications = [
  {
    id: "1",
    type: "booking",
    title: "Booking Request Approved",
    message: "Your visit to Green Valley PG has been confirmed for Jan 25, 2025 at 11:00 AM.",
    time: "2 hours ago",
    read: false,
    icon: Calendar,
    iconColor: "text-success",
    iconBg: "bg-success/10",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Reminder",
    message: "Your rent payment of ₹8,500 for February 2025 is due in 3 days.",
    time: "5 hours ago",
    read: false,
    icon: CreditCard,
    iconColor: "text-warning",
    iconBg: "bg-warning/10",
  },
  {
    id: "3",
    type: "vacancy",
    title: "New Vacancy Alert",
    message: "A room is now available at Sunrise Men's PG, Madhapur. 2-Sharing at ₹7,500/month.",
    time: "1 day ago",
    read: false,
    icon: Home,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    id: "4",
    type: "complaint",
    title: "Complaint Resolved",
    message: "Your complaint about Wi-Fi connectivity has been resolved. Please check and confirm.",
    time: "2 days ago",
    read: true,
    icon: MessageSquare,
    iconColor: "text-info",
    iconBg: "bg-info/10",
  },
  {
    id: "5",
    type: "message",
    title: "Message from Owner",
    message: "Hello! Just wanted to confirm your move-in date. Please reply at your convenience.",
    time: "3 days ago",
    read: true,
    icon: MessageSquare,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
  },
  {
    id: "6",
    type: "announcement",
    title: "Maintenance Notice",
    message: "Water supply will be disrupted on Jan 28, 2025 from 6:00 AM to 10:00 AM for tank cleaning.",
    time: "4 days ago",
    read: true,
    icon: AlertCircle,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
  },
  {
    id: "7",
    type: "offer",
    title: "Special Offer!",
    message: "Get 10% off on your first month's rent when you refer a friend. Terms apply.",
    time: "1 week ago",
    read: true,
    icon: PartyPopper,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-500/10",
  },
];

const notificationSettings = [
  { id: "booking", label: "Booking Status Updates", enabled: true },
  { id: "payment", label: "Rent Payment Reminders", enabled: true },
  { id: "vacancy", label: "Vacancy Alerts", enabled: true },
  { id: "complaint", label: "Complaint Updates", enabled: true },
  { id: "message", label: "Owner Messages", enabled: true },
  { id: "announcement", label: "Admin Announcements", enabled: false },
  { id: "maintenance", label: "System Maintenance Alerts", enabled: true },
  { id: "offers", label: "Offers & Promotions", enabled: false },
];

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with booking status, payments, and important alerts.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                  <p className="text-xs text-muted-foreground">Unread</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{notifications.length - unreadCount}</p>
                  <p className="text-xs text-muted-foreground">Read</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Notifications List */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    All Notifications
                    {unreadCount > 0 && (
                      <Badge className="bg-primary">{unreadCount} new</Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${
                      notification.read
                        ? "border-border bg-card"
                        : "border-primary/30 bg-primary/5"
                    } hover:border-primary/50`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${notification.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <notification.icon className={`w-5 h-5 ${notification.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.time}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Notification Settings */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notificationSettings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <span className="text-sm">{setting.label}</span>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <BellOff className="w-4 h-4 mr-2" />
                  Mute All for 24 hours
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Enable Push Notifications
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete All Read
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">💡 Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-info/10 border border-info/20">
                  <p className="text-sm font-medium text-info">Stay Updated</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enable vacancy alerts to get notified when rooms become available in saved PGs.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <p className="text-sm font-medium text-success">Payment Reminders</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Keep payment reminders on to avoid late fees and maintain a good track record.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
