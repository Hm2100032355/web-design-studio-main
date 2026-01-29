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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/pg/:id" element={<PGDetailsPage />} />
          <Route path="/pg/:id/book" element={<PGDetailsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/wishlist/:id" element={<WishlistPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
