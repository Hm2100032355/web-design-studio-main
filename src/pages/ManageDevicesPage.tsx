import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ManageDevicesPage() {
  const { toast } = useToast();

  const devices = [
    { id: 1, name: "Chrome on Windows", location: "Hyderabad, India", active: true },
    { id: 2, name: "Android Device", location: "Hyderabad, India", active: false },
  ];

  const logoutDevice = (id: number) => {
    toast({
      title: "Device logged out",
      description: `Device ${id} removed successfully.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Smartphone className="w-6 h-6" />
          Manage Devices
        </h1>

        <div className="grid gap-4">
          {devices.map((d) => (
            <Card key={d.id} className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{d.name}</span>
                  {d.active && (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/15 text-green-600">
                      Active
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">{d.location}</p>

                {!d.active && (
                  <Button
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    onClick={() => logoutDevice(d.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Logout Device
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
