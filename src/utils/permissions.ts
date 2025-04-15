// utils/permissions.ts
import { User } from '../context/AuthContext';

export function isOwner(user?: User): boolean {
  return user?.role === 'owner';
}
