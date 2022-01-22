import { Entity, Column } from 'typeorm';
import { CardType } from '../types/card';
import { CARDTYPES } from '../types/enums/card';
import { BaseModel } from './base.model';

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
}
