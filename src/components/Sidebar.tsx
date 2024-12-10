'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, BeakerIcon, TableCellsIcon, Cog6ToothIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { useSidebar } from '@/context/SidebarContext';

const navItems = [
  { icon: HomeIcon, label: 'Inicio', href: '/' },
  { icon: BeakerIcon, label: 'Ingestas', href: '/ingestas' },
  { icon: TableCellsIcon, label: 'Tablas', href: '/tablas' },
  { icon: Cog6ToothIcon, label: 'Configuración', href: '/configuration' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isExpanded, setIsExpanded } = useSidebar();

  return (
    <>
      <div 
        className={`fixed left-0 top-0 h-screen bg-[#0A3977] flex flex-col justify-between py-6 transition-all duration-300 ${
          isExpanded ? 'w-[180px]' : 'w-[60px]'
        }`}
      >
        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-8 bg-[#0A3977] p-1.5 rounded-full transform transition-transform hover:bg-[#0067B2]"
        >
          <ChevronDoubleRightIcon 
            className={`w-4 h-4 text-white transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Top Section */}
        <div className="flex flex-col items-center space-y-4">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link 
              key={href}
              href={href} 
              className={`p-3 rounded-lg transition-colors w-full flex items-center ${
                pathname === href ? 'bg-[#0067B2]' : 'hover:bg-[#0067B2]/50'
              }`}
            >
              <Icon className="w-6 h-6 text-white" />
              {isExpanded && (
                <span className="ml-3 text-white text-sm whitespace-nowrap">
                  {label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className={`transition-all duration-300 ${isExpanded ? 'w-[180px]' : 'w-[60px]'}`} />
    </>
  );
} 