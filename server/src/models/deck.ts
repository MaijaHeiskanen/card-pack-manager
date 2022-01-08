import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';

@Entity()
export class Deck extends BaseModel {
    @Column()
    name!: string;

    @Column()
    ownerId!: string;

    @Column()
    nsfw!: boolean;
}
