import React, { useState } from 'react';
import { useRegister } from '../hook/useRegister';
import type { AuthRequest } from '../dto/AuthDto';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const registerMutation = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const request: AuthRequest = { name, email, password, phoneNumber };
    registerMutation.mutate(request, {
      onSuccess: (user) => alert(`Welcome ${user.name}!`),
      onError: () => alert('Registration failed'),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>

        <button
          type="submit"
          disabled={registerMutation.isPending} // TanStack Query v5
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-green-300"
        >
          {registerMutation.isPending ? 'Registering...' : 'Register'}
        </button>

        {registerMutation.isError && (
          <p className="text-red-600 text-sm mt-2">Registration failed. Check your input.</p>
        )}
      </form>
    </div>
  );
}
