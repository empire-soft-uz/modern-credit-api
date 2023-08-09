import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('expenses')
export class Expenses extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number;

    @Column()
    description: string

    @Column({ type: 'date', default: () => 'DATE(NOW())' })
    duedate: Date;
}