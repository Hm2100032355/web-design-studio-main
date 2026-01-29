import { Star, MapPin, Clock, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PGListItemProps {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  sharing: string;
  isSaved?: boolean;
}

export function PGListItem({
  id,
  name,
  location,
  price,
  rating,
  image,
  sharing,
  isSaved = false,
}: PGListItemProps) {
  return (
    <Link to={`/pg/${id}`}>
      <Card className="flex items-center gap-3 p-3 card-hover group">
        {/* Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {name}
              </h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="w-3 h-3" />
                <span className="line-clamp-1">{location}</span>
              </div>
            </div>
            <Heart
              className={cn(
                "w-4 h-4 flex-shrink-0",
                isSaved ? "text-destructive fill-current" : "text-muted-foreground"
              )}
            />
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 star-rating fill-current" />
              <span className="text-xs font-medium">{rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">{sharing}</span>
            <span className="text-xs font-semibold text-primary">₹{price.toLocaleString()}/m</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
