export interface User {
    id: number;
    email: string;
    createdAt: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
    message?: string;
  }
  
  export interface UploadResponse {
    message: string;
    fileName: string;
    filePath: string;
  }
  
  export interface FormErrors {
    [key: string]: string;
  }