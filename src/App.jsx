import MainLayout from '../src/components/Layout/MainLayout.jsx';

import {
  IndianRupee,
  AlertTriangle,
  Package
} from 'lucide-react';

export default function App() {
    const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('sf_items');
      return stored ? JSON.parse(stored) : null;
    } 
    catch {
      return null;
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
      item.id === id ? { ...item, stock: item.stock + 1 } : item);
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

  const handleDeleteItem = (id) => {
    const nextItems = items.filter(item => item.id !== id);
    updateItemsAndLog(nextItems);
  };

  const handleAddItem = (newItemData) => {
    const newItem = {
      id: Date.now(),
      ...newItemData
    };
    const nextItems = [newItem, ...items];
    updateItemsAndLog(nextItems);
  };


  return (
    <div>App</div>
  )
}

