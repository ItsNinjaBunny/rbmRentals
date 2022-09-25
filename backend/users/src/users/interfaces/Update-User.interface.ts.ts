import { PartialType } from '@nestjs/mapped-types';
import { CreateUser } from './Create-User.interface.ts';

export class UpdateUser extends PartialType(CreateUser) { }
