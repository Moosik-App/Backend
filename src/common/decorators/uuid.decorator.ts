import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';   

export const getCurrentUserUUID = createParamDecorator(
    (_: undefined, context: ExecutionContext): string => {
        const req = context.switchToHttp().getRequest();
        console.log(req)
        const user = req.user as JwtPayload;
        return user.sub;
    }
)