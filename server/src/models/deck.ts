import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Card } from './card';

@Entity()
export class Deck {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    ownerId!: string;

    @Column()
    nsfw!: boolean;

    @OneToMany((_type) => Card, (card: Card) => card.deck)
    cards!: Array<Card>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
