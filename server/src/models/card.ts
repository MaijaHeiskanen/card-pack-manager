import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { CardType } from '../types/card';
import { Deck } from './deck';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    type!: CardType;

    @Column()
    text!: string;

    @Column()
    deckId!: number;
    @ManyToOne((_type) => Deck, (deck: Deck) => deck.cards)
    @JoinColumn()
    deck!: Deck;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
