import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Language, User } from '.';
import { BaseModel } from './base.model';

@Entity()
export class Deck extends BaseModel {
    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    nsfw!: boolean;

    @Column()
    userId!: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @Column()
    languageCode!: string;

    @ManyToOne(() => Language)
    @JoinColumn()
    language!: Language;
}
