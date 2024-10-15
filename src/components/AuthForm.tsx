import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AuthFormProps {
  onSubmit: (username: string, password: string, isAdmin: boolean, isUser: boolean, email?: string) => void;
  onCancel: () => void;
  isSignup: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, onCancel, isSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      await onSubmit(username, password, isAdmin, isUser, isSignup ? email : undefined);
      // Reset the form after submission if necessary
      setUsername('');
      setPassword('');
      setEmail('');
      setIsAdmin(false);
      setIsUser(true);
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.'); // Handle specific error if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Log In'}</h2>
        
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          {isSignup && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
                aria-label="Email"
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              aria-label="Password"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                  if (e.target.checked) setIsUser(false);
                }}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">{isSignup ? 'Sign up' : 'Log in'} as Admin</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isUser}
                onChange={(e) => {
                  setIsUser(e.target.checked);
                  if (e.target.checked) setIsAdmin(false);
                }}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">{isSignup ? 'Sign up' : 'Log in'} as User</span>
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
              {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Log In')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
