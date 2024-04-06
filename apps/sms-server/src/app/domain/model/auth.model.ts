export interface JwtPayload {
    email: string;
    sub: string;
}

export interface JwtPayloadWithRt extends JwtPayload {
    refreshToken: string;
  }
  
  export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
  }
  

  export type AuthResponse =
  | 'logged-out'
  | 'refreshed'
  | { email: string; firstName: string; lastName: string }
  | 'failed'
  | 'user-deleted'
  | 'signed-up';