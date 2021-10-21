import { Controller, Get, Query, Redirect, Req, Res, Session } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'

import { InstallQuery, CallbackQuery, CallbackCookie } from '.'
import { Cookies } from '../../decorators/cookies.decorator'

@Controller('api')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('auth')
  @Redirect('api')
  install(@Query() query: InstallQuery, @Res() res: Response): any {
    if(!query.shop) return { url: '/error' }
    const auth = this.auth.generateAuth(query.shop)
    res.cookie('state', auth.state, { sameSite: 'none', secure: true })

    // res.cookie('shop', this.auth.encrypt(query.shop))
    return { url: auth.url }
  }

  @Get('auth/callback')
  async callback(@Query() query: CallbackQuery, @Req() req: Request, @Res() res: Response, @Cookies() cookie: CallbackCookie, @Session() session: {shop: string, token: string}): Promise<any> {

    const auth = await this.auth.createAuth(query, req.cookies.state)
    if(auth.data) {
      if(!session.shop && !session.token) {
        session.shop = auth.data.shop
        session.token = auth.data.token
      }
      else {
        console.log('no shop')
      }
      console.log(cookie)
      console.log('Session: ', session)
      res.redirect('/')
    }
    
    
  }
}
