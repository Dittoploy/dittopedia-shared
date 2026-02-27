/**
 * DITTOPEDIA SHARED LIBRARY
 * Ce fichier centralise les types utilisés par le Front et le Back.
 */

// --- 1. TYPES UTILISATEUR ---
export interface UserDTO {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
  createdAt: string;
}

// --- 2. TYPES API (Requêtes / Réponses) ---
export interface ApiResponse<T> {
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

// --- 4. ENUMS (Pour éviter les fautes de frappe) ---
export enum BackendStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  MAINTENANCE = 'MAINTENANCE'
}

// --- 5. PETIT UTILITAIRE (Optionnel) ---
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR').format(date);
};