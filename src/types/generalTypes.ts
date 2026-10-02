export interface AuthValue {
  user: string | null;
  loading: boolean;
  login: (user: string, password: string) => void;
  logout: () => void;
}
