import axios from 'axios'
import { authService } from './authService'
import type { UploadResponse } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const uploadService = {
  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)
    
    const token = authService.getToken()
    console.log('Token:', token) 
    
    if (!token) {
      throw new Error('No token found')
    }
    
    const response = await axios.post<UploadResponse>(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` 
      }
    })
    
    return response.data
  }
}