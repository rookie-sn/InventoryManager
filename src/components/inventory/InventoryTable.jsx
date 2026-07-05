import { useState } from 'react';
import { Search, Plus, Minus, Trash2, Filter } from 'lucide-react';

export default function InventoryTable({ items, onInflow, onOutflow, onDelete, onOpenAddForm }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const categories = ['All', ...new Set(items.map(item => item.category))];
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const getStatusBadge = (stock, reorderPoint) => {
    if (stock === 0) { //status badge
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          Out of Stock </span>);
    } else if (stock <= reorderPoint) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          Low Stock</span> );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          In Stock </span>
      );
    }
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search items by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2 pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-colors"
            />
          </div>
     <div className="relative min-w-[160px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white appearance-none focus:outline-none focus:border-slate-400 transition-colors cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}</select>
          </div>
        </div>
        <button onClick={onOpenAddForm}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-sm shrink-0">
          <Plus className="h-4 w-4" />
          <span>Add New Item</span>
        </button>
      </div>
<div className="overflow-x-auto">
  <table className="w-full border-collapse text-left text-sm">
    <thead>
      <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-500 font-medium">
        <th className="px-6 py-4">Item Name</th>
        <th className="px-6 py-4">Category</th>
        <th className="px-6 py-4 text-right">Price</th>
        <th className="px-6 py-4 text-center">Stock Level</th>
        <th className="px-6 py-4 text-center">Min Reorder</th>
        <th className="px-6 py-4 text-center">Status</th>
        <th className="px-6 py-4 text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
      {filteredItems.length === 0 ? (
        <tr>
          <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium"> No items found matching the search criteria </td>
        </tr>) : (
        filteredItems.map((item) => (
          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4">
              <div className="font-semibold text-slate-900">{item.name}</div>
            </td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                {item.category}
              </span>
            </td>
            <td className="px-6 py-4 text-right font-medium text-slate-900">
              ₹{parseFloat(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-6 py-4 text-center">
              <span className={`font-semibold ${item.stock === 0 ? 'text-rose-600 font-bold' : item.stock <= item.reorderPoint ? 'text-amber-600' : 'text-slate-900'}`}>
                {item.stock}
              </span>
            </td>
            <td className="px-6 py-4 text-center text-slate-400">{item.reorderPoint}</td>
            <td className="px-6 py-4 text-center">
              {getStatusBadge(item.stock, item.reorderPoint)}
            </td>
                <td className="px-6 py-4 text-right">
              {confirmDeleteId === item.id ? (
                <div className="flex items-center justify-end space-x-2 animate-in fade-in slide-in-from-right-1 duration-150">
                  <button className="text-xs text-rose-600 font-medium">Confirm</button>
                  <button className="text-xs text-slate-500">Cancel</button>
                </div>
              ) : (
                <div className="flex items-center justify-end space-x-2">
                  <button className="text-xs text-indigo-600 font-medium">Edit</button>
                  <button className="text-xs text-slate-500">Delete</button>
                </div>
              )}
            </td>

          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
</div>
  );
}