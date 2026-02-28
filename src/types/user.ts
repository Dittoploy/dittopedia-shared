// --- 1. TYPES UTILISATEUR ---
export interface IUserDTO {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
  createdAt: string;
}