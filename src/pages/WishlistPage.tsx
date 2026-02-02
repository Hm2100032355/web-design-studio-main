import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PGCard } from "@/components/pg/PGCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Heart, FolderHeart, Bell, Plus, ArrowLeftRight, X } from "lucide-react";

import pgRoom1 from "@/assets/pg-room-1.jpg";
import pgRoom2 from "@/assets/pg-room-2.jpg";
import pgRoom3 from "@/assets/pg-room-3.jpg";
import pgCommonArea from "@/assets/pg-common-area.jpg";

type FolderId = "1" | "2" | "3" | "4";

const folders = [
  { id: "1" as const, name: "All", icon: Heart },
  { id: "2" as const, name: "Near Office", icon: FolderHeart },
  { id: "3" as const, name: "Budget PGs", icon: FolderHeart },
  { id: "4" as const, name: "Food Included", icon: FolderHeart },
];

const initialSavedPGs = [
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
    tags: ["nearOffice", "food"],
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
    tags: ["nearOffice", "budget", "food"],
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
    tags: ["food"],
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
    tags: ["nearOffice", "food"],
  },
];

export default function WishlistPage() {
  const [activeFolder, setActiveFolder] = useState<FolderId>("1");
  const [savedPGs, setSavedPGs] = useState(initialSavedPGs);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  const [searchText, setSearchText] = useState(""); // NEW: search state

  const folderCounts = useMemo(() => {
    return {
      "1": savedPGs.length,
      "2": savedPGs.filter((p) => p.tags?.includes("nearOffice")).length,
      "3": savedPGs.filter((p) => p.tags?.includes("budget")).length,
      "4": savedPGs.filter((p) => p.tags?.includes("food")).length,
    } as Record<FolderId, number>;
  }, [savedPGs]);

  // Filter by folder AND search text
  const filteredPGs = useMemo(() => {
    let result = savedPGs;

    if (activeFolder !== "1") {
      const folderTag = activeFolder === "2" ? "nearOffice" : activeFolder === "3" ? "budget" : "food";
      result = result.filter((p) => p.tags?.includes(folderTag));
    }

    if (searchText.trim() !== "") {
      const lower = searchText.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) || p.location.toLowerCase().includes(lower)
      );
    }

    return result;
  }, [savedPGs, activeFolder, searchText]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const removeFromWishlist = (id: string) => {
    setSavedPGs((prev) => prev.filter((p) => p.id !== id));
    setCompareIds((prev) => prev.filter((x) => x !== id));
  };

  const comparePGs = useMemo(() => savedPGs.filter((pg) => compareIds.includes(pg.id)), [
    savedPGs,
    compareIds,
  ]);

  const openCompare = () => {
    if (compareIds.length < 2) {
      alert("Select at least 2 PGs to compare.");
      return;
    }
    setCompareOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Wishlist / Favorites
            </h1>
            <p className="text-muted-foreground mt-1">
              Organize and compare your favorite PGs. Get alerts when there's a vacancy or price change.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <Input
              placeholder="Search PGs by name or location..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="md:w-64"
            />
            <Button variant="outline" onClick={() => setAlertsOpen((v) => !v)}>
              <Bell className="w-4 h-4 mr-2" />
              {alertsOpen ? "Hide Alerts" : "Manage Alerts"}
            </Button>
            <Button className="btn-gradient" onClick={openCompare}>
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Compare PGs
              {compareIds.length > 0 && <Badge className="ml-2">{compareIds.length}</Badge>}
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="shadow-card">
              <CardHeader className="pb-3 flex items-center justify-between">
                <CardTitle className="text-base">Folders</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-1">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setActiveFolder(folder.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      folder.id === activeFolder ? "bg-secondary" : "hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <folder.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{folder.name}</span>
                    </div>
                    <Badge variant={folder.id === activeFolder ? "default" : "secondary"}>
                      {folderCounts[folder.id]}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* PG Grid */}
          <div className="col-span-12 lg:col-span-9">
            {filteredPGs.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="py-10 text-center">
                  <p className="font-medium">No PGs found.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredPGs.map((pg) => (
                  <div key={pg.id} className="relative">
                    <button
                      onClick={() => toggleCompare(pg.id)}
                      className={`absolute top-3 left-3 px-2 py-1 text-xs rounded-md border ${
                        compareIds.includes(pg.id)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background/90 border-border"
                      }`}
                      title="Select for compare"
                    >
                      {compareIds.includes(pg.id) ? "Selected" : "Compare"}
                    </button>

                    <button
                      onClick={() => removeFromWishlist(pg.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-background/90 border border-border hover:bg-secondary"
                      title="Remove from wishlist"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <PGCard {...pg} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
