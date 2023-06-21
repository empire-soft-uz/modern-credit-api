import { Entity,BaseEntity,Column,PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./product";
import { Credit } from "./credit";

@Entity('client')
export class Client extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column({
        length:14
    })
    phone:string
    

    @Column()
    address:string


    @OneToMany(() => Product, product =>product.client,
    {
        onDelete:"CASCADE"
    })
    product: Product[];

    @OneToMany(() => Credit, credit => credit.client,
    {
        onDelete:"CASCADE"
    })
    credit: Credit[];
  static findByIdAndUpdate: any;
}