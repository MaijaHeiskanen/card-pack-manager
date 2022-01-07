import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Deck } from './deck';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    type!: 'white' | 'black';

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
