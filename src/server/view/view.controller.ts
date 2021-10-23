import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { Validate } from '../decorators/session.decorator'

import { ViewService } from './view.service'

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}
  @Get('*')
  static(@Req() req: Request, @Res() res: Response, @Validate() valid: boolean) {
    // if(!valid) return res.redirect('/api/auth?shop=myshopify.com')
    const handle = this.viewService.getServer().getRequestHandler()
    handle(req, res)
  }
}
