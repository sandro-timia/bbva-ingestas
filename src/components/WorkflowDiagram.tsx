'use client';
import { PlayIcon, EyeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

interface WorkflowDiagramProps {
  tablaName: string;
}

export default function WorkflowDiagram({ tablaName }: WorkflowDiagramProps) {
  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            disabled
            className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 cursor-not-allowed"
            title={`Refinamiento para ${tablaName}`}
          >
            Refinamiento
          </button>
          <button
            className="py-4 px-1 border-b-2 font-medium text-sm text-[#00A3FF] border-[#00A3FF]"
            title={`Gobierno del Dato para ${tablaName}`}
          >
            Gobierno del Dato
          </button>
          <button
            className="py-4 px-1 border-b-2 font-medium text-sm text-[#0A3977] border-transparent hover:border-[#0A3977]/20"
            title={`Componentes de Ingesta para ${tablaName}`}
          >
            Componentes de Ingesta
          </button>
        </nav>
      </div>

      {/* Workflow Diagram */}
      <div className="flex items-center justify-between gap-8 px-4">
        {/* Sample Component */}
        <div className="flex-shrink-0 w-48">
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Muestra</span>
              <ArrowUpTrayIcon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-xs text-gray-500">*.txt, *.csv</div>
          </div>
        </div>

        {/* Connecting Line */}
        <div className="flex-grow h-[2px] bg-gray-200" />

        {/* Pre-dictionary Component */}
        <div className="flex-shrink-0 w-80">
          <div className="border rounded-lg bg-white shadow-sm">
            <div className="border-b p-2 flex items-center justify-between">
              <PlayIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
              <span className="text-xs text-gray-500">0/9</span>
              <div className="flex space-x-2">
                <ArrowPathIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
                <EyeIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium">Pre-diccionario</h3>
            </div>
          </div>
        </div>

        {/* Connecting Line */}
        <div className="flex-grow h-[2px] bg-gray-200" />

        {/* Dictionary Component */}
        <div className="flex-shrink-0 w-80">
          <div className="border rounded-lg bg-white shadow-sm">
            <div className="border-b p-2 flex items-center justify-between">
              <EyeIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
              <span className="text-xs text-gray-500">0/9</span>
              <PlayIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium">Diccionario</h3>
            </div>
          </div>
        </div>

        {/* Connecting Line */}
        <div className="flex-grow h-[2px] bg-gray-200" />

        {/* Nebula Component */}
        <div className="flex-shrink-0 w-48">
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-sm font-medium">Cargar en Nebula</h3>
          </div>
        </div>
      </div>
    </div>
  );
} 