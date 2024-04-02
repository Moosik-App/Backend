import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from '../../auth/types';


export const GetSpotifyCode = createParamDecorator(
    (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      console.log(req)
    },
  );