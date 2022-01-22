import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn({ select: false })
    createdAt!: Date;

    @UpdateDateColumn({ select: false })
    updatedAt!: Date;
}
