import { Controller, Get } from '@nestjs/common';
import { Validate } from '../decorators/session.decorator';

@Controller('api')
export class ApiController {
  @Get()
  test(@Validate() valid: boolean) {
    console.log(valid)
    return 'working' + valid
  }
}
