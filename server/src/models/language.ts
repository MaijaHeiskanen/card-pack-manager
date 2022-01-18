import { Entity, Column } from 'typeorm';

@Entity()
export class Language {
    @Column({ unique: true, primary: true })
    code!: string;

    @Column({ unique: true })
    name!: string;

    @Column({ unique: true })
    native!: string;
}
