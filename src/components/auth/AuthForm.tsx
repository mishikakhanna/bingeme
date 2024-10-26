// src/components/auth/AuthForm.tsx

import React from 'react';
import { LoginCredentials } from '../../types'; // Assuming you have this type defined somewhere

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
  onAuthSuccess: (data: { token: string; user: any }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, isLoading, onAuthSuccess }) => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const credentials = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    } as LoginCredentials;

    try {
      await onSubmit(credentials);
      onAuthSuccess({ token: 'dummy-token', user: {} }); // Replace with real data
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        {/* Your form elements go here */}
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
  );
};

export default AuthForm;