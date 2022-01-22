import { Entity, Column, OneToMany } from 'typeorm';
import { Cardpack } from '.';

@Entity()
export class Language {
    @Column({ unique: true, primary: true })
    code!: string;

    @Column({ unique: true })
    name!: string;

    @Column({ unique: true })
    native!: string;
}
