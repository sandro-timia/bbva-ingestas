'use client';

import { 
  HomeIcon,
  BeakerIcon, 
  TableCellsIcon,
  Cog6ToothIcon,  // Configuration icon
  GlobeAltIcon 
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-[60px] bg-[#0A3977] flex flex-col justify-between py-6">
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-4">
        <Link 
          href="/" 
          className={`p-3 rounded-lg transition-colors ${
            pathname === '/' ? 'bg-[#0067B2]' : 'hover:bg-[#0067B2]/50'
          }`}
        >
          <HomeIcon className="w-6 h-6 text-white" />
        </Link>
        <Link 
          href="/ingestas" 
          className={`p-3 rounded-lg transition-colors ${
            pathname === '/ingestas' ? 'bg-[#0067B2]' : 'hover:bg-[#0067B2]/50'
          }`}
        >
          <BeakerIcon className="w-6 h-6 text-white" />
        </Link>
        <Link 
          href="/tablas" 
          className={`p-3 rounded-lg transition-colors ${
            pathname === '/tablas' ? 'bg-[#0067B2]' : 'hover:bg-[#0067B2]/50'
          }`}
        >
          <TableCellsIcon className="w-6 h-6 text-white" />
        </Link>
        <Link 
          href="/configuration" 
          className={`p-3 rounded-lg transition-colors ${
            pathname === '/configuration' ? 'bg-[#0067B2]' : 'hover:bg-[#0067B2]/50'
          }`}
        >
          <Cog6ToothIcon className="w-6 h-6 text-white" />
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center space-y-4">
        <button className="p-3 hover:bg-[#0067B2]/50 rounded-lg transition-colors">
          <GlobeAltIcon className="w-6 h-6 text-white" />
        </button>
        <button className="w-6 h-4 overflow-hidden">
          <div className="h-1/3 bg-yellow-400"></div>
          <div className="h-1/3 bg-blue-600"></div>
          <div className="h-1/3 bg-red-600"></div>
        </button>
      </div>
    </div>
  );
} 