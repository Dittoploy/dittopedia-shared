// --- 1. TYPES UTILISATEUR ---
export interface UserDTO {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
  createdAt: string;
}