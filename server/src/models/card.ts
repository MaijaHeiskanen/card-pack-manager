import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CardType } from '../types/card';
import { CARDTYPES } from '../types/enums/card';
import { BaseModel } from './base.model';
import { Cardpack } from './cardpack';

@Entity()
export class Card extends BaseModel {
    @Column({
        type: 'enum',
        enum: CARDTYPES,
    })
    type!: CardType;

    @Column()
    text!: string;

    @Column()
    cardpackId!: string;

    @ManyToOne(() => Cardpack)
    // @JoinColumn()
    cardpack!: Cardpack;
}
