import { 
  Bars3Icon,
  HomeIcon, 
  UserIcon, 
  ClipboardDocumentListIcon, 
  CalendarIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon 
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-[60px] bg-[#002A61] flex flex-col justify-between py-4">
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-6">
        <button className="p-3 hover:bg-[#0067B2]/50 rounded-lg transition-colors">
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>
        
        {/* Navigation Icons */}
        <nav className="flex flex-col items-center space-y-4">
          <Link href="/" className="p-3 bg-[#0067B2] rounded-lg">
            <HomeIcon className="w-6 h-6 text-white" />
          </Link>
          <Link href="/profile" className="p-3 hover:bg-[#0067B2]/50 rounded-lg transition-colors">
            <UserIcon className="w-6 h-6 text-white" />
          </Link>
          <Link href="/documents" className="p-3 hover:bg-[#0067B2]/50 rounded-lg transition-colors">
            <ClipboardDocumentListIcon className="w-6 h-6 text-white" />
          </Link>
          <Link href="/calendar" className="p-3 hover:bg-[#0067B2]/50 rounded-lg transition-colors">
            <CalendarIcon className="w-6 h-6 text-white" />
          </Link>
          <Link href="/search" className="p-3 hover:bg-[#0067B2]/50 rounded-lg transition-colors">
            <MagnifyingGlassIcon className="w-6 h-6 text-white" />
          </Link>
        </nav>
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