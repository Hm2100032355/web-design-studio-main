import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  FileText,
  Edit,
  Camera,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function ProfilePage() {
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
          <Button className="btn-gradient">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Profile Card */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                      R
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h2 className="font-display text-xl font-bold mt-4">Rahul Kumar</h2>
                <p className="text-muted-foreground">rahul.kumar@email.com</p>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value="Rahul" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value="Kumar" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value="rahul.kumar@email.com" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value="+91 98765 43210" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" value="15 Aug 1998" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Input id="gender" value="Male" readOnly />
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
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Current Address</Label>
                    <Input
                      id="address"
                      value="Green Valley PG, Kondapur, Hyderabad - 500084"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="permanentAddress">Permanent Address</Label>
                    <Input
                      id="permanentAddress"
                      value="123, Main Street, Delhi - 110001"
                      readOnly
                    />
                  </div>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Contact Name</Label>
                    <Input id="emergencyName" value="Amit Kumar (Father)" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Contact Phone</Label>
                    <Input id="emergencyPhone" value="+91 98765 12345" readOnly />
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
                <div className="grid grid-cols-2 gap-4">
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
                        <Badge className="bg-warning/15 text-warning">Pending</Badge>
                      )}
                      {doc.status === "not_uploaded" && (
                        <Button variant="outline" size="sm">
                          Upload
                        </Button>
                      )}
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
