import React from 'react';
import { AuthForm } from './components/auth/AuthForm';
import { ProfileForm } from './components/profile/ProfileForm';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, isLoading, error, login, register, updateProfile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="max-w-md mx-auto mb-4">
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!user ? (
          <div className="max-w-md mx-auto">
            <AuthForm
              mode="login"
              onSubmit={login}
              isLoading={isLoading}
            />
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{' '}
              <button
                onClick={() => {}}
                className="text-blue-500 hover:text-blue-600"
              >
                Sign up
              </button>
            </p>
          </div>
        ) : (
          <ProfileForm
            user={user}
            onUpdate={updateProfile}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;