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