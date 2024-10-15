import React from 'react';
import InventoryList from './InventoryList';
import { InventoryItem } from '../types';

interface UserDashboardProps {
  items: InventoryItem[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ items }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <InventoryList items={items} onDelete={() => {}} />
    </div>
  );
};

export default UserDashboard;