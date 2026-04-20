import apiService from './api';

export interface User {
  id: number;
  email: string;
  staff_name: string;
  role: string;
  department: string;
}

// Default staff credentials (everyone is a staff member)
const DEFAULT_STAFF = {
  email: 'staff@ntt.com',
  password: 'staff123',
  staff_name: 'Staff User',
  role: 'Support Staff',
  department: 'Technical Support',
};

// Initialize default staff user on first load
export async function initializeDefaultUser(): Promise<void> {
  try {
    // Try to register default staff user
    await apiService.register(DEFAULT_STAFF);
    console.log('Default staff user created');
  } catch (error: any) {
    // User already exists - ignore
    if (error.response?.status !== 400) {
      console.error('Error creating default user:', error);
    }
  }
}

export async function loginAsStaff(email: string, password: string): Promise<{ token: string; userId: number }> {
  const response = await apiService.login(email, password);
  apiService.setToken(response.access_token);
  return { token: response.access_token, userId: response.user_id };
}

export async function autoLogin(): Promise<{ token: string; userId: number } | null> {
  const token = apiService.getToken();
  if (!token) return null;
  
  // For demo, we'll try to login with default staff
  // In production, you'd verify token with backend
  try {
    const response = await apiService.login(DEFAULT_STAFF.email, DEFAULT_STAFF.password);
    apiService.setToken(response.access_token);
    return { token: response.access_token, userId: response.user_id };
  } catch {
    return null;
  }
}

export function logout(): void {
  apiService.setToken(null);
}

export function isAuthenticated(): boolean {
  return !!apiService.getToken();
}