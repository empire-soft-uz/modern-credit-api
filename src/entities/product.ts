import { Entity,BaseEntity,Column,PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Client } from "./client";
import { Credit } from "./credit";

@Entity('product')
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    price:number

    @Column({nullable:true})
    photoUrl:string

    @Column({nullable:true})
    imei:string

    @Column({nullable:true})
    iCloudLogin:string

    @Column({nullable:true})
    iCloudPassword:string

    @Column({nullable:true})
    description:string

    @OneToMany(() => Client, client => client.product,
    {
        onDelete:"CASCADE"
    })
    client: Client[];

    @OneToMany(() => Credit, credit => credit.product,
    {
        onDelete:"CASCADE"
    })
    credit: Credit[];
}