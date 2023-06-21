import { Entity,BaseEntity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn } from "typeorm";
import { Client } from "./client";
import { Product } from "./product";

enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
  }

@Entity('credit')
export class Credit extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    client_id:number;
    @ManyToOne(() => Client, client => client.product,
    {onDelete:"CASCADE"})
    @JoinColumn({name:'client_id'})
    client:Client

    @Column()
    product_id:number;
    @ManyToOne(() => Product, product => product.client,
    {onDelete:"CASCADE"})
    @JoinColumn({name:'product_id'})
    product:Product

    @Column({
      default:0,
      nullable:true
    })
    client_deposit:number
 
    @Column()
    deposit_amount:number

    @Column()
    period:number;

    @Column()
    percent:number;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING,
      })
      status: Status;

    
    @Column({ type: 'date', default: () => 'DATE(NOW())'})
    duedate: Date;
}