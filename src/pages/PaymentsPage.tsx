import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/StatCard";
import {
  CreditCard,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  Receipt,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

const paymentHistory = [
  {
    id: "1",
    description: "Monthly Rent - January 2026",
    amount: 8500,
    date: "Jan 05, 2026",
    status: "paid",
    type: "debit",
  },
  {
    id: "2",
    description: "Security Deposit Refund",
    amount: 15000,
    date: "Dec 28, 2025",
    status: "processing",
    type: "credit",
  },
  {
    id: "3",
    description: "Monthly Rent - December 2025",
    amount: 8500,
    date: "Dec 05, 2025",
    status: "paid",
    type: "debit",
  },
  {
    id: "4",
    description: "Electricity Bill - December",
    amount: 850,
    date: "Dec 10, 2025",
    status: "paid",
    type: "debit",
  },
  {
    id: "5",
    description: "Monthly Rent - November 2025",
    amount: 8500,
    date: "Nov 05, 2025",
    status: "paid",
    type: "debit",
  },
];

const pendingDues = [
  { label: "Current Month Rent", amount: 8500, dueDate: "Feb 05, 2026" },
  { label: "Maintenance Charges", amount: 500, dueDate: "Feb 10, 2026" },
];

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Payments & Billing
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your rent payments, dues, and billing history
            </p>
          </div>
          <Button className="btn-gradient">
            <CreditCard className="w-4 h-4 mr-2" />
            Pay Now
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Current Month Dues"
            value="₹9,000"
            subtitle="Due by Feb 05"
            icon={IndianRupee}
            color="warning"
          />
          <StatCard
            title="Total Paid"
            value="₹68,000"
            subtitle="Last 6 months"
            icon={CheckCircle}
            color="success"
          />
          <StatCard
            title="Security Deposit"
            value="₹17,000"
            subtitle="Held with owner"
            icon={Receipt}
            color="info"
          />
          <StatCard
            title="Pending Refund"
            value="₹15,000"
            subtitle="Processing"
            icon={Clock}
            color="primary"
          />
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Payment History */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Payment History</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            payment.type === "credit"
                              ? "bg-success/15 text-success"
                              : "bg-primary/15 text-primary"
                          }`}
                        >
                          {payment.type === "credit" ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{payment.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            payment.type === "credit"
                              ? "text-success"
                              : "text-foreground"
                          }`}
                        >
                          {payment.type === "credit" ? "+" : "-"}₹
                          {payment.amount.toLocaleString()}
                        </p>
                        <Badge
                          className={
                            payment.status === "paid"
                              ? "bg-success/15 text-success"
                              : "bg-warning/15 text-warning"
                          }
                        >
                          {payment.status === "paid" ? "Paid" : "Processing"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Pending Dues */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  Pending Dues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingDues.map((due, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20"
                  >
                    <div>
                      <p className="font-medium text-sm">{due.label}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {due.dueDate}
                      </p>
                    </div>
                    <p className="font-semibold">₹{due.amount.toLocaleString()}</p>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Due</span>
                    <span className="text-xl font-bold text-primary">₹9,000</span>
                  </div>
                </div>
                <Button className="w-full btn-gradient">Pay All Dues</Button>
              </CardContent>
            </Card>

            {/* Security Deposit */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Security Deposit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Deposit Amount
                    </span>
                    <span className="font-semibold">₹17,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className="bg-success/15 text-success">Active</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your security deposit will be refunded within 30 days of move-out
                  after deducting any pending dues.
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="w-4 h-4 mr-2" />
                  Request Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Report Payment Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
