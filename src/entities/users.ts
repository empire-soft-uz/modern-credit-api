import { Entity,BaseEntity,Column,PrimaryGeneratedColumn} from "typeorm";

@Entity('user')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        unique:true
    })
    email:string

    @Column()
    firstName:string
    

    @Column()
    lastName:string

    @Column()
    password:string
}