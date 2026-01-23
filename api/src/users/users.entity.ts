import { BaseEntity } from 'src/utils/base-entity';
import { Entity } from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {}
