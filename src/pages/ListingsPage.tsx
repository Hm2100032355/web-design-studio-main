import React, { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PGCard } from "@/components/pg/PGCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3X3, List, Filter, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

// Import images
import pgRoom1 from "@/assets/pg-room-1.jpg";
import pgRoom2 from "@/assets/pg-room-2.jpg";
import pgRoom3 from "@/assets/pg-room-3.jpg";
import pgCommonArea from "@/assets/pg-common-area.jpg";
import pgExterior from "@/assets/pg-exterior.jpg";
import pgDining from "@/assets/pg-dining.jpg";

const allPGs = [
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
  {
    id: "4",
    name: "Green Valley PG",
    location: "Kondapur, Hyderabad",
    price: 7500,
    rating: 4.5,
    reviewCount: 82,
    image: pgCommonArea,
    type: "coliving" as const,
    sharing: "2, 3 Sharing",
    distance: "1.5 km",
    amenities: ["wifi", "parking", "security"],
    isVerified: true,
    availability: "available" as const,
  },
  {
    id: "5",
    name: "Sunrise Men's PG",
    location: "Madhapur, Hyderabad",
    price: 6500,
    rating: 4.3,
    reviewCount: 54,
    image: pgExterior,
    type: "boys" as const,
    sharing: "3, 4 Sharing",
    distance: "2.0 km",
    amenities: ["wifi", "food"],
    availability: "available" as const,
  },
  {
    id: "6",
    name: "Comfort Stay PG",
    location: "Hitech City, Hyderabad",
    price: 8500,
    rating: 4.6,
    reviewCount: 73,
    image: pgDining,
    type: "girls" as const,
    sharing: "1, 2 Sharing",
    distance: "1.0 km",
    amenities: ["wifi", "food", "parking", "security"],
    isVerified: true,
    availability: "limited" as const,
  },
];

const filterTabs = [
  { id: "all", label: "All PGs", count: 156 },
  { id: "boys", label: "Boys PG", count: 67 },
  { id: "girls", label: "Girls PG", count: 45 },
  { id: "coliving", label: "Co-Living", count: 44 },
];

export default function ListingsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "rating" | "price-low" | "price-high" | "distance" | "newest"
  >("rating");

  // ✅ Filter + Search + Sort
  const filteredPGs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // 1) tab filter
    let list =
      activeTab === "all" ? allPGs : allPGs.filter((pg) => pg.type === activeTab);

    // 2) search filter
    if (q) {
      list = list.filter((pg) => {
        return (
          pg.name.toLowerCase().includes(q) ||
          pg.location.toLowerCase().includes(q) ||
          pg.type.toLowerCase().includes(q) ||
          pg.sharing.toLowerCase().includes(q) ||
          pg.amenities.some((a) => a.toLowerCase().includes(q))
        );
      });
    }

    // 3) sort
    const sorted = [...list];
    if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") sorted.sort((a, b) => b.price - a.price);

    // distance like "1.2 km"
    if (sortBy === "distance") {
      const getKm = (d: string) => Number(d.replace(" km", ""));
      sorted.sort((a, b) => getKm(a.distance) - getKm(b.distance));
    }

    // newest -> if no date field, keep original order
    return sorted;
  }, [activeTab, searchQuery, sortBy]);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              PG Listings
            </h1>
            <p className="text-muted-foreground mt-1">
              Browse all available PGs and hostels in your area
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/search">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Link>
            </Button>
          </div>
        </div>

        {/* ✅ Search Bar */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search PG name, location, amenities..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery.trim() !== "" && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <Badge
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "secondary"}
              className="cursor-pointer px-4 py-2 text-sm"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="ml-2 text-xs opacity-70">({tab.count})</span>
            </Badge>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPGs.length} PGs
          </p>

          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price-low">Price: Low → High</SelectItem>
                <SelectItem value="price-high">Price: High → Low</SelectItem>
                <SelectItem value="distance">Nearest First</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* PG Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredPGs.map((pg) => (
            <PGCard key={pg.id} {...pg} />
          ))}
        </div>

        {/* No Results */}
        {filteredPGs.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            No PGs found. Try another search.
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center pt-4">
          <Button variant="outline" size="lg">
            Load More PGs
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
