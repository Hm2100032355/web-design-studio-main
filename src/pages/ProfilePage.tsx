import { useEffect, useMemo, useRef, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Phone,
  MapPin,
  Shield,
  FileText,
  Edit,
  Camera,
  CheckCircle,
  Save,
  X,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [profile, setProfile] = useState({
    firstName: "Rahul",
    lastName: "Kumar",
    email: "rahul.kumar@email.com",
    phone: "+91 98765 43210",
    dob: "1998-08-15", // ✅ date format
    gender: "Male",
    currentAddress: "Green Valley PG, Kondapur, Hyderabad - 500084",
    permanentAddress: "123, Main Street, Delhi - 110001",
    emergencyName: "Amit Kumar (Father)",
    emergencyPhone: "+91 98765 12345",
    photo: "",
  });

  const [tempProfile, setTempProfile] = useState(profile);

  // 🔥 cleanup objectURL to avoid memory leak
  useEffect(() => {
    return () => {
      if (tempProfile.photo?.startsWith("blob:")) {
        URL.revokeObjectURL(tempProfile.photo);
      }
    };
  }, [tempProfile.photo]);

  const startEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const saveEdit = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setTempProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Profile Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload only image file");
      return;
    }

    const url = URL.createObjectURL(file);

    setTempProfile((prev) => ({
      ...prev,
      photo: url,
    }));
  };

  const removePhoto = () => {
    setTempProfile((prev) => ({ ...prev, photo: "" }));
  };

  const activeData = useMemo(() => {
    return isEditing ? tempProfile : profile;
  }, [isEditing, tempProfile, profile]);

  const readOnlyStyle = !isEditing
    ? "bg-muted/40 cursor-not-allowed"
    : "bg-background";

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Profile & Account
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal information and account settings
            </p>
          </div>

          {!isEditing ? (
            <Button className="btn-gradient" onClick={startEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button className="btn-gradient" onClick={saveEdit}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={cancelEdit}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Profile Card */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                {/* hidden file input */}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />

                <div className="relative inline-block">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={activeData.photo} alt="profile" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                      {(activeData.firstName?.[0] || "U").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* ✅ show camera only in edit mode */}
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full"
                      onClick={() => fileRef.current?.click()}
                      title="Upload photo"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* remove photo button */}
                {isEditing && tempProfile.photo && (
                  <div className="mt-3 flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={removePhoto}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Photo
                    </Button>
                  </div>
                )}

                {/* ✅ show live editing values */}
                <h2 className="font-display text-xl font-bold mt-4">
                  {activeData.firstName} {activeData.lastName}
                </h2>
                <p className="text-muted-foreground">{activeData.email}</p>

                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge className="badge-verified">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge variant="secondary">Tenant</Badge>
                </div>

                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Member since</span>
                    <span>Aug 2024</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current PG</span>
                    <span>Green Valley PG</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reviews</span>
                    <span>1 review</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card className="shadow-card mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Email", verified: true },
                  { label: "Phone", verified: true },
                  { label: "ID Proof", verified: true },
                  { label: "Address Proof", verified: false },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary"
                  >
                    <span className="text-sm">{item.label}</span>
                    {item.verified ? (
                      <Badge className="badge-verified">Verified</Badge>
                    ) : (
                      <Button variant="outline" size="sm">
                        Verify
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Personal Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={tempProfile.firstName}
                      readOnly={!isEditing}
                      className={readOnlyStyle}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={tempProfile.lastName}
                      readOnly={!isEditing}
                      className={readOnlyStyle}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={tempProfile.email}
                      readOnly={!isEditing}
                      className={readOnlyStyle}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={tempProfile.phone}
                      readOnly={!isEditing}
                      className={readOnlyStyle}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={tempProfile.dob}
                      readOnly={!isEditing}
                      className={readOnlyStyle}
                      onChange={(e) => handleChange("dob", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={tempProfile.gender}
                      onValueChange={(v) => handleChange("gender", v)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className={!isEditing ? "bg-muted/40" : ""}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Address Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Current Address</Label>
                  <Input
                    id="address"
                    value={tempProfile.currentAddress}
                    readOnly={!isEditing}
                    className={readOnlyStyle}
                    onChange={(e) =>
                      handleChange("currentAddress", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="permanentAddress">Permanent Address</Label>
                  <Input
                    id="permanentAddress"
                    value={tempProfile.permanentAddress}
                    readOnly={!isEditing}
                    className={readOnlyStyle}
                    onChange={(e) =>
                      handleChange("permanentAddress", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Contact Name</Label>
                    <Input
                      id="emergencyName"
                      value={tempProfile.emergencyName}
                      readOnly={!isEditing}
                      className={readOnlyStyle}
                      onChange={(e) =>
                        handleChange("emergencyName", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      value={tempProfile.emergencyPhone}
                      readOnly={!isEditing}
                      className={readOnlyStyle}
                      onChange={(e) =>
                        handleChange("emergencyPhone", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Aadhar Card", status: "verified" },
                    { name: "PAN Card", status: "verified" },
                    { name: "Rental Agreement", status: "pending" },
                    { name: "Office ID", status: "not_uploaded" },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-medium">{doc.name}</span>
                      </div>

                      {doc.status === "verified" && (
                        <Badge className="badge-verified">Verified</Badge>
                      )}
                      {doc.status === "pending" && (
                        <Badge className="bg-warning/15 text-warning">
                          Pending
                        </Badge>
                      )}

                      {/* ✅ Upload only in edit mode */}
                      {doc.status === "not_uploaded" &&
                        (isEditing ? (
                          <Button variant="outline" size="sm">
                            Upload
                          </Button>
                        ) : (
                          <Badge variant="secondary">Not Uploaded</Badge>
                        ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
