export interface InstallQuery {
  shop: string
}

export interface CallbackQuery {
  code: string
  host: string
  shop: string
  state: string
  timestamp: string
  hmac?: string
  signature?: string
}

export interface CallbackCookie {
  state: string
  shop: string
}

export interface AuthSession {
  shop: string
  token: string
}

export interface CreateAuthError {
  status: number
  message: string
}

export interface CreateAuthData {
  shop: string
  token: string
}

export interface Auth {
  data: CreateAuthData | null
  error: CreateAuthError | null
}