// ComplaintsPage.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  MessageSquare,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Droplets,
  Wifi,
  Sparkles,
  UtensilsCrossed,
  Upload,
  ArrowUpRight,
  History,
  Calendar,
} from "lucide-react";

import RaiseComplaint from "./RaiseComplaint"; // make sure path is correct

const complaintCategories = [
  { id: "water", label: "Water", icon: Droplets, color: "text-blue-500" },
  { id: "electricity", label: "Electricity", icon: Zap, color: "text-yellow-500" },
  { id: "wifi", label: "Wi-Fi", icon: Wifi, color: "text-purple-500" },
  { id: "cleaning", label: "Cleaning", icon: Sparkles, color: "text-green-500" },
  { id: "food", label: "Food", icon: UtensilsCrossed, color: "text-orange-500" },
];

const initialActiveComplaints = [
  {
    id: "1",
    category: "wifi",
    title: "Wi-Fi not working in Room 204",
    description: "Internet has been down since morning",
    status: "in_progress",
    priority: "high",
    createdAt: "2 hours ago",
    assignedTo: "Tech Support",
    progress: 60,
  },
  {
    id: "2",
    category: "water",
    title: "Low water pressure in bathroom",
    description: "Water pressure is very low during peak hours",
    status: "pending",
    priority: "medium",
    createdAt: "1 day ago",
    assignedTo: "Maintenance",
    progress: 20,
  },
  {
    id: "3",
    category: "cleaning",
    title: "Common area needs cleaning",
    description: "The lounge area hasn't been cleaned properly",
    status: "pending",
    priority: "low",
    createdAt: "2 days ago",
    assignedTo: "Housekeeping",
    progress: 0,
  },
  {
    id: "6",
    category: "electricity",
    title: "Generator issue",
    description: "Generator not starting",
    status: "escalated",
    priority: "high",
    createdAt: "3 hours ago",
    assignedTo: "Maintenance",
    progress: 10,
  },
];

const initialResolvedComplaints = [
  {
    id: "4",
    category: "electricity",
    title: "AC not cooling properly",
    status: "resolved",
    resolvedAt: "3 days ago",
    resolution: "AC filter cleaned and gas refilled",
  },
  {
    id: "5",
    category: "food",
    title: "Food quality complaint",
    status: "resolved",
    resolvedAt: "1 week ago",
    resolution: "Menu revised based on feedback",
  },
];

const maintenanceSchedule = [
  { day: "Monday", task: "Water tank cleaning", time: "6:00 AM - 8:00 AM" },
  { day: "Wednesday", task: "Generator maintenance", time: "10:00 AM - 12:00 PM" },
  { day: "Friday", task: "Pest control", time: "2:00 PM - 4:00 PM" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-warning/10 text-warning border-warning/20";
    case "in_progress":
      return "bg-info/10 text-info border-info/20";
    case "resolved":
      return "bg-success/10 text-success border-success/20";
    case "escalated":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    case "low":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const getCategoryIcon = (categoryId: string) => {
  const category = complaintCategories.find((c) => c.id === categoryId);
  return category?.icon ?? MessageSquare;
};

const getCategoryColor = (categoryId: string) => {
  const category = complaintCategories.find((c) => c.id === categoryId);
  return category?.color ?? "text-muted-foreground";
};

export default function ComplaintsPage() {
  const [activeComplaints, setActiveComplaints] = useState(initialActiveComplaints);
  const [resolvedComplaints] = useState(initialResolvedComplaints);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tab, setTab] = useState("all");
  const [showRaise, setShowRaise] = useState(false); // modal state

  // Filter complaints by tab
  const filteredComplaints =
    tab === "all" ? activeComplaints : activeComplaints.filter((c) => c.status === tab);

  const pendingCount = activeComplaints.filter((c) => c.status === "pending").length;
  const inProgressCount = activeComplaints.filter((c) => c.status === "in_progress").length;
  const resolvedCount = resolvedComplaints.length;
  const escalatedCount = activeComplaints.filter((c) => c.status === "escalated").length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Complaints & Service Requests
            </h1>
            <p className="text-muted-foreground mt-1">
              Raise complaints, track status, and schedule maintenance requests.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <History className="w-4 h-4 mr-2" />
              Complaint History
            </Button>
            <Button className="btn-gradient" onClick={() => setShowRaise(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Raise New Complaint
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{resolvedCount}</p>
                <p className="text-xs text-muted-foreground">Resolved</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{escalatedCount}</p>
                <p className="text-xs text-muted-foreground">Escalated</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Quick Complaint */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Quick Complaint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-3 mb-4">
                  {complaintCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setShowRaise(true)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border hover:border-primary hover:bg-primary/5 transition-all border-gray-200`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center`}>
                        <category.icon className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <span className="text-xs font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Complaints */}
            <Card className="shadow-card">
              <CardHeader className="pb-3 flex items-center justify-between">
                <CardTitle className="text-base">Active Complaints</CardTitle>
                <Tabs value={tab} onValueChange={setTab} className="w-auto">
                  <TabsList className="h-8">
                    <TabsTrigger value="all" className="text-xs px-3 h-7">All</TabsTrigger>
                    <TabsTrigger value="pending" className="text-xs px-3 h-7">Pending</TabsTrigger>
                    <TabsTrigger value="in_progress" className="text-xs px-3 h-7">In Progress</TabsTrigger>
                    <TabsTrigger value="escalated" className="text-xs px-3 h-7">Escalated</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredComplaints.map((complaint) => {
                  const CategoryIcon = getCategoryIcon(complaint.category);
                  return (
                    <div
                      key={complaint.id}
                      className="p-4 rounded-xl border border-gray-200 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                          <CategoryIcon className={`w-5 h-5 ${getCategoryColor(complaint.category)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm">{complaint.title}</h4>
                            <Badge variant="secondary" className={getPriorityColor(complaint.priority)}>
                              {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{complaint.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Assigned: {complaint.assignedTo}</span>
                            <span>•</span>
                            <span>{complaint.createdAt}</span>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <Badge variant="outline" className={getStatusColor(complaint.status)}>
                                {complaint.status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{complaint.progress}%</span>
                            </div>
                            <Progress value={complaint.progress} max={100} className="h-1.5" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="ghost" size="sm">Track</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Escalate</Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Resolved Complaints */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" /> Recently Resolved
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resolvedComplaints.map((complaint) => {
                  const CategoryIcon = getCategoryIcon(complaint.category);
                  return (
                    <div key={complaint.id} className="flex items-center gap-4 p-3 rounded-lg bg-success/5 border border-success/10">
                      <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                        <CategoryIcon className={`w-4 h-4 ${getCategoryColor(complaint.category)}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{complaint.title}</p>
                        <p className="text-xs text-muted-foreground">{complaint.resolution}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={getStatusColor(complaint.status)}>Resolved</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{complaint.resolvedAt}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Maintenance Schedule */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Maintenance Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {maintenanceSchedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{item.day.slice(0, 3)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.task}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* RAISE COMPLAINT MODAL */}
      {showRaise && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 font-bold"
              onClick={() => setShowRaise(false)}
            >
              ❌
            </button>
            <RaiseComplaint />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
