import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AddItemForm({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({name: '', category: 'Electronics', stock: '', reorderPoint: '5', price: '',
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {if (isOpen) 
    {setFormData({ name: '', category: 'Electronics', stock: '', reorderPoint: '5', price: '', });
    setErrors({});
    }}, [isOpen]);
  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    const stockVal = parseInt(formData.stock, 10);
    if (isNaN(stockVal) || stockVal < 0) {
      newErrors.stock = 'Initial stock must be a non-negative number.';
    }
    const reorderVal = parseInt(formData.reorderPoint, 10); //reorder value validator
    if (isNaN(reorderVal) || reorderVal < 0) {
      newErrors.reorderPoint = 'Reorder point must be a non-negative number.';
    }
    const priceVal = parseFloat(formData.price);
    if (isNaN(priceVal) || priceVal <= 0) {
      newErrors.price = 'Price must be a positive decimal value.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd({name: formData.name.trim(), category: formData.category, stock: parseInt(formData.stock, 10), reorderPoint: parseInt(formData.reorderPoint, 10),
      price: parseFloat(formData.price),
    });
    onClose();
  };
  const categories = ['Electronics', 'Apparel', 'Office Supplies', 'Food & Beverage', 'Furniture', 'Other'];
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
    <div className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Add New Inventory Item</h3>
        <button onClick={onClose}
          className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        ><X className="h-5 w-5" /></button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Item Name</label>
          <input type="text" placeholder="e.g. Mouse" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 transition-colors ${errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-slate-400 focus:ring-slate-400'}`} />
          {errors.name && <span className="text-[11px] text-red-500 mt-1 block">{errors.name}</span>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Category</label>
          <select value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-slate-400 transition-colors cursor-pointer">
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Initial Stock</label>
            <input type="number" min="0" placeholder="e.g. 50" value={formData.stock} onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 transition-colors ${errors.stock ? 'border-red-300 focus:border-red-400 focus:ring-red-400'
                : 'border-slate-200 focus:border-slate-400 focus:ring-slate-400'}`} />
            {errors.stock && <span className="text-[11px] text-red-500 mt-1 block">{errors.stock}</span>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Reorder Point</label>
            <input type="number" min="0" placeholder="e.g. 5" value={formData.reorderPoint} onChange={(e) => setFormData(prev => ({ ...prev, reorderPoint: e.target.value }))} className={`w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 transition-colors 
            ${errors.reorderPoint ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-slate-400 focus:ring-slate-400'}`}
            />
            {errors.reorderPoint && <span className="text-[11px] text-red-500 mt-1 block">{errors.reorderPoint}</span>}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Unit Price (₹ INR)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">₹</span>
            <input type="number" min="0.01" step="0.01" placeholder="0.00" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))} className={`w-full pl-7 pr-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 transition-colors ${errors.price ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-slate-400 focus:ring-slate-400'}`} />
          </div>
          {errors.price && <span className="text-[11px] text-red-500 mt-1 block">{errors.price}</span>}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 mt-6">
          <button type="button" onClick={onClose}
            className="px-4 py-2 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"> Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-sm">
            Add Item
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

