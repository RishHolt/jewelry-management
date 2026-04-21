import { Package } from "lucide-react";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Inventory</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your jewelry items and stock levels.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-white py-20 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-50">
          <Package className="h-6 w-6 text-gold-500" />
        </div>
        <h3 className="mt-4 text-sm font-medium text-foreground">No items yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">Add your first inventory item to get started.</p>
      </div>
    </div>
  );
}
