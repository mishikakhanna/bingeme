import type { LoginCredentials, RegisterCredentials, User } from '../types/auth';

const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options);

    if (!response.ok) {
      const message = `An error has occurred: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    try {
      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error('Error parsing response JSON.');
    }
  }

  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    try {
      const endpoint = `${API_BASE_URL}/auth/login`;
      console.log('Login endpoint:', endpoint); // Log the full endpoint URL

      const data = await this.request<{ token: string; user: User }>(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      this.setToken(data.token);

      return data;
    } catch (error) {
      console.error('Login request failed:', error);
      throw new Error('Login failed.');
    }
  }

  async register(credentials: RegisterCredentials): Promise<{ token: string; user: User }> {
    const data = await this.request<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setToken(data.token);
    return data;
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async uploadProfilePicture(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/users/profile-picture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload profile picture');
    }

    return response.json();
  }
}

export const api = new ApiService();