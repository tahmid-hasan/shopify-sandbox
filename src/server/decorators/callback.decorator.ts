import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { getAccessToken, verifyHash } from '../helpers'

export const ValidateAuth = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    const { shop, hmac, code, state } = request.query
    const stateCookie = request.cookies.state
    if(state !== stateCookie) return false
    if(!shop && !hmac && !code) return false

    const verified = verifyHash(request.query)
    if(!verified) return false
    
    return true
  },
)