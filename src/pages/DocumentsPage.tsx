import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Download,
  Upload,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSignature,
  Shield,
  Calendar,
  FolderOpen,
  File,
  FileBadge,
  ArrowRight,
} from "lucide-react";

const documents = [
  {
    id: "1",
    name: "Rental Agreement",
    type: "agreement",
    status: "signed",
    uploadDate: "Jan 15, 2025",
    expiryDate: "Jan 15, 2026",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Aadhar Card",
    type: "id_proof",
    status: "verified",
    uploadDate: "Jan 10, 2025",
    size: "1.2 MB",
  },
  {
    id: "3",
    name: "PAN Card",
    type: "id_proof",
    status: "verified",
    uploadDate: "Jan 10, 2025",
    size: "0.8 MB",
  },
  {
    id: "4",
    name: "Employment Letter",
    type: "other",
    status: "pending",
    uploadDate: "Jan 18, 2025",
    size: "0.5 MB",
  },
];

const agreementDetails = {
  pgName: "Green Valley PG",
  roomNumber: "Room 204",
  startDate: "January 15, 2025",
  endDate: "January 15, 2026",
  monthlyRent: "₹8,500",
  securityDeposit: "₹17,000",
  noticePeriod: "30 days",
  lockInPeriod: "6 months",
};

const moveInChecklist = [
  { id: "1", task: "Advance payment completed", completed: true },
  { id: "2", task: "ID documents uploaded", completed: true },
  { id: "3", task: "Rental agreement signed", completed: true },
  { id: "4", task: "Room assigned", completed: true },
  { id: "5", task: "Move-in date confirmed", completed: true },
  { id: "6", task: "Key/access handover", completed: false },
  { id: "7", task: "Inventory checklist acknowledged", completed: false },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "signed":
    case "verified":
      return "bg-success/10 text-success border-success/20";
    case "pending":
      return "bg-warning/10 text-warning border-warning/20";
    case "expired":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "signed":
    case "verified":
      return CheckCircle2;
    case "pending":
      return Clock;
    case "expired":
      return AlertCircle;
    default:
      return FileText;
  }
};

const getDocumentIcon = (type: string) => {
  switch (type) {
    case "agreement":
      return FileSignature;
    case "id_proof":
      return FileBadge;
    default:
      return File;
  }
};

export default function DocumentsPage() {
  const completedTasks = moveInChecklist.filter((item) => item.completed).length;
  const progress = (completedTasks / moveInChecklist.length) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Documents & Agreements
            </h1>
            <p className="text-muted-foreground mt-1">
              View, download, and manage your rental agreements and documents.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FolderOpen className="w-4 h-4 mr-2" />
              All Documents
            </Button>
            <Button className="btn-gradient">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Active Agreement */}
            <Card className="shadow-card overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <FileSignature className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Rental Agreement</h3>
                      <p className="text-sm text-muted-foreground">
                        {agreementDetails.pgName} • {agreementDetails.roomNumber}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor("signed")}>
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-medium mt-1">{agreementDetails.startDate}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">End Date</p>
                    <p className="text-sm font-medium mt-1">{agreementDetails.endDate}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Monthly Rent</p>
                    <p className="text-sm font-medium mt-1">{agreementDetails.monthlyRent}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Security Deposit</p>
                    <p className="text-sm font-medium mt-1">{agreementDetails.securityDeposit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View Agreement
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">My Documents</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {documents.map((doc) => {
                  const DocIcon = getDocumentIcon(doc.type);
                  const StatusIcon = getStatusIcon(doc.status);
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <DocIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{doc.name}</h4>
                          <Badge variant="outline" className={getStatusColor(doc.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {doc.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>Uploaded: {doc.uploadDate}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          {doc.expiryDate && (
                            <>
                              <span>•</span>
                              <span>Expires: {doc.expiryDate}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Upload Section */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Upload Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium mb-1">Drop files here or click to upload</p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, JPG, PNG (Max 5MB)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Move-In Checklist */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Move-In Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{completedTasks}/{moveInChecklist.length}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="space-y-2">
                  {moveInChecklist.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        item.completed ? "bg-success/5" : "bg-secondary/50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          item.completed ? "bg-success" : "border-2 border-muted-foreground"
                        }`}
                      >
                        {item.completed && (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          item.completed ? "text-muted-foreground line-through" : ""
                        }`}
                      >
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agreement Terms */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Agreement Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Notice Period</span>
                  <span className="text-sm font-medium">{agreementDetails.noticePeriod}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Lock-In Period</span>
                  <span className="text-sm font-medium">{agreementDetails.lockInPeriod}</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Full Terms
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileSignature className="w-4 h-4 mr-2" />
                  Renew Agreement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download All Documents
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Request Early Termination
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
