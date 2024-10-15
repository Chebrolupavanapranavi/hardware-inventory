import React from 'react';
import InventoryList from './InventoryList';
import { InventoryItem } from '../types';

interface AdminDashboardProps {
  items: InventoryItem[];
  onDeleteItem: (id: number) => void;
  onAddItem: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ items, onDeleteItem, onAddItem }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <button
        onClick={onAddItem}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Add New Item
      </button>
      <InventoryList items={items} onDelete={onDeleteItem} />
    </div>
  );
};

export default AdminDashboard;