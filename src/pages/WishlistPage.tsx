import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PGCard } from "@/components/pg/PGCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, FolderHeart, Bell, Plus, ArrowLeftRight } from "lucide-react";
import { Link } from "react-router-dom";

// Import images
import pgRoom1 from "@/assets/pg-room-1.jpg";
import pgRoom2 from "@/assets/pg-room-2.jpg";
import pgRoom3 from "@/assets/pg-room-3.jpg";
import pgCommonArea from "@/assets/pg-common-area.jpg";

const folders = [
  { id: "1", name: "All", count: 13, icon: Heart },
  { id: "2", name: "Near Office", count: 5, icon: FolderHeart },
  { id: "3", name: "Budget PGs", count: 4, icon: FolderHeart },
  { id: "4", name: "Food Included", count: 4, icon: FolderHeart },
];

const savedPGs = [
  {
    id: "1",
    name: "Green Valley PG",
    location: "Kondapur, Hyderabad",
    price: 7500,
    rating: 4.5,
    reviewCount: 82,
    image: pgRoom1,
    type: "coliving" as const,
    sharing: "2, 3 Sharing",
    amenities: ["wifi", "parking", "security"],
    isVerified: true,
    availability: "available" as const,
    isSaved: true,
  },
  {
    id: "2",
    name: "Chillax Men's PG",
    location: "Hitech City, Hyderabad",
    price: 6500,
    rating: 4.3,
    reviewCount: 54,
    image: pgRoom2,
    type: "boys" as const,
    sharing: "3, 4 Sharing",
    amenities: ["wifi", "food"],
    availability: "available" as const,
    isSaved: true,
  },
  {
    id: "3",
    name: "Happy Residency",
    location: "Gachibowli, Hyderabad",
    price: 9500,
    rating: 4.8,
    reviewCount: 95,
    image: pgRoom3,
    type: "coliving" as const,
    sharing: "1, 2 Sharing",
    amenities: ["wifi", "food", "parking"],
    isVerified: true,
    availability: "limited" as const,
    isSaved: true,
  },
  {
    id: "4",
    name: "Sunrise Men's PG",
    location: "Madhapur, Hyderabad",
    price: 8000,
    rating: 4.6,
    reviewCount: 128,
    image: pgCommonArea,
    type: "boys" as const,
    sharing: "2, 3 Sharing",
    amenities: ["wifi", "food", "parking", "security"],
    isVerified: true,
    isTrending: true,
    availability: "available" as const,
    isSaved: true,
  },
];

export default function WishlistPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Wishlist / Favorites
            </h1>
            <p className="text-muted-foreground mt-1">
              Organize and compare your favorite PGs. Get alerts when there's a vacancy or price change.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              Manage Alerts
            </Button>
            <Button className="btn-gradient">
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Compare PGs
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Folders Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Folders</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <folder.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{folder.name}</span>
                    </div>
                    <Badge variant="secondary">{folder.count}</Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Availability Alerts */}
            <Card className="shadow-card mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Availability Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <p className="text-sm font-medium text-success">Vacancy Alert</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Green Valley PG has 2 rooms available
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-info/10 border border-info/20">
                  <p className="text-sm font-medium text-info">Price Drop</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sunrise PG reduced rent by ₹500
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Saved PGs Grid */}
          <div className="col-span-12 lg:col-span-9">
            <div className="flex items-center gap-2 mb-4">
              {folders.map((folder) => (
                <Badge
                  key={folder.id}
                  variant={folder.id === "1" ? "default" : "secondary"}
                  className="cursor-pointer"
                >
                  {folder.name} ({folder.count})
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {savedPGs.map((pg) => (
                <PGCard key={pg.id} {...pg} />
              ))}
            </div>

            {/* Compare Section */}
            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowLeftRight className="w-5 h-5" />
                  Compare Saved PGs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Select up to 3-4 PGs to compare side-by-side on rent, distance, amenities, and more.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline">Select PGs to Compare</Button>
                  <Button variant="ghost">
                    Best Match <Badge className="ml-2 bg-success">AI</Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
