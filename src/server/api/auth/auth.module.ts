import { Module } from '@nestjs/common';
import { CommonModule } from 'src/server/common/common.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
