import axios from 'axios'
import Cookies from 'js-cookie'
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const authService = {
  async register(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, {
      email,
      password
    } as RegisterRequest)
    return response.data
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
      email,
      password
    } as LoginRequest)
    
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 })
    }
    
    return response.data
  },

  logout(): void {
    Cookies.remove('token')
  },

  getToken(): string | undefined {
    return Cookies.get('token')
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}