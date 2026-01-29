import { Star, Heart, MapPin, Users, Wifi, Car, UtensilsCrossed, Shield, Clock, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PGCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  type: "boys" | "girls" | "coliving";
  sharing: string;
  distance?: string;
  amenities: string[];
  isVerified?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  availability?: "available" | "limited" | "full";
  isSaved?: boolean;
  onSaveToggle?: () => void;
}

const typeLabels = {
  boys: "Boys PG",
  girls: "Girls PG",
  coliving: "Co-Living",
};

const typeClasses = {
  boys: "badge-boys",
  girls: "badge-girls",
  coliving: "badge-coliving",
};

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-3.5 h-3.5" />,
  parking: <Car className="w-3.5 h-3.5" />,
  food: <UtensilsCrossed className="w-3.5 h-3.5" />,
  security: <Shield className="w-3.5 h-3.5" />,
};

export function PGCard({
  id,
  name,
  location,
  price,
  rating,
  reviewCount,
  image,
  type,
  sharing,
  distance,
  amenities,
  isVerified = false,
  isTrending = false,
  isNew = false,
  availability = "available",
  isSaved = false,
  onSaveToggle,
}: PGCardProps) {
  return (
    <Card className="overflow-hidden card-hover group shadow-card hover:shadow-card-hover">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge className={cn("text-xs font-medium", typeClasses[type])}>
            {typeLabels[type]}
          </Badge>
          {isVerified && (
            <Badge className="badge-verified text-xs">
              ✓ Verified
            </Badge>
          )}
          {isTrending && (
            <Badge className="bg-primary text-primary-foreground text-xs">
              🔥 Trending
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-info text-info-foreground text-xs">
              New
            </Badge>
          )}
        </div>

        {/* Save Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm",
            isSaved && "text-destructive"
          )}
          onClick={(e) => {
            e.preventDefault();
            onSaveToggle?.();
          }}
        >
          <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
        </Button>

        {/* Availability Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge
            className={cn(
              "text-xs",
              availability === "available" && "status-available",
              availability === "limited" && "status-limited",
              availability === "full" && "status-full"
            )}
          >
            {availability === "available" && "Available"}
            {availability === "limited" && "Limited Rooms"}
            {availability === "full" && "Fully Booked"}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title & Location */}
        <div>
          <Link to={`/pg/${id}`}>
            <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{location}</span>
            {distance && (
              <>
                <span className="mx-1">•</span>
                <span>{distance}</span>
              </>
            )}
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 star-rating fill-current" />
            <span className="font-semibold text-sm">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviewCount} reviews)
          </span>
          <span className="text-sm text-muted-foreground">•</span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>{sharing}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-2">
          {amenities.slice(0, 4).map((amenity) => (
            <div
              key={amenity}
              className="amenity-icon w-7 h-7"
              title={amenity}
            >
              {amenityIcons[amenity.toLowerCase()] || <span className="text-xs">{amenity[0]}</span>}
            </div>
          ))}
          {amenities.length > 4 && (
            <span className="text-xs text-muted-foreground">
              +{amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="price-highlight text-lg">₹{price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/pg/${id}`}>
                <Eye className="w-4 h-4 mr-1" />
                View
              </Link>
            </Button>
            <Button size="sm" className="btn-gradient" asChild>
              <Link to={`/pg/${id}/book`}>
                <Clock className="w-4 h-4 mr-1" />
                Book
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
