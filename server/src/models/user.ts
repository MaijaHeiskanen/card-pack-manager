import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity()
export class User extends BaseModel {
    @Column()
    email!: string;

    @Column()
    tokenId!: string;
}
