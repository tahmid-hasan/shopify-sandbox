import { CallbackQuery } from '../api/auth'

import { randomBytes, createHmac, createCipheriv, createDecipheriv } from 'crypto'

import { AccessTokenParams, AccessTokenPayload, AccessTokenResponse, HashVerificationMap } from './index.d'

import axios, { AxiosResponse } from 'axios'

export function nonce(length = 16): string {
  return randomBytes(length).toString('base64').replace(/\//g, '').replace(/\+/g, '').replace(/\=/g, '')
}

export function verifyHash(query: CallbackQuery) {
  const map: HashVerificationMap = Object.assign({}, query)
  
  delete map['hmac']
  delete map['signature']

  const message = new URLSearchParams(map).toString()

  const hash = createHmac('sha256', process.env.API_SECRET).update(message).digest('hex')
  return hash === query.hmac
}

export function getAccessToken(params: AccessTokenParams): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `https://${params.shop}/admin/oauth/access_token`
      const payload: AccessTokenPayload = {
        client_id: process.env.API_KEY,
        client_secret: process.env.API_SECRET,
        code: params.code
      }
      const tokenResponse: AxiosResponse<AccessTokenResponse> = await axios.post(url, payload)
      resolve(tokenResponse.data.access_token)
    }
    catch(error) {
      reject({ status: 403, message: error.message })
    }
  })
}

export function encrypt(text: string, algorithm: string = 'aes-256-cbc'): string {
  const start = Date.now()
  const key = randomBytes(32)
  const iv = randomBytes(16)
  const splitter = Buffer.from('+ky+').toString('hex')
  console.log(splitter)
  const cipher = createCipheriv(algorithm, Buffer.from(key), iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  const data = `${encrypted.toString('hex')}${splitter}${key.toString('hex')}${splitter}${iv.toString('hex')}`
  console.log('Done: ', Date.now() - start)
  console.log(data)
  return data
}

export function decrypt(text: string, algorithm: string = 'aes-256-cbc'): string {
  const start = Date.now()
  const splitter = Buffer.from('+ky+').toString('hex')
  console.log(splitter)
  console.log(text)
  const input = text.split(splitter)
  console.log(input)
  const key = input[1]
  const iv = input[2]
  const decipher = createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
  const decrypted = Buffer.concat([decipher.update(Buffer.from(input[0], 'hex')), decipher.final()])
  const data = decrypted.toString()
  console.log('Done: ', Date.now() - start)
  return data
}