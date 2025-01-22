import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true, nullable: false })
    email: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ enum: Status, default: Status.ACTIVE })
    status: string;
}
