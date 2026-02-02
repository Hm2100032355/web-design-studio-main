import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Heart,
  Calendar,
  CreditCard,
  MessageSquare,
  Star,
  FileText,
  History,
  Bell,
  User,
  HelpCircle,
  Settings,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { icon: Home, label: "Home / Dashboard", to: "/" },
  { icon: Search, label: "Search PGs", to: "/search" },
  { icon: Building2, label: "PG Listings", to: "/listings" },
  { icon: Heart, label: "Wishlist / Favorites", to: "/wishlist" },
  { icon: Calendar, label: "Bookings & Visits", to: "/bookings" },
  { icon: CreditCard, label: "Payments & Billing", to: "/payments" },
  { icon: MessageSquare, label: "Complaints & Requests", to: "/complaints" },
  { icon: Star, label: "Reviews & Ratings", to: "/reviews" },
  { icon: FileText, label: "Documents & Agreements", to: "/documents" },
];

const secondaryNavItems = [
  { icon: History, label: "Activity & History", to: "/activity" },
  { icon: Bell, label: "Notifications", to: "/notifications" },
  { icon: User, label: "Profile & Account", to: "/profile" },
  { icon: HelpCircle, label: "Support & Help", to: "/support" },
  { icon: Settings, label: "Settings & Preferences", to: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  const NavItem = ({ item }: { item: typeof mainNavItems[0] }) => {
    const isActive = location.pathname === item.to || 
      (item.to !== "/" && location.pathname.startsWith(item.to));

    return (
      <NavLink
        to={item.to}
        className={cn(
          "nav-item group",
          isActive && "active"
        )}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        <span className="flex-1 text-sm">{item.label}</span>
      </NavLink>
    );
  };

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 sidebar-gradient shadow-sidebar flex flex-col z-40">
      {/* Logo */}
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary/20 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-sidebar-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-sidebar-foreground text-sm">Hostel / PG</h1>
            <p className="text-xs text-sidebar-foreground/60">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 space-y-1">
        {mainNavItems.map((item) => (
          <NavItem key={item.to} item={item} />
        ))}
        
        <div className="my-4 border-t border-sidebar-border" />
        
        {secondaryNavItems.map((item) => (
          <NavItem key={item.to} item={item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          © 2026 Hostel / PG Management
        </p>
        <p className="text-xs text-sidebar-foreground/40 text-center mt-1">
          Secure • Reliable • Cloud-Based
        </p>
      </div>
    </aside>
  );
}
