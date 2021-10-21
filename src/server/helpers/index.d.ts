import { CallbackQuery } from '../api/auth'

export interface HashVerificationMap extends CallbackQuery {
  signature?: string
  hmac?: string
  [key: string]: any
}

export interface AccessTokenParams {
  shop: string
  code: string
}

export interface AccessTokenPayload {
  client_id: string
  client_secret: string
  code: string
}

export interface AccessTokenResponse {
  access_token: string
  scope: string
}