import React, { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PGCard } from "@/components/pg/PGCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Map,
  Sparkles,
  Heart,
  Phone,
  MessageCircle,
  Calendar,
  X,
} from "lucide-react";
import { LeafletMap } from "@/components/map/LeafletMap";

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
    lat: 17.4486,
    lng: 78.3908,
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
    lat: 17.4401,
    lng: 78.3489,
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
    lat: 17.4435,
    lng: 78.3772,
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
    lat: 17.4623,
    lng: 78.3652,
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
    lat: 17.4525,
    lng: 78.3942,
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
    lat: 17.4478,
    lng: 78.3812,
  },
];

const pgTypes = [
  { id: "boys", label: "Boys PG" },
  { id: "girls", label: "Girls PG" },
  { id: "coliving", label: "Co-living" },
  { id: "family", label: "Family Stay" },
  { id: "short", label: "Short-Term Stay" },
];

const sharingTypes = [
  { id: "1", label: "1 Sharing" },
  { id: "2", label: "2 Sharing" },
  { id: "3", label: "3 Sharing" },
  { id: "4", label: "4 Sharing" },
];

const amenitiesList = [
  { id: "wifi", label: "Wi-Fi" },
  { id: "ac", label: "AC" },
  { id: "food", label: "Food" },
  { id: "parking", label: "Parking" },
  { id: "washing", label: "Washing Machine" },
];

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [priceRange, setPriceRange] = useState([5000, 15000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSharing, setSelectedSharing] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedSharing([]);
    setSelectedAmenities([]);
    setPriceRange([5000, 15000]);
    setSearchQuery("");
  };

  const activeFiltersCount =
    selectedTypes.length + selectedSharing.length + selectedAmenities.length;

  // ✅ MAIN FILTER LOGIC
  const filteredPGs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allPGs.filter((pg) => {
      // Search filter
      const matchesSearch =
        !q ||
        pg.name.toLowerCase().includes(q) ||
        pg.location.toLowerCase().includes(q) ||
        pg.type.toLowerCase().includes(q) ||
        pg.sharing.toLowerCase().includes(q) ||
        pg.amenities.some((a) => a.toLowerCase().includes(q));

      // Price filter
      const matchesPrice = pg.price >= priceRange[0] && pg.price <= priceRange[1];

      // Type filter
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(pg.type);

      // Sharing filter (checks if "1/2/3/4" exists in pg.sharing string)
      const matchesSharing =
        selectedSharing.length === 0 ||
        selectedSharing.some((s) => pg.sharing.includes(`${s} Sharing`));

      // Amenities filter
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((a) => pg.amenities.includes(a));

      return (
        matchesSearch &&
        matchesPrice &&
        matchesType &&
        matchesSharing &&
        matchesAmenities
      );
    });
  }, [
    searchQuery,
    priceRange,
    selectedTypes,
    selectedSharing,
    selectedAmenities,
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Search & Discovery (Advanced)
            </h1>
            <p className="text-muted-foreground mt-1">
              Quickly find the best PGs & hostels based on location, budget &
              preferences with smart filters & interactive map view.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search PGs, locations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <div className="w-32">
                    <Slider
                      value={priceRange}
                      min={3000}
                      max={20000}
                      step={500}
                      onValueChange={setPriceRange}
                    />
                  </div>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>

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
                    className="rounded-none border-x"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setViewMode("map")}
                  >
                    <Map className="w-4 h-4" />
                  </Button>
                </div>

                <Select defaultValue="price-low">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low → High</SelectItem>
                    <SelectItem value="price-high">Price: High → Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="btn-gradient">Compare PGs</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Advanced Search
                  </CardTitle>

                  {(activeFiltersCount > 0 || searchQuery.trim() !== "") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground"
                      onClick={clearFilters}
                    >
                      Clear all
                      <X className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* PG Type */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">PG / Hostel Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {pgTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                          selectedTypes.includes(type.id)
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-secondary"
                        }`}
                        onClick={() =>
                          toggleFilter(type.id, selectedTypes, setSelectedTypes)
                        }
                      >
                        <Checkbox
                          checked={selectedTypes.includes(type.id)}
                          className="pointer-events-none"
                        />
                        <span className="text-xs">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sharing Type */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Sharing Type</Label>
                  <div className="flex flex-wrap gap-2">
                    {sharingTypes.map((sharing) => (
                      <Badge
                        key={sharing.id}
                        variant={
                          selectedSharing.includes(sharing.id)
                            ? "default"
                            : "secondary"
                        }
                        className="cursor-pointer"
                        onClick={() =>
                          toggleFilter(
                            sharing.id,
                            selectedSharing,
                            setSelectedSharing
                          )
                        }
                      >
                        {sharing.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Rent & Budget */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Rent & Budget</Label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      min={3000}
                      max={20000}
                      step={500}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Amenities</Label>
                  <div className="space-y-2">
                    {amenitiesList.map((amenity) => (
                      <div
                        key={amenity.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={amenity.id}
                          checked={selectedAmenities.includes(amenity.id)}
                          onCheckedChange={() =>
                            toggleFilter(
                              amenity.id,
                              selectedAmenities,
                              setSelectedAmenities
                            )
                          }
                        />
                        <Label
                          htmlFor={amenity.id}
                          className="text-sm cursor-pointer"
                        >
                          {amenity.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Availability</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="immediate" />
                      <Label
                        htmlFor="immediate"
                        className="text-sm cursor-pointer"
                      >
                        Immediate Move-in
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="selected-date" />
                      <Label
                        htmlFor="selected-date"
                        className="text-sm cursor-pointer"
                      >
                        From Selected Date
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Instant Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Save to Wishlist
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call PG Owner
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Chat
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Request Visit
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="col-span-12 lg:col-span-9">
            {viewMode === "map" ? (
              <Card className="shadow-card overflow-hidden">
                <LeafletMap
                  pgs={filteredPGs.map((pg) => ({
                    id: pg.id,
                    name: pg.name,
                    location: pg.location,
                    price: pg.price,
                    rating: pg.rating,
                    image: pg.image,
                    lat: pg.lat,
                    lng: pg.lng,
                  }))}
                  height="600px"
                />
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredPGs.length} PGs
                  </p>

                  {(activeFiltersCount > 0 || searchQuery.trim() !== "") && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-muted-foreground">
                        Active filters:
                      </span>

                      {searchQuery.trim() !== "" && (
                        <Badge variant="secondary" className="gap-1">
                          Search: {searchQuery}
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => setSearchQuery("")}
                          />
                        </Badge>
                      )}

                      {selectedTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="gap-1">
                          {pgTypes.find((t) => t.id === type)?.label}
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() =>
                              toggleFilter(
                                type,
                                selectedTypes,
                                setSelectedTypes
                              )
                            }
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`grid gap-4 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {filteredPGs.map((pg) => (
                    <PGCard key={pg.id} {...pg} />
                  ))}
                </div>

                {filteredPGs.length === 0 && (
                  <Card className="shadow-card">
                    <CardContent className="p-6 text-center text-muted-foreground">
                      No PGs found. Try changing search / filters.
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Bottom Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <Card className="p-4 shadow-card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">
                      Compare PGs Side-by-Side
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Compare up to 3-4 PGs on rent, distance, amenities
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 shadow-card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">
                      AI-Powered Smart Discovery
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Budget, Travel Time, Preferences
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 shadow-card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                    <SlidersHorizontal className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Smart Filters</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Female-Friendly, Noise Level, Food Quality
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 shadow-card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Instant Actions</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Save, Call, WhatsApp, Request Visit
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
