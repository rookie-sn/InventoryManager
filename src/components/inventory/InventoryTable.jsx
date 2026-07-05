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
          <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">
            No items found matching the search criteria.
          </td>
        </tr>
      ) : (
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