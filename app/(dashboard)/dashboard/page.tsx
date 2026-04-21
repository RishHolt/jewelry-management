import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const kpis = [
  {
    label: "Total Inventory",
    value: "—",
    description: "Items in stock",
    icon: Package,
  },
  {
    label: "Sales This Month",
    value: "—",
    description: "Total revenue",
    icon: TrendingUp,
  },
  {
    label: "Active Orders",
    value: "—",
    description: "Pending fulfillment",
    icon: ShoppingCart,
  },
  {
    label: "Total Customers",
    value: "—",
    description: "Registered customers",
    icon: Users,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back. Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ label, value, description, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gold-50">
                <Icon className="h-4 w-4 text-gold-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
