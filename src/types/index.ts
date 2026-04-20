// User types
export interface User {
  id: number;
  staff_name: string;
  role: string;
  department: string;
  email: string;
  created_at: string;
}

// Document types
export interface Document {
  id: number;
  title: string;
  category: string;
  content: string;
  version: string;
  version_date: string;
  is_active: boolean;
}

// Query types
export interface Query {
  id: number;
  query_id: string;
  user_id: number;
  question: string;
  ai_answer: string;
  search_time_ms: number;
  is_verified: boolean;
  timestamp: string;
}

// Feedback types
export interface Feedback {
  id: number;
  feedback_id: string;
  query_id: number;
  rating: number;
  engineer_comment: string;
  timestamp: string;
}

// API Request/Response types
export interface AskQuestionRequest {
  question: string;
  user_id: number;
}

export interface AskQuestionResponse {
  answer: string;
  search_time_ms: number;
  source_document: string;
  query_id: string;
}

export interface DashboardStats {
  total_queries: number;
  avg_search_time_ms: number;
  avg_rating: number;
  total_documents: number;
  verified_responses: number;
  time_saved_minutes: number;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: number;
}

// Auth state
export interface AuthState {
  token: string | null;
  userId: number | null;
  isAuthenticated: boolean;
}