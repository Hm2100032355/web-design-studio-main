import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Ticket,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Send,
  FileText,
  Shield,
  CreditCard,
  Home,
  Calendar,
  Star,
  Plus,
} from "lucide-react";

const faqCategories = [
  { id: "booking", label: "Booking & Visits", icon: Calendar },
  { id: "payment", label: "Payments", icon: CreditCard },
  { id: "pg", label: "PG & Stay", icon: Home },
  { id: "account", label: "Account", icon: Shield },
  { id: "reviews", label: "Reviews", icon: Star },
];

const faqs = [
  {
    category: "booking",
    question: "How do I book a visit to a PG?",
    answer:
      "You can book a visit by going to the PG details page and clicking on 'Schedule Visit'. Select your preferred date and time, and the PG owner will confirm your visit within 24 hours.",
  },
  {
    category: "booking",
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel your booking up to 24 hours before the scheduled visit without any charges. Go to Bookings & Visits and click on 'Cancel' next to your booking.",
  },
  {
    category: "payment",
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, Credit/Debit cards, Net Banking, and Wallet payments. All transactions are secured with 256-bit encryption.",
  },
  {
    category: "pg",
    question: "How do I report a problem at my PG?",
    answer:
      "Go to Complaints & Requests and submit a new complaint. Select the category (Water, WiFi, Electricity, etc.) and describe the issue. The PG owner will respond within 24-48 hours.",
  },
  {
    category: "account",
    question: "How do I update my profile information?",
    answer:
      "Go to Profile & Account and click 'Edit Profile'. You can update your personal details, contact information, and preferences.",
  },
  {
    category: "reviews",
    question: "How do I write a review?",
    answer:
      "After your stay, go to Reviews & Ratings and click 'Write a Review'. Rate the PG on various parameters and share your experience.",
  },
];

type TicketStatus = "open" | "in-progress" | "resolved";
type TicketPriority = "low" | "medium" | "high";

type SupportTicket = {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  created: string;
  lastUpdate: string;
  message?: string;
};

const initialTickets: SupportTicket[] = [
  {
    id: "TKT-001",
    subject: "Payment not reflecting in account",
    status: "in-progress",
    priority: "high",
    created: "2 days ago",
    lastUpdate: "1 day ago",
    message: "I paid rent yesterday but it is not reflecting in payments section.",
  },
  {
    id: "TKT-002",
    subject: "Unable to book visit for Green Valley PG",
    status: "resolved",
    priority: "medium",
    created: "5 days ago",
    lastUpdate: "3 days ago",
    message: "Booking button is disabled for Green Valley PG. Please help.",
  },
  {
    id: "TKT-003",
    subject: "Request for invoice copy",
    status: "open",
    priority: "low",
    created: "1 hour ago",
    lastUpdate: "1 hour ago",
    message: "Need invoice copy for my rent payment.",
  },
];

const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case "open":
      return "bg-info/10 text-info";
    case "in-progress":
      return "bg-warning/10 text-warning";
    case "resolved":
      return "bg-success/10 text-success";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: TicketStatus) => {
  switch (status) {
    case "open":
      return AlertCircle;
    case "in-progress":
      return Clock;
    case "resolved":
      return CheckCircle2;
    default:
      return HelpCircle;
  }
};

const generateTicketId = () => {
  const rand = Math.floor(100 + Math.random() * 900);
  return `TKT-${Date.now().toString().slice(-4)}${rand}`;
};

export default function SupportPage() {
  const { toast } = useToast();

  const [activeCategory, setActiveCategory] = useState("booking");
  const [searchQuery, setSearchQuery] = useState("");

  // tickets list state
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);

  // raise ticket dialog
  const [openRaiseTicket, setOpenRaiseTicket] = useState(false);

  // ticket details dialog
  const [openTicketDetails, setOpenTicketDetails] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null
  );

  // ticket form state
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketPriority, setTicketPriority] = useState<TicketPriority>("medium");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.category === activeCategory &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const counts = useMemo(() => {
    return {
      open: tickets.filter((t) => t.status === "open").length,
      inProgress: tickets.filter((t) => t.status === "in-progress").length,
      resolved: tickets.filter((t) => t.status === "resolved").length,
    };
  }, [tickets]);

  const handleCreateTicket = () => {
    if (!ticketSubject.trim()) {
      toast({
        title: "Subject required",
        description: "Please enter ticket subject.",
        variant: "destructive",
      });
      return;
    }
    if (!ticketMessage.trim()) {
      toast({
        title: "Message required",
        description: "Please enter ticket message.",
        variant: "destructive",
      });
      return;
    }

    const newTicket: SupportTicket = {
      id: generateTicketId(),
      subject: ticketSubject.trim(),
      message: ticketMessage.trim(),
      priority: ticketPriority,
      status: "open",
      created: "Just now",
      lastUpdate: "Just now",
    };

    setTickets((prev) => [newTicket, ...prev]);

    setTicketSubject("");
    setTicketMessage("");
    setTicketPriority("medium");

    setOpenRaiseTicket(false);

    toast({
      title: "Ticket Raised ✅",
      description: "Our support team will contact you shortly.",
    });
  };

  const openDetails = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setOpenTicketDetails(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Support & Help
            </h1>
            <p className="text-muted-foreground mt-1">
              Get help with your queries, raise tickets, and find answers to
              common questions.
            </p>
          </div>

          <Button
            className="btn-gradient"
            onClick={() => setOpenRaiseTicket(true)}
          >
            <Ticket className="w-4 h-4 mr-2" />
            Raise New Ticket
          </Button>
        </div>

        {/* Raise Ticket Dialog */}
        <Dialog open={openRaiseTicket} onOpenChange={setOpenRaiseTicket}>
          <DialogContent className="sm:max-w-[520px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Raise New Ticket
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  placeholder="Eg: Payment issue / Visit booking issue"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Describe your issue..."
                  className="min-h-[120px]"
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <div className="flex gap-2">
                  {(["low", "medium", "high"] as TicketPriority[]).map((p) => (
                    <Button
                      key={p}
                      type="button"
                      variant={ticketPriority === p ? "default" : "outline"}
                      onClick={() => setTicketPriority(p)}
                      className="capitalize"
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setOpenRaiseTicket(false)}
              >
                Cancel
              </Button>
              <Button className="btn-gradient" onClick={handleCreateTicket}>
                <Send className="w-4 h-4 mr-2" />
                Submit Ticket
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Ticket Details Dialog */}
        <Dialog open={openTicketDetails} onOpenChange={setOpenTicketDetails}>
          <DialogContent className="sm:max-w-[560px]">
            <DialogHeader>
              <DialogTitle>Ticket Details</DialogTitle>
            </DialogHeader>

            {selectedTicket ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{selectedTicket.id}</Badge>
                  <Badge className={getStatusColor(selectedTicket.status)}>
                    {selectedTicket.status.replace("-", " ")}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Subject</p>
                  <p className="font-semibold">{selectedTicket.subject}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <Badge
                    variant="secondary"
                    className={`capitalize ${
                      selectedTicket.priority === "high"
                        ? "bg-destructive/10 text-destructive"
                        : selectedTicket.priority === "medium"
                        ? "bg-warning/10 text-warning"
                        : "bg-muted"
                    }`}
                  >
                    {selectedTicket.priority}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Message</p>
                  <p className="text-sm">{selectedTicket.message || "-"}</p>
                </div>

                <div className="text-xs text-muted-foreground">
                  Created {selectedTicket.created} • Last update{" "}
                  {selectedTicket.lastUpdate}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No ticket selected.</p>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenTicketDetails(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card card-hover">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Call Support</p>
                <p className="font-semibold">+91 1800-XXX-XXXX</p>
                <p className="text-xs text-muted-foreground">24/7 Available</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card card-hover">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chat Support</p>
                <p className="font-semibold">Live Chat</p>
                <p className="text-xs text-muted-foreground">
                  Avg. response: 2 mins
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card card-hover">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Support</p>
                <p className="font-semibold">support@pgmanagement.com</p>
                <p className="text-xs text-muted-foreground">
                  Response within 24 hrs
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="faq" className="gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="tickets" className="gap-2">
              <Ticket className="w-4 h-4" />
              My Tickets
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Contact Us
            </TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-3">
                <Card className="shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {faqCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${
                          activeCategory === category.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-secondary text-muted-foreground"
                        }`}
                      >
                        <category.icon className="w-4 h-4" />
                        {category.label}
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12 lg:col-span-9 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQs..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <Accordion type="single" collapsible className="space-y-2">
                      {filteredFaqs.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`faq-${index}`}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="hover:no-underline text-left">
                            <span className="font-medium text-sm">
                              {faq.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground text-sm">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    {filteredFaqs.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No FAQs found for your search</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">My Support Tickets</CardTitle>
                  <div className="flex gap-2 flex-wrap justify-end">
                    <Badge variant="secondary">Open: {counts.open}</Badge>
                    <Badge variant="secondary">
                      In Progress: {counts.inProgress}
                    </Badge>
                    <Badge variant="secondary">Resolved: {counts.resolved}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => {
                    const StatusIcon = getStatusIcon(ticket.status);
                    return (
                      <button
                        key={ticket.id}
                        onClick={() => openDetails(ticket)}
                        className="w-full text-left flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(
                              ticket.status
                            )}`}
                          >
                            <StatusIcon className="w-5 h-5" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs text-muted-foreground">
                                {ticket.id}
                              </span>
                              <Badge
                                variant="secondary"
                                className={`text-[10px] capitalize ${
                                  ticket.priority === "high"
                                    ? "bg-destructive/10 text-destructive"
                                    : ticket.priority === "medium"
                                    ? "bg-warning/10 text-warning"
                                    : "bg-muted"
                                }`}
                              >
                                {ticket.priority}
                              </Badge>
                            </div>

                            <p className="font-medium text-sm mt-1">
                              {ticket.subject}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Created {ticket.created} • Last update{" "}
                              {ticket.lastUpdate}
                            </p>
                          </div>
                        </div>

                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace("-", " ")}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-base">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="Enter your email" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input placeholder="What is your query about?" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        placeholder="Describe your issue or question in detail..."
                        className="min-h-[150px]"
                      />
                    </div>

                    <Button
                      className="btn-gradient w-full"
                      onClick={() =>
                        toast({
                          title: "Message sent ✅",
                          description:
                            "Thanks for contacting us. We will reply soon.",
                        })
                      }
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12 lg:col-span-4 space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="w-4 h-4 text-destructive" />
                      Emergency Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      For urgent safety concerns or emergencies at your PG.
                    </p>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() =>
                        toast({
                          title: "Emergency Support",
                          description:
                            "This is a demo button. Connect to helpline API later.",
                        })
                      }
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Helpline
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-base">Office Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Monday - Friday
                      </span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      User Guide
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Terms & Conditions
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Privacy Policy
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
