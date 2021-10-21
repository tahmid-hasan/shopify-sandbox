import { Injectable } from '@nestjs/common'
import { CallbackQuery } from '.'
import { nonce, verifyHash, getAccessToken, encrypt, decrypt } from '../../helpers'

@Injectable()
export class AuthService {
  public generateAuth(shop: string) {
    const state = nonce()
    const key = process.env.API_KEY
    const scopes = process.env.API_SCOPES
    const redirectURI = `${process.env.HOST}/api/auth/callback`
    return { url: `https://${shop}/admin/oauth/authorize?client_id=${key}&scope=${scopes}&state=${state}&redirect_uri=${redirectURI}`, state }
    
  }

  public async createAuth(query: CallbackQuery, stateCookie: string): Promise<{ data: {shop: string, token: string } | null, error: { url?: string | null, status?: number, message: string } | null }> {
    const { shop, hmac, code, state } = query
    if(state !== stateCookie) return { data: null, error: { status: 403, message: 'Request origin not verified' } }
    if(!shop && !hmac && !code) return { data: null, error: {status: 400, message: 'Required parameter missing' } }

    const verified = verifyHash(query)
    console.log('Verified: ', verified)
    if(!verified) return { data: null, error: {status: 400, message: 'HMAC Validation failed'} }
    try {
      const tokenResponse = await getAccessToken({ shop, code })
      return { data: { shop: query.shop, token: tokenResponse }, error: null }
    }
    catch(error) {
      return { data: null, error: { status: 400, message: `Can't get the access token` }}
    }
    
  }

  public encrypt(text: string) {
    return encrypt(text)
  }

  public decrypt(text: string) {
    return decrypt(text)
  }
}
