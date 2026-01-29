import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  History,
  Search,
  Calendar,
  CreditCard,
  MessageSquare,
  Star,
  Eye,
  Download,
  Filter,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

// Import images
import pgRoom1 from "@/assets/pg-room-1.jpg";
import pgRoom2 from "@/assets/pg-room-2.jpg";
import pgRoom3 from "@/assets/pg-room-3.jpg";

const searchHistory = [
  {
    id: "1",
    query: "PGs near Hitech City",
    filters: ["2 Sharing", "₹5K-10K", "WiFi"],
    date: "Today, 10:30 AM",
    resultsCount: 24,
  },
  {
    id: "2",
    query: "Co-living spaces Gachibowli",
    filters: ["1-2 Sharing", "Food Included"],
    date: "Yesterday, 3:45 PM",
    resultsCount: 18,
  },
  {
    id: "3",
    query: "Budget PGs Kondapur",
    filters: ["Under ₹8K", "Boys PG"],
    date: "Jan 20, 2025",
    resultsCount: 32,
  },
];

const bookingHistory = [
  {
    id: "1",
    pgName: "Green Valley PG",
    type: "Visit",
    status: "completed",
    date: "Jan 18, 2025",
    time: "11:00 AM",
    image: pgRoom1,
  },
  {
    id: "2",
    pgName: "Sunrise Men's PG",
    type: "Visit",
    status: "cancelled",
    date: "Jan 15, 2025",
    time: "2:00 PM",
    image: pgRoom2,
  },
  {
    id: "3",
    pgName: "Happy Residency",
    type: "Booking",
    status: "approved",
    date: "Jan 10, 2025",
    time: "10:00 AM",
    image: pgRoom3,
  },
];

const paymentHistory = [
  {
    id: "1",
    description: "Monthly Rent - February 2025",
    amount: "₹8,500",
    status: "paid",
    date: "Feb 1, 2025",
    method: "UPI",
  },
  {
    id: "2",
    description: "Monthly Rent - January 2025",
    amount: "₹8,500",
    status: "paid",
    date: "Jan 1, 2025",
    method: "Net Banking",
  },
  {
    id: "3",
    description: "Security Deposit",
    amount: "₹17,000",
    status: "paid",
    date: "Jan 15, 2025",
    method: "UPI",
  },
];

const complaintHistory = [
  {
    id: "1",
    title: "Wi-Fi connectivity issue",
    category: "Wi-Fi",
    status: "resolved",
    date: "Jan 22, 2025",
    resolution: "Router replaced",
  },
  {
    id: "2",
    title: "AC not cooling",
    category: "Electricity",
    status: "resolved",
    date: "Jan 18, 2025",
    resolution: "Gas refilled",
  },
];

const reviewHistory = [
  {
    id: "1",
    pgName: "Green Valley PG",
    rating: 4.5,
    review: "Great place to stay. Clean rooms and friendly staff.",
    date: "Jan 20, 2025",
    image: pgRoom1,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
    case "approved":
    case "paid":
    case "resolved":
      return "bg-success/10 text-success border-success/20";
    case "pending":
      return "bg-warning/10 text-warning border-warning/20";
    case "cancelled":
    case "rejected":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export default function ActivityPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Activity & History
            </h1>
            <p className="text-muted-foreground mt-1">
              Track all your searches, bookings, payments, and more.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export History
            </Button>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">45</p>
              <p className="text-xs text-muted-foreground">Searches</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-5 h-5 text-info" />
              </div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">Bookings</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-2">
                <CreditCard className="w-5 h-5 text-success" />
              </div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Payments</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-muted-foreground">Complaints</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-2">
                <Star className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="search" className="gap-2">
              <Search className="w-4 h-4" />
              Search History
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <Calendar className="w-4 h-4" />
              Booking History
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Payment History
            </TabsTrigger>
            <TabsTrigger value="complaints" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Complaint History
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <Star className="w-4 h-4" />
              Review History
            </TabsTrigger>
          </TabsList>

          {/* Search History Tab */}
          <TabsContent value="search">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Recent Searches
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Clear History
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {searchHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Search className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.query}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {item.filters.map((filter, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {filter}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                      <p className="text-xs text-primary mt-1">{item.resultsCount} results</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking History Tab */}
          <TabsContent value="bookings">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Booking & Visit History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookingHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.pgName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{item.pgName}</p>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/pg/${item.id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="payments">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Payment History
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border"
                  >
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.date} • {item.method}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{item.amount}</p>
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Complaint History Tab */}
          <TabsContent value="complaints">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Complaint History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complaintHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border"
                  >
                    <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-warning" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{item.title}</p>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Resolution: {item.resolution}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Review History Tab */}
          <TabsContent value="reviews">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Review History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviewHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.pgName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{item.pgName}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.review}</p>
                      <p className="text-xs text-muted-foreground mt-2">{item.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
