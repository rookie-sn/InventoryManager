import { Layers } from 'lucide-react';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">

              <div className="bg-slate-900 text-white p-2 rounded-lg">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-slate-900 tracking-tight">
                StockFlow
                </span>
            </div>

          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
     
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400">
          StockFlow Inventory Management App &copy; {new Date().getFullYear()}. Portfolio Demo.
        </div>
      </footer>
    </div>
  );
}
