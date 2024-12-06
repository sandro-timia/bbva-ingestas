'use client';
import { useState, useRef } from 'react';
import { PlayIcon, EyeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import PreDictionaryProgress from './PreDictionaryProgress';
import CabeceraPdForm from './CabeceraPdForm';
import { useCabeceraPd } from '@/hooks/useCabeceraPd';
import { cn } from '@/lib/utils';

type TabType = 'refinamiento' | 'gobierno' | 'componentes';

interface WorkflowDiagramProps {
  tablaName: string;
  solicitudURL?: string;
  tablaId: string;
}

export default function WorkflowDiagram({ tablaName, solicitudURL, tablaId }: WorkflowDiagramProps) {
  const [activeTab, setActiveTab] = useState<TabType>('gobierno');
  const [showProgress, setShowProgress] = useState(false);
  const [showCabeceraForm, setShowCabeceraForm] = useState(false);
  const { filledFields, totalFields, loading, refresh } = useCabeceraPd(tablaId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (solicitudURL) {
      window.open(solicitudURL, '_blank');
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (filledFields === totalFields) {
      setShowProgress(true);
    }
  };

  const handleProgressClick = () => {
    setShowCabeceraForm(true);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.name.match(/\.(txt|csv)$/)) {
        alert('Por favor seleccione un archivo .txt o .csv');
        return;
      }
      setSelectedFile(file);
      // Simulate processing
      setTimeout(() => {
        setSelectedFile(null);
        alert('Archivo procesado correctamente');
      }, 1500);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gobierno':
        return (
          <>
            <div className="container mx-auto px-4">
              <div className="flex items-center max-w-6xl mx-auto">
                {/* Sample Component */}
                <div className="w-40 flex-shrink-0">
                  <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".txt,.csv"
                      className="hidden"
                    />
                    <div 
                      className="flex items-center justify-center mb-2 cursor-pointer group"
                      onClick={handleFileClick}
                    >
                      <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                        {selectedFile ? selectedFile.name : 'Muestra'}
                      </span>
                      <ArrowUpTrayIcon 
                        className={cn(
                          "h-4 w-4 ml-2 transition-colors",
                          selectedFile 
                            ? "text-green-500" 
                            : "text-gray-500 group-hover:text-blue-600"
                        )}
                      />
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
                      <PlayIcon 
                        className={cn(
                          "h-4 w-4 text-gray-600",
                          filledFields === totalFields 
                            ? "cursor-pointer hover:text-blue-600 transition-colors" 
                            : "opacity-50 cursor-not-allowed"
                        )}
                        onClick={handlePlayClick}
                        title={filledFields === totalFields 
                          ? "Iniciar proceso" 
                          : "Complete todos los campos de la cabecera para continuar"}
                      />
                      <span 
                        className="text-xs text-gray-500 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={handleProgressClick}
                      >
                        {loading ? '...' : `${filledFields}/${totalFields}`}
                      </span>
                      <div className="flex space-x-2">
                        <ArrowPathIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
                        <EyeIcon 
                          className="h-4 w-4 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={handleViewClick}
                          title="Ver solicitud"
                        />
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
                        <EyeIcon 
                          className="h-4 w-4 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={handleViewClick}
                          title="Ver solicitud"
                        />
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
            {showProgress && (
              <>
                <div className="fixed inset-0 bg-black/20" />
                <PreDictionaryProgress
                  tableName={tablaName}
                  onComplete={() => setShowProgress(false)}
                />
              </>
            )}
            <CabeceraPdForm
              isOpen={showCabeceraForm}
              onClose={() => {
                setShowCabeceraForm(false);
                refresh();
              }}
              tablaId={tablaId}
            />
          </>
        );
      case 'componentes':
        return (
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Blank content for Componentes de Ingesta */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
            onClick={() => setActiveTab('gobierno')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'gobierno'
                ? 'text-[#00A3FF] border-[#00A3FF]'
                : 'text-gray-500 border-transparent hover:border-gray-300'
            }`}
            title={`Gobierno del Dato para ${tablaName}`}
          >
            Gobierno del Dato
          </button>
          <button
            onClick={() => setActiveTab('componentes')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'componentes'
                ? 'text-[#00A3FF] border-[#00A3FF]'
                : 'text-[#0A3977] border-transparent hover:border-[#0A3977]/20'
            }`}
            title={`Componentes de Ingesta para ${tablaName}`}
          >
            Componentes de Ingesta
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
} 