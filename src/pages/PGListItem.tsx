import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type PGListItemProps = {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  sharing?: string;
  className?: string;
};

export function PGListItem({
  id,
  name,
  location,
  price,
  rating,
  image,
  sharing,
  className,
}: PGListItemProps) {
  return (
    <Link to={`/pg/${id}`} className="block">
      <Card
        className={cn(
          "p-3 rounded-xl border bg-background hover:bg-secondary/40 transition-all cursor-pointer group",
          className
        )}
      >
        <div className="flex items-center gap-3">
          {/* Image */}
          <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold line-clamp-1">{name}</h4>

              {/* Heart button (prevent navigation) */}
              <button
                className="p-1 rounded-md hover:bg-secondary transition"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // TODO: wishlist logic
                  console.log("Wishlist clicked", id);
                }}
              >
                <Heart className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{location}</span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-3.5 h-3.5 text-warning" />
                  <span className="font-medium">{rating}</span>
                </div>

                {sharing && (
                  <Badge variant="secondary" className="text-[10px] px-2 py-0">
                    {sharing}
                  </Badge>
                )}
              </div>

              <span className="text-xs font-semibold text-primary">
                ₹{price.toLocaleString()}/m
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
