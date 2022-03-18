import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Vpn } from './Vpns.entity';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column({ nullable: false })
    firstName: string;

    @Column()
    lastName: string;

    @Column({})
    role: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    public updatedAt!: Date;

    @OneToMany((type) => Vpn, (vpn) => vpn.user)
    vpns: Vpn[];
}
