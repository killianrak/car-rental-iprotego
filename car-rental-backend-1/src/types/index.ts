export interface JwtPayload {
    sub: number;
    email: string;
    iat?: number;
    exp?: number;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: number;
      email: string;
      createdAt: Date;
    };
  }
  
  export interface RegisterResponse {
    message: string;
  }
  
  export interface UploadResponse {
    message: string;
    fileName: string;
    filePath: string;
  }
  
  export interface RequestWithUser extends Request {
    user: {
      id: number;
      email: string;
      createdAt: Date;
    };
  }