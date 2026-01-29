import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Heart,
  Share2,
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  Users,
  Wifi,
  Car,
  UtensilsCrossed,
  Shield,
  Zap,
  Wind,
  Tv,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Building2,
  Ruler,
  DoorOpen,
  BedDouble,
} from "lucide-react";

// Import images
import pgRoom1 from "@/assets/pg-room-1.jpg";
import pgRoom2 from "@/assets/pg-room-2.jpg";
import pgRoom3 from "@/assets/pg-room-3.jpg";
import pgCommonArea from "@/assets/pg-common-area.jpg";
import pgExterior from "@/assets/pg-exterior.jpg";
import pgDining from "@/assets/pg-dining.jpg";

const images = [pgRoom1, pgRoom2, pgRoom3, pgCommonArea, pgExterior, pgDining];

const amenities = [
  { icon: Wifi, label: "High-Speed Wi-Fi", available: true },
  { icon: Wind, label: "Air Conditioning", available: true },
  { icon: UtensilsCrossed, label: "Meals Included", available: true },
  { icon: Car, label: "Parking (2W/4W)", available: true },
  { icon: Shield, label: "24/7 Security", available: true },
  { icon: Zap, label: "Power Backup", available: true },
  { icon: Tv, label: "Common TV Area", available: true },
  { icon: Dumbbell, label: "Gym Access", available: false },
];

const roomTypes = [
  {
    type: "Single Sharing",
    price: 12000,
    available: 2,
    features: ["Attached Bathroom", "AC", "Balcony"],
  },
  {
    type: "Double Sharing",
    price: 8500,
    available: 4,
    features: ["Attached Bathroom", "AC"],
  },
  {
    type: "Triple Sharing",
    price: 7000,
    available: 3,
    features: ["Common Bathroom", "Fan"],
  },
  {
    type: "4 Sharing",
    price: 5500,
    available: 0,
    features: ["Common Bathroom", "Fan"],
  },
];

const reviews = [
  {
    id: 1,
    name: "Amit Kumar",
    rating: 5,
    date: "2 weeks ago",
    comment: "Great place to stay! Clean rooms, good food, and friendly staff. Highly recommended for working professionals.",
    helpful: 12,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    rating: 4,
    date: "1 month ago",
    comment: "Good PG overall. Wi-Fi speed could be better during peak hours. Location is excellent.",
    helpful: 8,
  },
  {
    id: 3,
    name: "Priya Singh",
    rating: 5,
    date: "1 month ago",
    comment: "Best PG in the area! Food quality is amazing and the rooms are very well maintained.",
    helpful: 15,
  },
];

const ratingCategories = [
  { label: "Cleanliness", rating: 4.8 },
  { label: "Food Quality", rating: 4.5 },
  { label: "Wi-Fi Speed", rating: 4.2 },
  { label: "Safety", rating: 4.9 },
  { label: "Value for Money", rating: 4.6 },
];

export default function PGDetailsPage() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Breadcrumb & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/listings" className="hover:text-foreground">
              PG Listings
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Shivam Residency</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Heart
                className={`w-4 h-4 mr-2 ${
                  isSaved ? "fill-destructive text-destructive" : ""
                }`}
              />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Image Gallery */}
            <Card className="shadow-card overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={images[currentImage]}
                  alt="PG Room"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentImage ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImage(idx)}
                    />
                  ))}
                </div>
                <Badge className="absolute top-4 left-4 badge-verified">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified Property
                </Badge>
              </div>
              <div className="p-4 flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                      idx === currentImage
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => setCurrentImage(idx)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </Card>

            {/* Title & Basic Info */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="badge-coliving">Co-Living</Badge>
                      <Badge variant="secondary">Boys & Girls</Badge>
                    </div>
                    <h1 className="font-display text-2xl font-bold text-foreground">
                      Shivam Residency
                    </h1>
                    <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Gachibowli, Hyderabad - Near HITEC City</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 star-rating fill-current" />
                        <span className="font-semibold">4.7</span>
                        <span className="text-muted-foreground">(550 reviews)</span>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <Building2 className="w-3 h-3" />
                        600m from Metro
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <p className="text-3xl font-bold text-primary">₹5,500</p>
                    <p className="text-sm text-muted-foreground">/month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rooms">Rooms & Pricing</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* Room Quick Stats */}
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Sharing</p>
                          <p className="font-semibold">1, 2, 3, 4</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                          <DoorOpen className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Available</p>
                          <p className="font-semibold">9 Rooms</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                          <Ruler className="w-5 h-5 text-info" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Room Size</p>
                          <p className="font-semibold">120-200 sq.ft</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                          <BedDouble className="w-5 h-5 text-warning" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Bed Type</p>
                          <p className="font-semibold">Single Beds</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Food Menu */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UtensilsCrossed className="w-5 h-5" />
                      Food Menu & Timings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-secondary">
                        <p className="font-medium">Breakfast</p>
                        <p className="text-sm text-muted-foreground">7:30 AM - 9:30 AM</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Idli, Dosa, Poha, Upma, Bread, Eggs
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary">
                        <p className="font-medium">Lunch</p>
                        <p className="text-sm text-muted-foreground">12:30 PM - 2:30 PM</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Rice, Dal, Sabzi, Roti, Salad
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary">
                        <p className="font-medium">Dinner</p>
                        <p className="text-sm text-muted-foreground">7:30 PM - 9:30 PM</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Rice, Dal, Sabzi, Roti, Dessert
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <Badge className="badge-verified">Veg Available</Badge>
                      <Badge variant="secondary">Non-Veg Available</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* House Rules */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>House Rules & Policies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Entry: 10:00 PM (Weekdays)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Entry: 11:00 PM (Weekends)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm">Visitors allowed (with prior approval)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <span className="text-sm">No smoking inside premises</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <span className="text-sm">No alcohol consumption</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm">1 month notice period</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rooms" className="space-y-4">
                {roomTypes.map((room, idx) => (
                  <Card key={idx} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{room.type}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {room.features.map((feature, fidx) => (
                              <Badge key={fidx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            ₹{room.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">/month</p>
                          <Badge
                            className={
                              room.available > 0
                                ? "status-available"
                                : "status-full"
                            }
                          >
                            {room.available > 0
                              ? `${room.available} rooms available`
                              : "Fully booked"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="amenities">
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {amenities.map((amenity, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border ${
                            amenity.available
                              ? "bg-secondary border-border"
                              : "bg-muted/50 border-dashed opacity-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                amenity.available
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <amenity.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{amenity.label}</p>
                              <p className="text-xs text-muted-foreground">
                                {amenity.available ? "Available" : "Not Available"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {/* Rating Summary */}
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-8">
                      <div className="text-center">
                        <p className="text-5xl font-bold text-primary">4.7</p>
                        <div className="flex justify-center mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= 4
                                  ? "star-rating fill-current"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Based on 550 reviews
                        </p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {ratingCategories.map((category, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <span className="text-sm w-32">{category.label}</span>
                            <Progress value={category.rating * 20} className="flex-1" />
                            <span className="text-sm font-medium w-8">
                              {category.rating}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                {reviews.map((review) => (
                  <Card key={review.id} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-semibold text-primary">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= review.rating
                                        ? "star-rating fill-current"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mt-3">{review.comment}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <Button variant="ghost" size="sm" className="text-xs">
                          👍 Helpful ({review.helpful})
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Card */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <Card className="shadow-card sticky top-20">
              <CardHeader>
                <CardTitle>Book This PG</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="text-xl font-bold text-primary">
                      ₹5,500 - ₹12,000
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">
                      Security Deposit
                    </span>
                    <span className="text-sm">2 months rent</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full btn-gradient" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Visit
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with Owner
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Owner
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Avg. response time: 30 mins</span>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-2">Trust & Safety</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Verified Owner</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Verified Property</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Secure Payments</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To HITEC City</span>
                    <span>600m • 8 min walk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To Metro Station</span>
                    <span>1.2 km • 5 min drive</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To Bus Stop</span>
                    <span>200m • 3 min walk</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
