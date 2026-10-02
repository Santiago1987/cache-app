export interface AuthValue {
  user: string | null;
  loading: boolean;
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<Response>;
  revalidate: () => Promise<boolean>;
}
