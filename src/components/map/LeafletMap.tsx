import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Fix for default marker icons in Leaflet with Vite
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const primaryIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div style="
    background: linear-gradient(135deg, hsl(252, 55%, 55%), hsl(252, 55%, 65%));
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface PGLocation {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  lat: number;
  lng: number;
}

interface LeafletMapProps {
  pgs: PGLocation[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

export function LeafletMap({ 
  pgs, 
  center = [17.4435, 78.3772], // Default to Hyderabad HITEC City
  zoom = 13,
  height = "500px"
}: LeafletMapProps) {
  return (
    <div style={{ height, width: "100%" }} className="rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} zoom={zoom} />
        {pgs.map((pg) => (
          <Marker key={pg.id} position={[pg.lat, pg.lng]} icon={primaryIcon}>
            <Popup>
              <div className="min-w-[200px] p-1">
                <div className="flex gap-3">
                  <img
                    src={pg.image}
                    alt={pg.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{pg.name}</h4>
                    <p className="text-xs text-muted-foreground">{pg.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-primary">
                        ₹{pg.price.toLocaleString()}/m
                      </span>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs">{pg.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to={`/pg/${pg.id}`}>
                  <Button size="sm" className="w-full mt-2 btn-gradient text-xs">
                    View Details
                  </Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
