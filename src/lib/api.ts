// lib/api.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor to add token
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Initialize token from localStorage on client side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return this.token;
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ access_token: string; user_id: number }> {
    // Changed to use request body instead of params
    const response = await this.api.post('/users/login', { email, password });
    if (response.data.access_token) {
      this.setToken(response.data.access_token);
    }
    return response.data;
  }

  async register(userData: {
    staff_name: string;
    role: string;
    department: string;
    email: string;
    password: string;
  }): Promise<{ id: number; email: string; staff_name: string }> {
    const response = await this.api.post('/users/register', userData);
    return response.data;
  }

  async logout() {
    this.setToken(null);
  }

  // Query endpoints
  async askQuestion(question: string, userId: number): Promise<{
    answer: string;
    search_time_ms: number;
    source_document: string;
    query_id: string;
  }> {
    const response = await this.api.post('/queries/ask', {
      question,
      user_id: userId,
    });
    return response.data;
  }

  async getUserHistory(userId: number): Promise<any[]> {
    const response = await this.api.get(`/queries/history/${userId}`);
    return response.data;
  }

  async verifyAnswer(queryId: string): Promise<{ message: string }> {
    const response = await this.api.post(`/queries/verify/${queryId}`);
    return response.data;
  }

  // Document endpoints
  async uploadDocument(formData: FormData): Promise<{ message: string; document_id: number }> {
    const response = await this.api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async getDocuments(): Promise<any[]> {
    const response = await this.api.get('/documents/');
    return response.data;
  }

  async deleteDocument(docId: number): Promise<{ message: string }> {
    const response = await this.api.delete(`/documents/${docId}`);
    return response.data;
  }

  // Feedback endpoints
  async submitFeedback(feedback: {
    query_id: number;
    rating: number;
    engineer_comment?: string;
  }): Promise<any> {
    const response = await this.api.post('/feedback/', feedback);
    return response.data;
  }

  // Dashboard endpoints
  async getDashboardStats(): Promise<any> {
    const response = await this.api.get('/dashboard/stats');
    return response.data;
  }

  async getQueryTimeline(days: number = 7): Promise<Record<string, number>> {
    const response = await this.api.get(`/dashboard/timeline?days=${days}`);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;


// import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// class ApiService {
//   private api: AxiosInstance;
//   private token: string | null = null;

//   constructor() {
//     this.api = axios.create({
//       baseURL: API_BASE_URL,
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//     });

//     // Request interceptor to add token
//     this.api.interceptors.request.use(
//       (config: InternalAxiosRequestConfig) => {
//         if (this.token) {
//           config.headers.Authorization = `Bearer ${this.token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );
//   }

//   setToken(token: string | null) {
//     this.token = token;
//     if (typeof window !== 'undefined') {
//       if (token) {
//         localStorage.setItem('auth_token', token);
//       } else {
//         localStorage.removeItem('auth_token');
//       }
//     }
//   }

//   getToken(): string | null {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('auth_token');
//     }
//     return this.token;
//   }

//   // Auth endpoints
//   async login(email: string, password: string): Promise<{ access_token: string; user_id: number }> {
//     const response = await this.api.post('/users/login', null, {
//       params: { email, password },
//     });
//     return response.data;
//   }

//   async register(userData: {
//     staff_name: string;
//     role: string;
//     department: string;
//     email: string;
//     password: string;
//   }): Promise<{ id: number; email: string; staff_name: string }> {
//     const response = await this.api.post('/users/register', userData);
//     return response.data;
//   }

//   // Query endpoints
//   async askQuestion(question: string, userId: number): Promise<{
//     answer: string;
//     search_time_ms: number;
//     source_document: string;
//     query_id: string;
//   }> {
//     const response = await this.api.post('/queries/ask', {
//       question,
//       user_id: userId,
//     });
//     return response.data;
//   }

//   async getUserHistory(userId: number): Promise<any[]> {
//     const response = await this.api.get(`/queries/history/${userId}`);
//     return response.data;
//   }

//   async verifyAnswer(queryId: string): Promise<{ message: string }> {
//     const response = await this.api.post(`/queries/verify/${queryId}`);
//     return response.data;
//   }

//   // Document endpoints
//   async uploadDocument(formData: FormData): Promise<{ message: string; document_id: number }> {
//     const response = await this.api.post('/documents/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return response.data;
//   }

//   async getDocuments(): Promise<any[]> {
//     const response = await this.api.get('/documents/');
//     return response.data;
//   }

//   async deleteDocument(docId: number): Promise<{ message: string }> {
//     const response = await this.api.delete(`/documents/${docId}`);
//     return response.data;
//   }

//   // Feedback endpoints
//   async submitFeedback(feedback: {
//     query_id: number;
//     rating: number;
//     engineer_comment?: string;
//   }): Promise<any> {
//     const response = await this.api.post('/feedback/', feedback);
//     return response.data;
//   }

//   // Dashboard endpoints
//   async getDashboardStats(): Promise<any> {
//     const response = await this.api.get('/dashboard/stats');
//     return response.data;
//   }

//   async getQueryTimeline(days: number = 7): Promise<Record<string, number>> {
//     const response = await this.api.get(`/dashboard/timeline?days=${days}`);
//     return response.data;
//   }
// }

// export const apiService = new ApiService();
// export default apiService;