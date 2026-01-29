import { forwardRef } from "react";
import { ChevronRight, LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  viewAllLink?: string;
  viewAllLabel?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const SectionCard = forwardRef<HTMLDivElement, SectionCardProps>(
  (
    {
      title,
      subtitle,
      icon: Icon,
      iconColor = "text-primary",
      viewAllLink,
      viewAllLabel = "View All",
      children,
      className,
      contentClassName,
    },
    ref
  ) => {
    return (
      <Card ref={ref} className={cn("shadow-card", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {Icon && (
                <div className={cn("w-8 h-8 rounded-lg bg-secondary flex items-center justify-center", iconColor)}>
                  <Icon className="w-4 h-4" />
                </div>
              )}
              <div>
                <CardTitle className="text-base font-display font-semibold">{title}</CardTitle>
                {subtitle && (
                  <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
                )}
              </div>
            </div>
            {viewAllLink && (
              <Button variant="ghost" size="sm" className="text-primary" asChild>
                <Link to={viewAllLink}>
                  {viewAllLabel}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className={contentClassName}>{children}</CardContent>
      </Card>
    );
  }
);

SectionCard.displayName = "SectionCard";
