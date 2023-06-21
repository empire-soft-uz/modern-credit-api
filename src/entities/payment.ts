import { Entity,BaseEntity,Column,PrimaryGeneratedColumn,CreateDateColumn,ManyToOne,JoinColumn } from "typeorm";
import { Credit } from "./credit";

@Entity('payment')
export class Payment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:true})
    index:number;

    @Column()
    credit_id: number;
    @ManyToOne(() => Credit, credit => credit.client,
    {
        onDelete:"CASCADE"
    })
    @JoinColumn({name:'credit_id'})
    credit:Credit

    @Column({
        default:0
    })
    paid_amount:number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'NOW()',
    })
    duedate: Date;
}