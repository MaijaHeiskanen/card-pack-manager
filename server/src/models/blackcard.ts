import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CardType } from '../types/card';
import { CARDTYPES } from '../types/enums/card';
import { Card } from './card';
import { Cardpack } from './cardpack';

@Entity()
export class BlackCard extends Card {
    @Column()
    type: CardType = CARDTYPES.BLACK;

    @Column()
    text!: string;

    @Column()
    cardpackId!: string;

    @ManyToOne(() => Cardpack, (cardpack) => cardpack.blackCards)
    @JoinColumn()
    cardpack!: Cardpack;
}
