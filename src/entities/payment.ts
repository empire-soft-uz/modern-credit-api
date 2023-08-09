import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Credit } from "./credit";

@Entity('payment')
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    index: number;

    @Column()
    credit_id: number;
    @ManyToOne(() => Credit, credit => credit.id,
        {
            onDelete: "CASCADE"
        })
    @JoinColumn({ name: 'credit_id' })
    credit: Credit

    @Column()
    paid_amount: number;

    @Column({ type: 'date', default: () => 'DATE(NOW())' })
    duedate: Date;
}