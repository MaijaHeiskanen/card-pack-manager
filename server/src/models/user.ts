import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity()
export class User extends BaseModel {
    @Column({ unique: true })
    email!: string;

    @Column({ unique: true })
    username!: string;
}
