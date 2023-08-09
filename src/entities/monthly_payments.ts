import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Credit } from "./credit";
import { Client } from "./client"
import { Product } from "./product";

enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
}

@Entity('monthly_payment')
export class MonthlyPayment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    client: string

    @Column()
    product: string

    @Column()
    price: number

    @Column()
    date: Date

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING,
    })
    status: Status;

    @Column()
    monthly_payment: number

    @Column()
    paid_amount: number;


    @Column({ type: 'date', default: () => 'DATE(NOW())' })
    duedate: Date;
}