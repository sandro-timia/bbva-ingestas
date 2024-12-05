'use client';
import { BellIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "PLATAFORMA INGESTAS" }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0A3977]">{title}</h1>
          <p className="text-gray-500 text-sm">Bienvenido usuario: juanpablo.contractor@gdevtools.com</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Sign Out
          </button>
          <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </div>
          <div className="h-8 w-8 rounded-full bg-[#0A3977] text-white flex items-center justify-center">
            <span className="text-sm font-medium">JP</span>
          </div>
        </div>
      </div>
    </header>
  );
} 