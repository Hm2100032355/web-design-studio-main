import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/StatCard";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Phone,
  MessageCircle,
  Eye,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import pgRoom1 from "@/assets/pg-room-1.jpg";
import pgRoom2 from "@/assets/pg-room-2.jpg";
import pgRoom3 from "@/assets/pg-room-3.jpg";

type BookingStatus = "pending" | "approved" | "rejected" | "completed";
type BookingType = "Visit" | "Booking";

type Booking = {
  id: string;
  pgName: string;
  location: string;
  image: string;
  type: BookingType;
  date: string;
  time: string;
  status: BookingStatus;
  phone?: string;
};

const initialBookings: Booking[] = [
  {
    id: "1",
    pgName: "Green Valley PG",
    location: "Kondapur, Hyderabad",
    image: pgRoom1,
    type: "Visit",
    date: "Jan 25, 2026",
    time: "10:00 AM",
    status: "approved",
    phone: "9876543210",
  },
  {
    id: "2",
    pgName: "Happy Residency",
    location: "Gachibowli, Hyderabad",
    image: pgRoom2,
    type: "Booking",
    date: "Jan 28, 2026",
    time: "2:00 PM",
    status: "pending",
    phone: "9876543210",
  },
  {
    id: "3",
    pgName: "Sunrise Men's PG",
    location: "Madhapur, Hyderabad",
    image: pgRoom3,
    type: "Visit",
    date: "Jan 20, 2026",
    time: "11:00 AM",
    status: "completed",
    phone: "9876543210",
  },
];

const statusConfig: Record<
  BookingStatus,
  { label: string; icon: any; className: string }
> = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-warning/15 text-warning border border-warning/20",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle,
    className: "bg-success/15 text-success border border-success/20",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-destructive/15 text-destructive border border-destructive/20",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    className: "bg-muted text-muted-foreground border border-border",
  },
};

type FilterTab = "all" | "upcoming" | "pending" | "completed";

export default function BookingsPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const filteredBookings = useMemo(() => {
    if (activeTab === "all") return bookings;

    if (activeTab === "pending")
      return bookings.filter((b) => b.status === "pending");

    if (activeTab === "completed")
      return bookings.filter((b) => b.status === "completed");

    if (activeTab === "upcoming")
      return bookings.filter(
        (b) => b.status === "approved" || b.status === "pending"
      );

    return bookings;
  }, [activeTab, bookings]);

  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const approved = bookings.filter((b) => b.status === "approved").length;
    const completed = bookings.filter((b) => b.status === "completed").length;

    return { total, pending, approved, completed };
  }, [bookings]);

  const tabClass = (tab: FilterTab) =>
    activeTab === tab
      ? "cursor-pointer px-4 py-2 rounded-full bg-primary text-primary-foreground shadow-sm"
      : "cursor-pointer px-4 py-2 rounded-full bg-secondary text-foreground hover:bg-secondary/70";

  const handleCall = (phone?: string) => {
    if (!phone) return alert("Phone number not available");
    window.location.href = `tel:${phone}`;
  };

  const handleMessage = (phone?: string) => {
    if (!phone) return alert("Phone number not available");
    window.open(`https://wa.me/91${phone}`, "_blank");
  };

  const handleCancel = (id: string) => {
    const ok = window.confirm("Are you sure you want to cancel?");
    if (!ok) return;
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const openDetails = (booking: Booking) => {
    // ✅ route must exist
    navigate(`/bookings/${booking.id}`, { state: booking });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Bookings & Visits
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your PG visit requests and bookings
            </p>
          </div>

          <Link to="/request-visit">
            <Button className="btn-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Request New Visit
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Visits"
            value={stats.total}
            subtitle="All time"
            icon={Eye}
            color="primary"
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            subtitle="Awaiting response"
            icon={Clock}
            color="warning"
          />
          <StatCard
            title="Approved"
            value={stats.approved}
            subtitle="Ready to visit"
            icon={CheckCircle}
            color="success"
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            subtitle="Visited"
            icon={Calendar}
            color="info"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Badge className={tabClass("all")} onClick={() => setActiveTab("all")}>
            All
          </Badge>
          <Badge
            className={tabClass("upcoming")}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </Badge>
          <Badge
            className={tabClass("pending")}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </Badge>
          <Badge
            className={tabClass("completed")}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </Badge>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const status = statusConfig[booking.status];
            const StatusIcon = status.icon;

            const canView =
              booking.status === "approved" || booking.status === "completed";

            return (
              <Card
                key={booking.id}
                className={`shadow-card rounded-2xl transition ${
                  canView ? "cursor-pointer hover:shadow-lg" : ""
                }`}
                onClick={() => {
                  if (canView) openDetails(booking);
                }}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Image */}
                    <div className="w-full md:w-24 h-44 md:h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={booking.image}
                        alt={booking.pgName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">
                              {booking.pgName}
                            </h3>
                            <Badge
                              variant="secondary"
                              className="text-xs rounded-full"
                            >
                              {booking.type}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="truncate">{booking.location}</span>
                          </div>

                          <div className="flex items-center gap-4 mt-2 flex-wrap">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex flex-col items-start md:items-end gap-2">
                          <Badge
                            className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1 inline-block" />
                            {status.label}
                          </Badge>

                          <div className="flex gap-2 flex-wrap">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleCall(booking.phone);
                              }}
                              title="Call"
                            >
                              <Phone className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleMessage(booking.phone);
                              }}
                              title="Message"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>

                            {/* View Details */}
                            {canView && (
                              <Button
                                size="sm"
                                className="btn-gradient"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  openDetails(booking);
                                }}
                              >
                                View Details
                              </Button>
                            )}

                            {/* Cancel */}
                            {booking.status === "pending" && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleCancel(booking.id);
                                }}
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Empty */}
          {filteredBookings.length === 0 && (
            <Card className="shadow-card rounded-2xl">
              <CardContent className="p-8 text-center text-muted-foreground">
                No bookings found in this category.
              </CardContent>
            </Card>
          )}
        </div>

        {/* Move-in Checklist */}
        <Card className="shadow-card rounded-2xl">
          <CardHeader>
            <CardTitle>Move-in Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "ID Proof", done: true },
                { label: "Address Proof", done: true },
                { label: "Security Deposit", done: false },
                { label: "Agreement Signed", done: false },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${
                    item.done
                      ? "bg-success/10 border-success/30"
                      : "bg-secondary border-border"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.done ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
