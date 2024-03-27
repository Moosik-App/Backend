import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermsEnum } from 'src/utils/perms';
import { Perms_KEY } from '../decorators/perms.decorator';
import { AtGuard } from './at.guard';

@Injectable()
export class PermsGuard extends AtGuard {
    constructor(protected reflector: Reflector) {
        super(reflector)
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);
        const requiredPerms = this.reflector.getAllAndOverride<PermsEnum[]>(Perms_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
    
        if (!requiredPerms) {
            return true; // No specific permissions required for this route
        }
    
        const req = context.switchToHttp().getRequest();
        const userPerms = req.user.perms;
    
        // Check if user has 'ALL' permission
        if ((userPerms & PermsEnum.ALL) === PermsEnum.ALL) {
            return true;
        }
    
        // Check if user has at least one of the required permissions
        for (let perm of requiredPerms) {
            if ((userPerms & perm) === perm) {
                return true;
            }
        }
    
        // User does not have required permissions
        console.log(`Required Permission: ${requiredPerms} \nCurrent User's Permission: ${req.user.perms}`);
        return false;
    }
};