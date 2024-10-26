import { useState, useCallback, useEffect } from 'react';
import type { User, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { api } from '../services/api';

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  const setError = (error: string) => {
    setState(prev => ({ ...prev, error, isLoading: false }));
  };

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { user } = await api.login(credentials);
      setState({ user, isLoading: false, error: null });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to login');
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { user } = await api.register(credentials);
      setState({ user, isLoading: false, error: null });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to register');
    }
  }, []);

  const logout = useCallback(() => {
    api.clearToken();
    setState({ user: null, isLoading: false, error: null });
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!state.user) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const updatedUser = await api.updateProfile(state.user.id, data);
      setState(prev => ({ ...prev, user: updatedUser, isLoading: false }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    }
  }, [state.user]);

  const uploadProfilePicture = useCallback(async (file: File) => {
    if (!state.user) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { url } = await api.uploadProfilePicture(file);
      const updatedUser = await api.updateProfile(state.user.id, { profilePicture: url });
      setState(prev => ({ ...prev, user: updatedUser, isLoading: false }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload profile picture');
    }
  }, [state.user]);

  useEffect(() => {
    const token = api.getToken();
    if (!token) {
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }
    // TODO: Implement token validation/user info fetch
    setState(prev => ({ ...prev, isLoading: false }));
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    uploadProfilePicture,
  };
}