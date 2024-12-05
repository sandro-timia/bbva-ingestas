import { MagnifyingGlassIcon, BellIcon, HomeIcon, PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#0A3977]">PLATAFORMA INGESTAS</h1>
            <p className="text-gray-500 text-sm">Bienvenido usuario: juanpablo.contractor@gdevtools.com</p>
          </div>
          <div className="flex items-center space-x-4">
            <HomeIcon className="h-6 w-6 text-gray-600" />
            <div className="relative">
              <BellIcon className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </div>
            <div className="h-8 w-8 rounded-full bg-[#0A3977] text-white flex items-center justify-center">
              <span className="text-sm font-medium">JP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-[#00A3FF] text-xl font-semibold mb-6">Mis Ingestas</h2>
        
        {/* Search and Create Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-lg">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por Ticket Jira"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="ml-4 bg-[#0A3977] text-white px-4 py-2 rounded-md flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Crear Ingesta
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#EEF3F8]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">TicketJira</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nombre del proyecto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Fecha Creación</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Fecha Fin</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">JIRA-009</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Perfil Liquido NGA Cobranzas</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">04/12/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">30/12/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pendiente
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <PencilIcon className="h-5 w-5 text-blue-600 cursor-pointer" />
                      <PlusIcon className="h-5 w-5 text-blue-600 cursor-pointer" />
                      <TrashIcon className="h-5 w-5 text-blue-600 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-6">
          <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Previous</button>
          <button className="px-3 py-2 text-sm text-white bg-[#0A3977] rounded-md">1</button>
          <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">2</button>
          <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">3</button>
          <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Next</button>
        </div>
      </main>
    </div>
  );
}
