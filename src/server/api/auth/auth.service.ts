import { Injectable } from '@nestjs/common'
import { CallbackQuery, Auth } from '.'
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

  public async createAuth(query: CallbackQuery): Promise<Auth> {
    const { shop, code } = query
    try {
      const tokenResponse = await getAccessToken({ shop, code })
      return { data: { shop: query.shop, token: tokenResponse }, error: null }
    }
    catch(error) {
      return { data: null, error: { status: 400, message: `Can't get the access token` }}
    }
  }
}
