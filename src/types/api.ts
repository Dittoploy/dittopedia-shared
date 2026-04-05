// --- 2. TYPES API (Requêtes / Réponses) ---
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// --- 3. CONSTANTES DE CONFIGURATION ---
export const API_CONFIG = {
  VERSION: 'v1',
  DEFAULT_PORT: 3000,
  TIMEOUT: 5000
};