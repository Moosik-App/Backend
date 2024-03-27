
import { SetMetadata } from '@nestjs/common';
import { PermsEnum } from 'src/utils/perms';

export const Perms_KEY = 'perms';
export const Perms = (...perm: PermsEnum[]) => SetMetadata('perms', perm);
