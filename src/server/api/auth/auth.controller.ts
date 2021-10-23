import { Controller, Get, Query, Redirect, Req, Res, Session } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'

import { InstallQuery, CallbackQuery, CallbackCookie, AuthSession } from './index.d'
import { Cookies } from '../../decorators/cookies.decorator'
import { ValidateAuth } from 'src/server/decorators/callback.decorator'

@Controller('api')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('auth')
  @Redirect('api')
  install(@Query() query: InstallQuery, @Res() res: Response): any {
    if(!query.shop) return { url: '/error' }
    const auth = this.auth.generateAuth(query.shop)
    res.cookie('state', auth.state, { sameSite: 'none', secure: true })
    return { url: auth.url }
  }

  @Get('auth/callback')
  @Redirect('/')
  async callback(@Query() query: CallbackQuery, @Session() session: AuthSession, @ValidateAuth() validate: boolean): Promise<any> {
    if(validate) {
      const auth = await this.auth.createAuth(query)
      if(auth.data) {
        if(!session.shop && !session.token) {
          session.shop = auth.data.shop
          session.token = auth.data.token
        }
        else {
          console.log('no shop')
        }
        console.log('Session: ', session)
      }
    }
    else {
      return { url: '/error' }
    }
  }
}
