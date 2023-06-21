import { Entity,BaseEntity,Column,PrimaryGeneratedColumn } from "typeorm";

@Entity('total_credits')
export class Totals extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
 
    @Column()
    credit:number

    @Column()
    profit:number;

    @Column()
    total_with_profit:number;
}