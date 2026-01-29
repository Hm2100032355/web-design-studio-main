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
import { Link } from "react-router-dom";

import pgRoom1 from "@/assets/pg-room-1.jpg";
import pgRoom2 from "@/assets/pg-room-2.jpg";
import pgRoom3 from "@/assets/pg-room-3.jpg";

const bookings = [
  {
    id: "1",
    pgName: "Green Valley PG",
    location: "Kondapur, Hyderabad",
    image: pgRoom1,
    type: "Visit",
    date: "Jan 25, 2026",
    time: "10:00 AM",
    status: "approved",
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
  },
];

const statusConfig = {
  pending: { label: "Pending", icon: Clock, class: "bg-warning/15 text-warning" },
  approved: { label: "Approved", icon: CheckCircle, class: "bg-success/15 text-success" },
  rejected: { label: "Rejected", icon: XCircle, class: "bg-destructive/15 text-destructive" },
  completed: { label: "Completed", icon: CheckCircle, class: "bg-muted text-muted-foreground" },
};

export default function BookingsPage() {
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
          <Button className="btn-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Request New Visit
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Visits"
            value={12}
            subtitle="All time"
            icon={Eye}
            color="primary"
          />
          <StatCard
            title="Pending"
            value={2}
            subtitle="Awaiting response"
            icon={Clock}
            color="warning"
          />
          <StatCard
            title="Approved"
            value={8}
            subtitle="Ready to visit"
            icon={CheckCircle}
            color="success"
          />
          <StatCard
            title="Completed"
            value={10}
            subtitle="Visited"
            icon={Calendar}
            color="info"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Badge variant="default" className="cursor-pointer px-4 py-2">All</Badge>
          <Badge variant="secondary" className="cursor-pointer px-4 py-2">Upcoming</Badge>
          <Badge variant="secondary" className="cursor-pointer px-4 py-2">Pending</Badge>
          <Badge variant="secondary" className="cursor-pointer px-4 py-2">Completed</Badge>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((booking) => {
            const status = statusConfig[booking.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <Card key={booking.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Image */}
                    <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={booking.image}
                        alt={booking.pgName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{booking.pgName}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {booking.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
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
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={status.class}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            {booking.status === "approved" && (
                              <Button size="sm" className="btn-gradient">
                                View Details
                              </Button>
                            )}
                            {booking.status === "pending" && (
                              <Button variant="destructive" size="sm">
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
        </div>

        {/* Move-in Checklist */}
        <Card className="shadow-card">
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
                  className={`p-4 rounded-lg border ${
                    item.done ? "bg-success/10 border-success/30" : "bg-secondary"
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
