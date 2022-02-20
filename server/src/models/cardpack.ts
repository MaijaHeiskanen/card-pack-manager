import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BlackCard, WhiteCard, Language, User } from '.';
import { BaseModel } from './base.model';

@Entity()
export class Cardpack extends BaseModel {
    @Column({ unique: true })
    code!: string;

    @Column({})
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

    @OneToMany(() => BlackCard, (blackCard) => blackCard.cardpack)
    blackCards!: BlackCard[];

    @OneToMany(() => WhiteCard, (whiteCard) => whiteCard.cardpack)
    whiteCards!: WhiteCard[];
}
