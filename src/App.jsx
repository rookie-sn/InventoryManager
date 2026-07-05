import { useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import StatCard from './components/Dashboard/StatCard';
import InventoryTable from './components/Inventory/InventoryTable';

import {
  IndianRupee, AlertTriangle, Package} from 'lucide-react';

const INITIAL_ITEMS = [
  { id: 1, name: 'iPhone 15 Pro', category: 'Electronics', stock: 24, reorderPoint: 5, price: 999.00 }];

export default function App() {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('sf_items');
      return stored ? JSON.parse(stored) : INITIAL_ITEMS;
    } catch {
      return INITIAL_ITEMS;
    }
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const updateItemsAndLog = (newItems) => {
    setItems(newItems);
    localStorage.setItem('sf_items', JSON.stringify(newItems));
  };

  const totalStockValue = items.reduce((sum, item) => sum + (item.stock * item.price), 0);
  const lowStockCount = items.filter(item => item.stock > 0 && item.stock <= item.reorderPoint).length;
  const outOfStockCount = items.filter(item => item.stock === 0).length;
  const totalStockQuantity = items.reduce((sum, item) => sum + item.stock, 0);

  const handleInflow = (id) => {
    const itemToUpdate = items.find(item => item.id === id);
    if (!itemToUpdate) return;

    const nextItems = items.map(item =>
      item.id === id ? { ...item, stock: item.stock + 1 } : item
    );
    updateItemsAndLog(nextItems);
  };

  const handleOutflow = (id) => {
    const itemToUpdate = items.find(item => item.id === id);
    if (!itemToUpdate || itemToUpdate.stock <= 0) return;

    const nextItems = items.map(item =>
      item.id === id ? { ...item, stock: item.stock - 1 } : item
    );
    updateItemsAndLog(nextItems);
  };

  // Delete Handler
  const handleDeleteItem = (id) => {
    const nextItems = items.filter(item => item.id !== id);
    updateItemsAndLog(nextItems);
  };

  // Add Item Handler
  const handleAddItem = (newItemData) => {
    const newItem = {
      id: Date.now(),
      ...newItemData
    };
    const nextItems = [newItem, ...items];
    updateItemsAndLog(nextItems);
  };

  return (
    <MainLayout>
      <div className="space-y-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Inventory Dashboard</h2>
            <p className="text-sm text-slate-500">Real-time stock valuation and inventory control console.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Stock Value"
            value={`₹${totalStockValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            icon={IndianRupee}
            description="Sum of price × stock for all items"
          />
          <StatCard
            title="Low Stock Items"
            value={lowStockCount}
            icon={AlertTriangle}
            badge={lowStockCount > 0 ? {
              text: 'Needs Reorder',
              className: 'bg-amber-100 text-amber-800'
            } : null}
            description={`Items below threshold (${outOfStockCount} out of stock)`}
          />
          <StatCard
            title="Total Items in Stock"
            value={totalStockQuantity}
            icon={Package}
            description="Total quantity of all products"
          />
        </div>

        <InventoryTable
          items={items}
          onInflow={handleInflow}
          onOutflow={handleOutflow}
          onDelete={handleDeleteItem}
          onOpenAddForm={() => setIsAddModalOpen(true)}
        />

        <AddItemForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddItem}
        />
      </div>
    </MainLayout>
  );
}
