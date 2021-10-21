import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ViewModule } from './view/view.module'
import { ApiModule } from './api/api.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommonModule } from './common/common.module';

@Module({
  imports: [ConfigModule.forRoot(), ApiModule, ViewModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
