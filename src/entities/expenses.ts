import { Entity,BaseEntity,Column,PrimaryGeneratedColumn} from "typeorm";

@Entity('expenses')
export class Expenses extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        default:0
    })
    amount:number;

    @Column({
        nullable:true
    })
    description:string

    @Column({ type: 'date', default: () => 'DATE(NOW())'})
    duedate: Date;
}