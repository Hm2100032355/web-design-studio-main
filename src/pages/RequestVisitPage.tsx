import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft } from "lucide-react";

type PG = {
  id: string;
  name: string;
  location: string;
  rent: number;
  rating: number;
  image: string;
};

export default function RequestVisitPage() {
  const navigate = useNavigate();

  // Demo PG list (replace with API data if you have)
  const pgList: PG[] = useMemo(
    () => [
      {
        id: "1",
        name: "Sri Sai PG",
        location: "Madhapur, Hyderabad",
        rent: 7500,
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "2",
        name: "Green View Hostel",
        location: "Hitech City, Hyderabad",
        rent: 9000,
        rating: 4.2,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "3",
        name: "Elite Men's PG",
        location: "Kondapur, Hyderabad",
        rent: 8200,
        rating: 4.0,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    []
  );

  const [selectedPgId, setSelectedPgId] = useState<string>("");
  const selectedPG = useMemo(() => pgList.find((pg) => pg.id === selectedPgId), [pgList, selectedPgId]);

  const [visitDate, setVisitDate] = useState<Date | undefined>();
  const [visitTime, setVisitTime] = useState<string>("10:00 AM");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [visitors, setVisitors] = useState<number>(1);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!selectedPgId) return alert("Please select PG/Hostel");
    if (!visitDate) return alert("Please select visit date");
    if (!fullName.trim()) return alert("Please enter full name");
    if (!phone.trim() || phone.trim().length < 10) return alert("Please enter valid phone number");

    alert("Visit request submitted successfully ✅");

    // reset
    setSelectedPgId("");
    setVisitDate(undefined);
    setVisitTime("10:00 AM");
    setFullName("");
    setPhone("");
    setVisitors(1);
    setNotes("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Request New Visit</h1>
            <p className="text-muted-foreground">Schedule a visit to inspect PG/Hostel before booking</p>
          </div>

          <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Visit Request Form</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Select PG */}
                <div className="space-y-2">
                  <Label>Select PG/Hostel *</Label>
                  <Select value={selectedPgId} onValueChange={setSelectedPgId}>
                    <SelectTrigger>
                      <SelectValue placeholder="-- Select PG --" />
                    </SelectTrigger>
                    <SelectContent>
                      {pgList.map((pg) => (
                        <SelectItem key={pg.id} value={pg.id}>
                          {pg.name} - {pg.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Visit Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          {visitDate ? format(visitDate, "dd-MM-yyyy") : "dd-mm-yyyy"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0" align="start">
                        <Calendar mode="single" selected={visitDate} onSelect={setVisitDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Visit Time *</Label>
                    <Select value={visitTime} onValueChange={setVisitTime}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                        <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                        <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                        <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                        <SelectItem value="05:00 PM">05:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Name + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      placeholder="Enter your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone *</Label>
                    <Input
                      placeholder="10 digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    />
                  </div>
                </div>

                {/* Visitors */}
                <div className="space-y-2">
                  <Label>Number of Visitors *</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={visitors}
                    onChange={(e) => setVisitors(Number(e.target.value))}
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label>Notes (Optional)</Label>
                  <Textarea
                    placeholder="Any special requests or questions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="px-6">
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Right Side Preview Card */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Selected PG</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {/* ✅ If no PG selected -> show background image only */}
              {!selectedPG ? (
                <div className="relative h-[360px] w-full">
                  <img
                    src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1200&auto=format&fit=crop"
                    alt="PG preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                    <p className="text-white text-sm font-medium">
                      Select a PG to preview image & details
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Selected PG Image */}
                  <div className="h-[220px] w-full">
                    <img
                      src={selectedPG.image}
                      alt={selectedPG.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-2">
                    <p className="text-lg font-semibold">{selectedPG.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedPG.location}</p>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Rent</p>
                        <p className="font-semibold">₹{selectedPG.rent}/month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Rating</p>
                        <p className="font-semibold">{selectedPG.rating} ⭐</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
