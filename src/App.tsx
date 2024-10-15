import React, { useState, useEffect } from 'react';
import { Laptop, Server, Smartphone, Search, Plus, Edit, Trash2, AlertCircle, LogIn, UserPlus, LogOut } from 'lucide-react';
import InventoryList from './components/InventoryList';
import AddItemForm from './components/AddItemForm';
import AuthForm from './components/AuthForm';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { InventoryItem, User } from './types';

const API_URL = 'http://localhost:8000/api/';

function App() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}inventory/`, {
        headers: {
          'Authorization': `Token ${user?.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch inventory items');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching inventory items:', error);
      setError('Failed to fetch inventory items. Please try again.');
    }
  };

  const handleAuth = async (username: string, password: string, email?: string) => {
    try {
      const endpoint = isSignup ? 'auth/signup/' : 'auth/login/';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, ...(email && { email }) }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      setUser(data);
      setShowAuthForm(false);
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}auth/logout/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setUser(null);
      setItems([]);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Logout failed. Please try again.');
    }
  };

  const handleAddItem = async (newItem: Omit<InventoryItem, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}inventory/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${user?.token}`,
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const addedItem = await response.json();
      setItems([...items, addedItem]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add item. Please try again.');
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}inventory/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hardware Inventory</h1>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>Welcome, {user.username}!</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setShowAuthForm(true); setIsSignup(false); }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <LogIn size={18} className="mr-2" />
                Login
              </button>
              <button
                onClick={() => { setShowAuthForm(true); setIsSignup(true); }}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <UserPlus size={18} className="mr-2" />
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {user && (
        user.is_admin ? (
          <AdminDashboard
            items={items}
            onDeleteItem={handleDeleteItem}
            onAddItem={() => setShowAddForm(true)}
          />
        ) : (
          <UserDashboard items={items} />
        )
      )}

      {showAddForm && (
        <AddItemForm onAdd={handleAddItem} onCancel={() => setShowAddForm(false)} />
      )}

      {showAuthForm && (
        <AuthForm
          onSubmit={handleAuth}
          onCancel={() => setShowAuthForm(false)}
          isSignup={isSignup}
        />
      )}
    </div>
  );
}

export default App;