import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ApiController } from './api.controller'
import { ApiService } from './api.service'

@Module({
  providers: [ApiService],
  controllers: [ApiController],
  imports: [AuthModule]
})
export class ApiModule {}
