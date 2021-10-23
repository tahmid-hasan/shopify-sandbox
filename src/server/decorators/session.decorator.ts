import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Validate = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if(request.session.token) return true
    return false
  },
)