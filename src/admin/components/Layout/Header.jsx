import { Trophy, Menu, X } from "lucide-react";

export default function Header({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-600" />
            <div>
              <h1 className="text-gray-900">Bull Race Management</h1>
              <p className="text-gray-600 text-sm">Admin Dashboard</p>
            </div>
          </div>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
