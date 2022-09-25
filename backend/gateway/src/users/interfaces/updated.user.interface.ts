import { PartialType } from '@nestjs/mapped-types';
import { CreateUser } from './user.interface';

export class UpdateUser extends PartialType(CreateUser) { }
