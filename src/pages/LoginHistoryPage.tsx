import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function LoginHistoryPage() {
  const history = [
    { id: 1, device: "Chrome on Windows", time: "Today 10:30 AM", location: "Hyderabad" },
    { id: 2, device: "Android Device", time: "Yesterday 08:10 PM", location: "Hyderabad" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Login History
        </h1>

        <div className="grid gap-4">
          {history.map((h) => (
            <Card key={h.id} className="shadow-card">
              <CardHeader>
                <CardTitle>{h.device}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{h.location}</p>
                <p className="text-sm font-medium">{h.time}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
