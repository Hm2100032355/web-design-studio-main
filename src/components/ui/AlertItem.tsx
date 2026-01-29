import { forwardRef } from "react";
import { Bell, AlertCircle, CheckCircle, Info, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AlertType = "info" | "success" | "warning" | "error";

interface AlertItemProps {
  type: AlertType;
  title: string;
  description?: string;
  time?: string;
  onClick?: () => void;
}

const alertIcons = {
  info: Info,
  success: CheckCircle,
  warning: Bell,
  error: AlertCircle,
};

const alertClasses = {
  info: "text-info bg-info/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  error: "text-destructive bg-destructive/10",
};

export const AlertItem = forwardRef<HTMLDivElement, AlertItemProps>(
  ({ type, title, description, time, onClick }, ref) => {
    const Icon = alertIcons[type];

    return (
      <Card
        ref={ref}
        className={cn(
          "alert-card cursor-pointer hover:bg-secondary/70 transition-colors",
          onClick && "hover:shadow-sm"
        )}
        onClick={onClick}
      >
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", alertClasses[type])}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{description}</p>
          )}
          {time && (
            <p className="text-xs text-muted-foreground/70 mt-1">{time}</p>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </Card>
    );
  }
);

AlertItem.displayName = "AlertItem";
