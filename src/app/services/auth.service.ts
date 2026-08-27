import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

export interface TmsUser {
  email: string;
  displayName: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly accessToken = signal<string | null>(null);
  private readonly refreshToken = signal<string | null>(null);
  readonly currentUser = signal<TmsUser | null>(null);

  getAccessToken(): string | null {
    return this.accessToken();
  }

  getRefreshToken(): string | null {
    return this.refreshToken();
  }

  hasRole(role: string): boolean {
    const user = this.currentUser();
    if (!user) return false;
    return user.role === role || user.role === "Admin";
  }

  async login(credentials: LoginRequest): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>("/api/1/auth/login", credentials)
    );

    this.accessToken.set(response.accessToken);
    this.refreshToken.set(response.refreshToken);
    this.currentUser.set(this.decodeUserFromToken(response.accessToken));
  }

  logout(): void {
    this.accessToken.set(null);
    this.refreshToken.set(null);
    this.currentUser.set(null);
  }

  private decodeUserFromToken(token: string): TmsUser {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid JWT access token.");

    const payload = JSON.parse(this.decodeBase64Url(parts[1]));

    const email =
      payload.email ??
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ??
      payload.sub ?? "";

    const displayName =
      payload.name ??
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ??
      email ?? "User";

    const role =
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"] ??
      payload.role ?? "Student";

    return { email, displayName, role };
  }

  private decodeBase64Url(value: string): string {
    let base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) base64 += "=";
    return atob(base64);
  }
}