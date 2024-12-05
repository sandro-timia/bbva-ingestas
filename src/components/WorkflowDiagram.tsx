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
      <div className="container mx-auto px-4">
        <div className="flex items-center max-w-6xl mx-auto">
          {/* Sample Component */}
          <div className="w-40 flex-shrink-0">
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-sm font-medium">Muestra</span>
                <ArrowUpTrayIcon className="h-4 w-4 text-gray-500 ml-2" />
              </div>
              <div className="text-xs text-gray-500">*.txt, *.csv</div>
            </div>
          </div>

          {/* Connecting Line */}
          <div className="h-[1px] w-20 bg-gray-200 -mx-px" />

          {/* Pre-dictionary Component */}
          <div className="w-64 flex-shrink-0">
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="border-b border-gray-200 p-2 flex items-center justify-between">
                <PlayIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
                <span className="text-xs text-gray-500">0/9</span>
                <div className="flex space-x-2">
                  <ArrowPathIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
                  <EyeIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-sm font-medium">Pre-diccionario</h3>
              </div>
            </div>
          </div>

          {/* Connecting Line */}
          <div className="h-[1px] w-20 bg-gray-200 -mx-px" />

          {/* Dictionary Component */}
          <div className="w-64 flex-shrink-0">
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="border-b border-gray-200 p-2 flex items-center justify-between">
                <PlayIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
                <span className="text-xs text-gray-500">0/9</span>
                <div className="flex space-x-2">
                  <ArrowPathIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
                  <EyeIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-sm font-medium">Diccionario</h3>
              </div>
            </div>
          </div>

          {/* Connecting Line */}
          <div className="h-[1px] w-20 bg-gray-200 -mx-px" />

          {/* Nebula Component */}
          <div className="w-40 flex-shrink-0">
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm text-center">
              <h3 className="text-sm font-medium">Cargar en Nebula</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 