import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.use(session({
    secret: process.env.API_SECRET + 'my_string',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000*60*60*12
    }
  }))
  await app.listen(process.env.PORT)
}
bootstrap()
