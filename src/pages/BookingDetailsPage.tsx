import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  BedDouble,
  IndianRupee,
  CreditCard,
  FileText,
} from "lucide-react";

function getStatusBadge(status?: string) {
  const s = (status || "").toLowerCase();

  if (s.includes("confirm")) return "bg-green-500/15 text-green-700 border-green-500/30";
  if (s.includes("pending")) return "bg-yellow-500/15 text-yellow-700 border-yellow-500/30";
  if (s.includes("cancel")) return "bg-red-500/15 text-red-700 border-red-500/30";

  return "bg-blue-500/15 text-blue-700 border-blue-500/30";
}

function formatMoney(value: any) {
  if (value === null || value === undefined || value === "") return "—";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return `₹${num.toLocaleString("en-IN")}`;
}

export default function BookingDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // booking object comes from navigate state
  const booking = location.state as any;

  const banner =
    booking?.image ||
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80";

  return (
    <DashboardLayout>
      {/* Background */}
      <div className="relative space-y-6 animate-fade-in">
        <div className="absolute inset-0 -z-10">
          <div className="h-56 w-full rounded-3xl bg-gradient-to-r from-indigo-500/15 via-sky-500/10 to-emerald-500/15 blur-0" />
          <div className="h-56 w-full rounded-3xl bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_55%)]" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Booking Details
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Booking ID: <span className="font-medium">{id}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        {/* Empty State */}
        {!booking ? (
          <Card className="shadow-card rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle>No booking details found</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              This page requires booking data from Bookings page.
              <div className="mt-4">
                <Button onClick={() => navigate("/bookings")}>
                  Go to Bookings
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Top Banner Card */}
            <Card className="shadow-card rounded-2xl overflow-hidden">
              <div className="relative w-full h-60">
                <img
                  src={banner}
                  alt={booking.pgName || "PG"}
                  className="w-full h-full object-cover"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                {/* banner text */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 flex-wrap">
                  <div className="text-white">
                    <h2 className="text-xl md:text-2xl font-semibold">
                      {booking.pgName || "PG / Hostel"}
                    </h2>
                    <p className="text-white/80 text-sm flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      {booking.location || "—"}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-white/15 text-white border-white/20">
                      {booking.type || "Booking"}
                    </Badge>
                    <Badge className={`${getStatusBadge(booking.status)} border`}>
                      {booking.status || "Unknown"}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left - Booking Info */}
              <Card className="shadow-card rounded-2xl lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Date/Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border bg-secondary/30">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        Visit / Booking Date
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.date || "—"}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border bg-secondary/30">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        Time Slot
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.time || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Room/Bed */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Home className="w-4 h-4 text-muted-foreground" />
                        Room Type
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.roomType || booking.type || "—"}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-muted-foreground" />
                        Bed / Sharing
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.bedType || booking.sharing || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Rent/Deposit */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl border bg-secondary/30">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-muted-foreground" />
                        Monthly Rent
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatMoney(booking.rent)}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border bg-secondary/30">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-muted-foreground" />
                        Deposit
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatMoney(booking.deposit)}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border bg-secondary/30">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        Payment
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.paymentStatus || "Not Paid"}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="p-4 rounded-2xl border bg-secondary/20">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      Notes
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {booking.notes ||
                        "No additional notes added for this booking."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Right - Guest Info */}
              <Card className="shadow-card rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Tenant / Guest</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-4 rounded-2xl border bg-secondary/20">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Name
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {booking.guestName || booking.userName || "—"}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Mobile
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {booking.mobile || booking.phone || "—"}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 break-all">
                      {booking.email || "—"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col gap-2">
                    <Button className="w-full">
                      Download Receipt
                    </Button>
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center pt-1">
                    *Receipt download is UI only (backend not connected)
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
