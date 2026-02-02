import React, { useEffect, useMemo, useRef, useState } from "react";
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
  UserCircle2,
  Trash2,
  Camera,
  X,
} from "lucide-react";

// --------------------------- Types ---------------------------
type DocumentStatus = "signed" | "verified" | "pending" | "expired";

type DocType = "agreement" | "id_proof" | "other";

type DocumentItem = {
  id: string;
  name: string;
  type: DocType;
  status: DocumentStatus;
  uploadDate: string;
  expiryDate?: string;
  size: string;
  fileData?: string; // base64
  fileName?: string;
  fileType?: string;
};

// --------------------------- Dummy initial docs ---------------------------
const initialDocuments: DocumentItem[] = [
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

// --------------------------- Helpers ---------------------------
const formatDate = () => {
  return new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatSize = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${mb.toFixed(1)} MB`;
};

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

const LOCAL_DOCS_KEY = "tenant_documents_v1";
const LOCAL_PROFILE_KEY = "tenant_profile_photo";

// --------------------------- Component ---------------------------
export default function DocumentsPage() {
  const completedTasks = moveInChecklist.filter((item) => item.completed).length;
  const progress = (completedTasks / moveInChecklist.length) * 100;

  // ------------------- Documents State -------------------
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);

  // Load docs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_DOCS_KEY);
    if (saved) {
      try {
        setDocs(JSON.parse(saved));
        return;
      } catch {
        // ignore
      }
    }
    setDocs(initialDocuments);
  }, []);

  // Save docs to localStorage
  useEffect(() => {
    if (docs.length > 0) {
      localStorage.setItem(LOCAL_DOCS_KEY, JSON.stringify(docs));
    }
  }, [docs]);

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Allow PDF + Images
    const allowed =
      file.type.startsWith("image/") || file.type === "application/pdf";
    if (!allowed) {
      alert("Only JPG/PNG images or PDF files allowed.");
      return;
    }

    // max 10MB for docs
    if (file.size > 10 * 1024 * 1024) {
      alert("Max document size is 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      const newDoc: DocumentItem = {
        id: crypto.randomUUID(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        type: file.type === "application/pdf" ? "agreement" : "other",
        status: "pending",
        uploadDate: formatDate(),
        size: formatSize(file.size),
        fileData: base64,
        fileName: file.name,
        fileType: file.type,
      };

      setDocs((prev) => [newDoc, ...prev]);
      alert("Document uploaded successfully ✅");
    };
    reader.readAsDataURL(file);

    // reset input
    e.target.value = "";
  };

  const downloadDoc = (doc: DocumentItem) => {
    if (!doc.fileData) {
      alert("No file attached for this document (demo item). Upload your own file.");
      return;
    }

    const a = document.createElement("a");
    a.href = doc.fileData;
    a.download = doc.fileName || `${doc.name}.file`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const deleteDoc = (id: string) => {
    const ok = confirm("Are you sure you want to delete this document?");
    if (!ok) return;
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const agreementDoc = useMemo(() => {
    return docs.find((d) => d.type === "agreement") || null;
  }, [docs]);

  // ------------------- Profile Photo Feature -------------------
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_PROFILE_KEY);
    if (saved) setProfilePhoto(saved);
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload only image file (JPG/PNG).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setProfilePhoto(base64);
      localStorage.setItem(LOCAL_PROFILE_KEY, base64);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    localStorage.removeItem(LOCAL_PROFILE_KEY);
  };

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
            <Button
              variant="outline"
              onClick={() => {
                const el = document.getElementById("my-documents");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              All Documents
            </Button>

            <input
              ref={uploadRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={handleDocUpload}
            />
            <Button className="btn-gradient" onClick={() => uploadRef.current?.click()}>
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
                    {/* ✅ FIXED h--3 -> h-3 */}
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-medium mt-1">
                      {agreementDetails.startDate}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">End Date</p>
                    <p className="text-sm font-medium mt-1">
                      {agreementDetails.endDate}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Monthly Rent</p>
                    <p className="text-sm font-medium mt-1">
                      {agreementDetails.monthlyRent}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Security Deposit</p>
                    <p className="text-sm font-medium mt-1">
                      {agreementDetails.securityDeposit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      if (!agreementDoc) {
                        alert("No agreement found. Upload agreement PDF.");
                        return;
                      }
                      setActiveDoc(agreementDoc);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Agreement
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      if (!agreementDoc) {
                        alert("No agreement found. Upload agreement PDF.");
                        return;
                      }
                      downloadDoc(agreementDoc);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <Card className="shadow-card" id="my-documents">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">My Documents</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => uploadRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {docs.map((doc) => {
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
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-medium text-sm">{doc.name}</h4>
                          <Badge
                            variant="outline"
                            className={getStatusColor(doc.status)}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {doc.status}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setActiveDoc(doc)}
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => downloadDoc(doc)}
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteDoc(doc.id)}
                          title="Delete"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Profile Photo */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <UserCircle2 className="w-4 h-4" />
                  Profile Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle2 className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">Tenant Photo</p>
                    <p className="text-xs text-muted-foreground">JPG/PNG • Max 5MB</p>
                  </div>
                </div>

                <input
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => photoRef.current?.click()}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {profilePhoto ? "Change" : "Upload"}
                  </Button>

                  {profilePhoto && (
                    <Button
                      variant="outline"
                      className="text-destructive"
                      onClick={removePhoto}
                      title="Remove photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

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
                    <span className="font-medium">
                      {completedTasks}/{moveInChecklist.length}
                    </span>
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
                          item.completed
                            ? "bg-success"
                            : "border-2 border-muted-foreground"
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
                  <span className="text-sm font-medium">
                    {agreementDetails.noticePeriod}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Lock-In Period</span>
                  <span className="text-sm font-medium">
                    {agreementDetails.lockInPeriod}
                  </span>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => alert("Full terms page can be added next ✅")}
                >
                  View Full Terms
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* -------------------- VIEW MODAL -------------------- */}
        {activeDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-4xl rounded-2xl bg-background border border-border shadow-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{activeDoc.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {activeDoc.fileName || "Demo document (no file uploaded)"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadDoc(activeDoc)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveDoc(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                {!activeDoc.fileData ? (
                  <div className="p-10 text-center text-muted-foreground">
                    No file available for this document.
                    <br />
                    Upload a PDF/image to view here.
                  </div>
                ) : activeDoc.fileType === "application/pdf" ? (
                  <iframe
                    src={activeDoc.fileData}
                    title="PDF Preview"
                    className="w-full h-[70vh] rounded-xl border border-border"
                  />
                ) : (
                  <img
                    src={activeDoc.fileData}
                    alt={activeDoc.name}
                    className="w-full max-h-[70vh] object-contain rounded-xl border border-border"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
