import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ListingsPage from "./pages/ListingsPage";
import PGDetailsPage from "./pages/PGDetailsPage";
import WishlistPage from "./pages/WishlistPage";
import BookingsPage from "./pages/BookingsPage";
import PaymentsPage from "./pages/PaymentsPage";
import ReviewsPage from "./pages/ReviewsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import DocumentsPage from "./pages/DocumentsPage";
import ActivityPage from "./pages/ActivityPage";
import NotificationsPage from "./pages/NotificationsPage";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";

// Complaints extra page
import RaiseComplaint from "./pages/RaiseComplaint";

// Request Visit
import RequestVisitPage from "./pages/RequestVisitPage";

// Settings extra pages
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ManageDevicesPage from "./pages/ManageDevicesPage";
import LoginHistoryPage from "./pages/LoginHistoryPage";

// Booking Details
import BookingDetailsPage from "./pages/BookingDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<HomePage />} />

          {/* Search & Listings */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listings" element={<ListingsPage />} />

          {/* PG Details */}
          <Route path="/pg/:id" element={<PGDetailsPage />} />
          <Route path="/pg/:id/book" element={<PGDetailsPage />} />

          {/* Wishlist */}
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/wishlist/:id" element={<WishlistPage />} />

          {/* Bookings */}
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/bookings/:id" element={<BookingDetailsPage />} />

          {/* Request Visit */}
          <Route path="/request-visit" element={<RequestVisitPage />} />

          {/* Payments */}
          <Route path="/payments" element={<PaymentsPage />} />

          {/* Reviews */}
          <Route path="/reviews" element={<ReviewsPage />} />

          {/* Profile & Settings */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Settings extra pages */}
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/devices" element={<ManageDevicesPage />} />
          <Route path="/login-history" element={<LoginHistoryPage />} />

          {/* Other pages */}
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/complaints/new" element={<RaiseComplaint />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/support" element={<SupportPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
