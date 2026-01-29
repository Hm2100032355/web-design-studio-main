import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionCard } from "@/components/ui/SectionCard";
import { PGCard } from "@/components/pg/PGCard";
import { PGListItem } from "@/components/pg/PGListItem";
import { AlertItem } from "@/components/ui/AlertItem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  Clock,
  Heart,
  MapPin,
  TrendingUp,
  Bell,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

// Import images
import pgRoom1 from "@/assets/pg-room-1.jpg";
import pgRoom2 from "@/assets/pg-room-2.jpg";
import pgRoom3 from "@/assets/pg-room-3.jpg";
import pgCommonArea from "@/assets/pg-common-area.jpg";
import pgExterior from "@/assets/pg-exterior.jpg";
import pgDining from "@/assets/pg-dining.jpg";

// Mock data
const recommendedPGs = [
  {
    id: "1",
    name: "City View PG",
    location: "Madhapur, Hyderabad",
    price: 8000,
    rating: 4.7,
    reviewCount: 128,
    image: pgRoom1,
    type: "boys" as const,
    sharing: "2, 3, 4 Sharing",
    distance: "1.2 km",
    amenities: ["wifi", "food", "parking", "security"],
    isVerified: true,
    isTrending: true,
    availability: "available" as const,
  },
  {
    id: "2",
    name: "Happy Residency",
    location: "Gachibowli, Hyderabad",
    price: 9500,
    rating: 4.8,
    reviewCount: 95,
    image: pgRoom2,
    type: "coliving" as const,
    sharing: "1, 2 Sharing",
    distance: "2.1 km",
    amenities: ["wifi", "food", "parking"],
    isVerified: true,
    availability: "limited" as const,
  },
  {
    id: "3",
    name: "Vibrant Stays",
    location: "Hitech City, Hyderabad",
    price: 7500,
    rating: 4.5,
    reviewCount: 67,
    image: pgRoom3,
    type: "girls" as const,
    sharing: "2, 3 Sharing",
    distance: "0.8 km",
    amenities: ["wifi", "food", "security"],
    isNew: true,
    availability: "available" as const,
  },
];

const recentlyViewedPGs = [
  {
    id: "4",
    name: "Sunrise Men's PG",
    location: "Madhapur",
    price: 8000,
    rating: 4.6,
    image: pgExterior,
    sharing: "3 Sharing",
  },
  {
    id: "5",
    name: "Green Valley Co-living",
    location: "Gachibowli",
    price: 10000,
    rating: 4.8,
    image: pgCommonArea,
    sharing: "1, 2 Sharing",
  },
  {
    id: "6",
    name: "Comfort Stay PG",
    location: "Hitech City",
    price: 7500,
    rating: 4.4,
    image: pgDining,
    sharing: "4 Sharing",
  },
];

const savedPGs = [
  { id: "7", name: "Budget PGs near Office", count: 5 },
  { id: "8", name: "PGs with Food Included", count: 8 },
];

const nearbyPGs = [
  {
    id: "9",
    name: "Green Valley PG",
    location: "Kondapur",
    price: 7500,
    rating: 4.5,
    image: pgRoom1,
    sharing: "2, 3 Sharing",
    distance: "500m",
  },
  {
    id: "10",
    name: "Sunrise Men's PG",
    location: "Madhapur",
    price: 7900,
    rating: 4.6,
    image: pgRoom2,
    sharing: "2 Sharing",
    distance: "800m",
  },
  {
    id: "11",
    name: "Chillax Men's PG",
    location: "Hitech City",
    price: 6500,
    rating: 4.3,
    image: pgRoom3,
    sharing: "3, 4 Sharing",
    distance: "1.2km",
  },
];

const alerts = [
  {
    type: "success" as const,
    title: "New vacancy available in saved PG",
    description: "Green Valley PG has 2 rooms available",
    time: "2 hours ago",
  },
  {
    type: "info" as const,
    title: "Rent price dropped in nearby PG",
    description: "City View PG reduced rent by ₹500",
    time: "5 hours ago",
  },
  {
    type: "success" as const,
    title: "Booking request approved",
    description: "Your visit to Happy Residency is confirmed",
    time: "1 day ago",
  },
];

const trendingPGs = [
  { name: "Most booked PGs this month", count: 156 },
  { name: "Top-rated PGs by tenants", count: 89 },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Welcome, Rahul 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Find the best PGs & hostels that match your needs.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/search">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Search
              </Link>
            </Button>
            <Button className="btn-gradient" asChild>
              <Link to="/search">
                <Search className="w-4 h-4 mr-2" />
                Search PGs
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Smart Recommendations */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Smart Recommendations */}
            <SectionCard
              title="Smart Recommendations"
              subtitle="Based on your location & search preferences"
              icon={Sparkles}
              iconColor="text-primary"
              viewAllLink="/search"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {recommendedPGs.map((pg) => (
                  <PGCard key={pg.id} {...pg} />
                ))}
              </div>
            </SectionCard>

            {/* PGs Near Your Location */}
            <SectionCard
              title="PGs Near Your Location"
              icon={MapPin}
              iconColor="text-info"
              viewAllLink="/search"
              viewAllLabel="View on Map"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {nearbyPGs.map((pg) => (
                  <Card key={pg.id} className="p-3 card-hover">
                    <Link to={`/pg/${pg.id}`} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={pg.image}
                          alt={pg.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">{pg.name}</h4>
                        <p className="text-xs text-muted-foreground">{pg.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-primary">
                            ₹{pg.price.toLocaleString()}/m
                          </span>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            {pg.distance}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Recently Viewed PGs */}
            <SectionCard
              title="Recently Viewed PGs"
              icon={Clock}
              iconColor="text-warning"
              viewAllLink="/activity"
            >
              <div className="space-y-3">
                {recentlyViewedPGs.map((pg) => (
                  <PGListItem key={pg.id} {...pg} />
                ))}
              </div>
            </SectionCard>

            {/* Saved / Wishlist PGs */}
            <SectionCard
              title="Saved / Wishlist PGs"
              icon={Heart}
              iconColor="text-destructive"
              viewAllLink="/wishlist"
            >
              <div className="space-y-3">
                {savedPGs.map((folder) => (
                  <Link
                    key={folder.id}
                    to={`/wishlist/${folder.id}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{folder.name}</span>
                    </div>
                    <Badge variant="secondary">{folder.count}</Badge>
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  className="w-full text-primary text-sm"
                  asChild
                >
                  <Link to="/wishlist">
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Map
                  </Link>
                </Button>
              </div>
            </SectionCard>

            {/* Trending / Popular PGs */}
            <SectionCard
              title="Trending / Popular PGs"
              icon={TrendingUp}
              iconColor="text-success"
              viewAllLink="/listings?sort=trending"
            >
              <div className="space-y-3">
                {trendingPGs.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.count} bookings
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Alerts & Updates */}
            <SectionCard
              title="Alerts & Updates"
              icon={Bell}
              iconColor="text-warning"
              viewAllLink="/notifications"
            >
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <AlertItem key={index} {...alert} />
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
