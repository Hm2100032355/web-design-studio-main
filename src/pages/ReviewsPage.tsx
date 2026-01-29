import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Star, Plus, ThumbsUp, Flag, Image } from "lucide-react";
import { useState } from "react";

import pgRoom1 from "@/assets/pg-room-1.jpg";

const myReviews = [
  {
    id: "1",
    pgName: "Green Valley PG",
    image: pgRoom1,
    rating: 5,
    date: "Jan 15, 2026",
    comment:
      "Excellent PG! Clean rooms, great food, and very cooperative staff. Would highly recommend to anyone looking for accommodation near HITEC City.",
    helpful: 15,
    status: "published",
  },
];

const reviewableStays = [
  {
    id: "1",
    pgName: "Happy Residency",
    stayPeriod: "Nov 2025 - Jan 2026",
    image: pgRoom1,
  },
];

const ratingCategories = [
  { label: "Cleanliness", value: 0 },
  { label: "Food Quality", value: 0 },
  { label: "Wi-Fi Speed", value: 0 },
  { label: "Safety", value: 0 },
  { label: "Value for Money", value: 0 },
];

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Reviews & Ratings
            </h1>
            <p className="text-muted-foreground mt-1">
              Share your experience and help other tenants make informed decisions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Pending Reviews */}
            {reviewableStays.length > 0 && (
              <Card className="shadow-card border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-warning" />
                    Write a Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reviewableStays.map((stay) => (
                    <div key={stay.id} className="p-4 rounded-lg bg-secondary">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={stay.image}
                          alt={stay.pgName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{stay.pgName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {stay.stayPeriod}
                          </p>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Overall Rating</p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              className="p-1"
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              onClick={() => setRating(star)}
                            >
                              <Star
                                className={`w-8 h-8 transition-colors ${
                                  star <= (hoveredRating || rating)
                                    ? "star-rating fill-current"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Category Ratings */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {ratingCategories.map((category, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{category.label}</span>
                              <span className="text-muted-foreground">0/5</span>
                            </div>
                            <Progress value={0} className="h-2" />
                          </div>
                        ))}
                      </div>

                      {/* Review Text */}
                      <Textarea
                        placeholder="Share your experience with this PG..."
                        className="mb-4"
                        rows={4}
                      />

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          <Image className="w-4 h-4 mr-2" />
                          Add Photos
                        </Button>
                        <Button className="btn-gradient">Submit Review</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* My Reviews */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>My Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {myReviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg border">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.image}
                        alt={review.pgName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{review.pgName}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= review.rating
                                        ? "star-rating fill-current"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-success/15 text-success">
                            {review.status}
                          </Badge>
                        </div>
                        <p className="text-sm mt-2">{review.comment}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {review.helpful} found helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs">
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-destructive"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Review Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Your Review Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary text-center">
                    <p className="text-2xl font-bold text-primary">1</p>
                    <p className="text-sm text-muted-foreground">Reviews Written</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary text-center">
                    <p className="text-2xl font-bold text-primary">15</p>
                    <p className="text-sm text-muted-foreground">Helpful Votes</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <p className="text-sm font-medium text-success">
                    🌟 Top Reviewer
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your reviews help other tenants make better decisions!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Review Guidelines */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Review Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Be honest and fair in your assessment",
                  "Include specific details about your experience",
                  "Mention both pros and cons",
                  "Add photos if possible",
                  "Keep it respectful and constructive",
                ].map((guideline, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-success">✓</span>
                    <span>{guideline}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
