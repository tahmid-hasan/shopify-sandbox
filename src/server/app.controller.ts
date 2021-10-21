import { Controller, Get, Render } from '@nestjs/common'
import { AppService } from './app.service'
import { CommonService } from './common/common.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, commonService: CommonService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('error')
  errorPage(): any {
    return { status: 400, message: 'This is a test message' }
  }
}
