import React from 'react';
import { Laptop, Server, Smartphone, Edit, Trash2, Barcode } from 'lucide-react';
import { InventoryItem } from '../types';

interface InventoryListProps {
  items: InventoryItem[];
  onDelete: (id: number) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ items, onDelete }) => {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'computer':
        return <Laptop />;
      case 'server':
        return <Server />;
      case 'mobile':
        return <Smartphone />;
      default:
        return <Laptop />;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barcode</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getIcon(item.type)}
                  <span className="ml-2">{item.type}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.serialNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.barcode ? (
                  <div className="flex items-center">
                    <Barcode size={18} className="mr-2" />
                    {item.barcode}
                  </div>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  item.status === 'In Use' ? 'bg-green-100 text-green-800' :
                  item.status === 'Operational' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                  <Edit size={18} />
                </button>
                <button className="text-red-600 hover:text-red-900" onClick={() => onDelete(item.id)}>
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;