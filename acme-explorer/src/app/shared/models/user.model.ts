export interface User {
  id: string;
  email: string;
  password: string;
  role: 'explorer' | 'manager' | 'administrator';
}