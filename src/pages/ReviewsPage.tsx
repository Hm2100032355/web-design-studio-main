import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, Image as ImageIcon, X, MapPin } from "lucide-react";

// Images
import pgRoom1 from "@/assets/pg-room-1.jpg";
import pgRoom2 from "@/assets/pg-room-2.jpg";
import pgRoom3 from "@/assets/pg-room-3.jpg";
import pgCommonArea from "@/assets/pg-common-area.jpg";
import pgExterior from "@/assets/pg-exterior.jpg";
import pgDining from "@/assets/pg-dining.jpg";

const defaultImages = [pgRoom1, pgRoom2, pgRoom3, pgCommonArea, pgExterior, pgDining];

/**
 * ✅ SAME PG_DB style as PGDetailsPage
 * But here we give each PG different images (important requirement)
 */
const PG_DB: Record<
  string,
  {
    id: string;
    name: string;
    location: string;
    fullAddress: string;
    rating: number;
    reviewsCount: number;
    typeLabel: string;
    categoryLabel: string;
    images: string[];
  }
> = {
  "1": {
    id: "1",
    name: "City View PG",
    location: "Madhapur, Hyderabad",
    fullAddress: "Madhapur, Hyderabad - Near HITEC City",
    rating: 4.7,
    reviewsCount: 128,
    typeLabel: "Boys",
    categoryLabel: "PG",
    images: [pgRoom1, pgExterior, pgDining, pgCommonArea],
  },
  "2": {
    id: "2",
    name: "Happy Residency",
    location: "Gachibowli, Hyderabad",
    fullAddress: "Gachibowli, Hyderabad - Near Financial District",
    rating: 4.8,
    reviewsCount: 95,
    typeLabel: "Co-Living",
    categoryLabel: "Boys & Girls",
    images: [pgRoom2, pgDining, pgExterior, pgCommonArea],
  },
  "3": {
    id: "3",
    name: "Vibrant Stays",
    location: "Hitech City, Hyderabad",
    fullAddress: "Hitech City, Hyderabad - Near Cyber Towers",
    rating: 4.5,
    reviewsCount: 67,
    typeLabel: "Girls",
    categoryLabel: "PG",
    images: [pgRoom3, pgCommonArea, pgExterior, pgDining],
  },
  "9": {
    id: "9",
    name: "Green Valley PG",
    location: "Kondapur, Hyderabad",
    fullAddress: "Kondapur, Hyderabad - Near Botanical Garden",
    rating: 4.5,
    reviewsCount: 45,
    typeLabel: "Boys",
    categoryLabel: "PG",
    images: [pgCommonArea, pgRoom1, pgExterior],
  },
  "10": {
    id: "10",
    name: "Sunrise Men's PG",
    location: "Madhapur, Hyderabad",
    fullAddress: "Madhapur, Hyderabad - Near Durgam Cheruvu",
    rating: 4.6,
    reviewsCount: 72,
    typeLabel: "Boys",
    categoryLabel: "PG",
    images: [pgExterior, pgRoom2, pgDining],
  },
  "11": {
    id: "11",
    name: "Chillax Men's PG",
    location: "Hitech City, Hyderabad",
    fullAddress: "Hitech City, Hyderabad - Near Tech Mahindra",
    rating: 4.3,
    reviewsCount: 38,
    typeLabel: "Boys",
    categoryLabel: "PG",
    images: [pgRoom3, pgRoom1, pgCommonArea],
  },
};

const categoryLabels = ["Cleanliness", "Food Quality", "Wi-Fi Speed", "Safety", "Value for Money"] as const;

type CategoryLabel = (typeof categoryLabels)[number];

type Review = {
  id: string;
  pgId: string;
  pgName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  categories: Record<CategoryLabel, number>;
  photos: string[];
};

const uid = () => Math.random().toString(36).slice(2, 10);

const formatToday = () =>
  new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          className="p-1"
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
        >
          <Star
            className={`w-7 h-7 transition-colors ${
              s <= (hover || value) ? "star-rating fill-current" : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function CategoryRating({
  label,
  value,
  onChange,
}: {
  label: CategoryLabel;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}/5</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} type="button" className="p-0.5" onClick={() => onChange(s)}>
              <Star className={`w-4 h-4 ${s <= value ? "star-rating fill-current" : "text-muted-foreground"}`} />
            </button>
          ))}
        </div>

        <div className="flex-1">
          <Progress value={(value / 5) * 100} className="h-2" />
        </div>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const [searchParams] = useSearchParams();
  const queryPgId = searchParams.get("pgId");

  const pgList = useMemo(() => Object.values(PG_DB), []);

  const [selectedPgId, setSelectedPgId] = useState<string>(pgList[0]?.id ?? "1");

  // form
  const [rating, setRating] = useState(0);
  const [categories, setCategories] = useState<Record<CategoryLabel, number>>(() =>
    Object.fromEntries(categoryLabels.map((l) => [l, 0])) as Record<CategoryLabel, number>
  );
  const [comment, setComment] = useState("");
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // reviews
  const [myReviews, setMyReviews] = useState<Review[]>([
    {
      id: "r1",
      pgId: "9",
      pgName: "Green Valley PG",
      rating: 5,
      date: "Jan 15, 2026",
      comment: "Excellent PG! Clean rooms, great food, and cooperative staff.",
      helpful: 15,
      categories: {
        Cleanliness: 5,
        "Food Quality": 5,
        "Wi-Fi Speed": 4,
        Safety: 5,
        "Value for Money": 5,
      },
      photos: [],
    },
  ]);

  // auto select pg from URL
  useEffect(() => {
    if (queryPgId && PG_DB[String(queryPgId)]) setSelectedPgId(String(queryPgId));
  }, [queryPgId]);

  const selectedPg = useMemo(() => PG_DB[selectedPgId] ?? null, [selectedPgId]);
  const selectedImages = selectedPg?.images?.length ? selectedPg.images : defaultImages;

  const resetForm = () => {
    setRating(0);
    setCategories(Object.fromEntries(categoryLabels.map((l) => [l, 0])) as Record<CategoryLabel, number>);
    setComment("");
    setPhotoPreviews([]);
    if (fileRef.current) fileRef.current.value = "";
  };

  const onFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPhotoPreviews((prev) => [...prev, ...urls]);
  };

  const submitReview = () => {
    if (!selectedPg) return;

    if (rating === 0) return alert("Please give overall rating");
    if (comment.trim().length < 10) return alert("Please write at least 10 characters review");

    const payload: Review = {
      id: uid(),
      pgId: selectedPg.id,
      pgName: selectedPg.name,
      rating,
      date: formatToday(),
      comment: comment.trim(),
      helpful: 0,
      categories,
      photos: photoPreviews,
    };

    setMyReviews((prev) => [payload, ...prev]);
    resetForm();
  };

  const handleHelpful = (id: string) => {
    setMyReviews((prev) => prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r)));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Reviews & Ratings</h1>
          <p className="text-muted-foreground mt-1">Select PG/Hostel and write your review</p>
        </div>

        {/* PG Selector + PG Preview */}
        <Card className="shadow-card border-primary/30">
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Select Hostel / PG</p>
                <div className="flex flex-wrap gap-2">
                  {pgList.map((pg) => (
                    <button
                      key={pg.id}
                      type="button"
                      onClick={() => setSelectedPgId(pg.id)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition ${
                        selectedPgId === pg.id ? "border-primary bg-primary/5" : "hover:bg-secondary"
                      }`}
                    >
                      <img
                        src={pg.images?.[0] ?? defaultImages[0]}
                        alt={pg.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="text-left">
                        <p className="text-sm font-semibold leading-4">{pg.name}</p>
                        <p className="text-xs text-muted-foreground">{pg.location}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedPg && (
                <div className="text-right">
                  <Badge className="badge-coliving">{selectedPg.typeLabel}</Badge>
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <Star className="w-4 h-4 star-rating fill-current" />
                    <span className="font-semibold">{selectedPg.rating}</span>
                    <span className="text-muted-foreground text-sm">({selectedPg.reviewsCount})</span>
                  </div>
                </div>
              )}
            </div>

            {/* Selected PG Images */}
            {selectedPg && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {selectedImages.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border aspect-video">
                    <img src={img} alt={`pg-${selectedPg.name}-${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main */}
        <div className="grid grid-cols-12 gap-6">
          {/* Write Review */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-warning" />
                  Write a Review
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* PG Info */}
                {selectedPg && (
                  <div className="p-4 rounded-xl bg-secondary border">
                    <div className="flex items-start gap-3">
                      <img
                        src={selectedPg.images?.[0] ?? defaultImages[0]}
                        alt={selectedPg.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{selectedPg.name}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedPg.fullAddress}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{selectedPg.categoryLabel}</Badge>
                    </div>
                  </div>
                )}

                {/* Overall rating */}
                <div>
                  <p className="text-sm font-medium mb-2">Overall Rating</p>
                  <StarRating value={rating} onChange={setRating} />
                </div>

                {/* Category ratings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryLabels.map((label) => (
                    <CategoryRating
                      key={label}
                      label={label}
                      value={categories[label]}
                      onChange={(v) => setCategories((prev) => ({ ...prev, [label]: v }))}
                    />
                  ))}
                </div>

                {/* Comment */}
                <Textarea
                  placeholder="Write your experience (food, cleanliness, staff, wifi...)"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                {/* Photos */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Add Photos
                    </Button>

                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => onFilesSelected(e.target.files)}
                    />

                    {photoPreviews.length > 0 && (
                      <Button variant="ghost" size="sm" className="text-xs" onClick={() => setPhotoPreviews([])}>
                        Clear Photos <X className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>

                  {photoPreviews.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {photoPreviews.map((p, idx) => (
                        <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden border">
                          <img src={p} alt={`photo-${idx}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Button variant="ghost" onClick={resetForm}>
                    Reset
                  </Button>
                  <Button className="btn-gradient" onClick={submitReview}>
                    Submit Review
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* My Reviews */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>My Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {myReviews.length === 0 && (
                  <div className="p-6 text-center text-muted-foreground">No reviews yet.</div>
                )}

                {myReviews.map((review) => {
                  const pg = PG_DB[review.pgId];
                  return (
                    <div key={review.id} className="p-4 rounded-xl border">
                      <div className="flex items-start gap-4">
                        <img
                          src={pg?.images?.[0] ?? defaultImages[0]}
                          alt={review.pgName}
                          className="w-16 h-16 rounded-xl object-cover"
                        />

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold">{review.pgName}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                      key={s}
                                      className={`w-4 h-4 ${
                                        s <= review.rating ? "star-rating fill-current" : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                            </div>

                            <Badge className="bg-success/15 text-success">published</Badge>
                          </div>

                          <p className="text-sm mt-2">{review.comment}</p>

                          {review.photos?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {review.photos.map((p, idx) => (
                                <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden border">
                                  <img src={p} alt={`review-${review.id}-${idx}`} className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-2 mt-4">
                            <Button variant="ghost" size="sm" className="text-xs" onClick={() => handleHelpful(review.id)}>
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {review.helpful} helpful
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right side */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Your Review Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary text-center">
                    <p className="text-2xl font-bold text-primary">{myReviews.length}</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary text-center">
                    <p className="text-2xl font-bold text-primary">
                      {myReviews.reduce((sum, r) => sum + r.helpful, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Helpful Votes</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <p className="text-sm font-medium text-success">🌟 Top Reviewer</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your reviews help other tenants choose better hostels.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Review Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Be honest and fair",
                  "Mention pros and cons",
                  "Add photos if possible",
                  "Avoid abusive language",
                  "Keep review useful for others",
                ].map((g, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-success">✓</span>
                    <span>{g}</span>
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
