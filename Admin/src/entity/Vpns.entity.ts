import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'vpn' })
export class Vpn {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column()
    flagLogo: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true, type: 'longtext' })
    configScriptTCP: string;

    @Column({ nullable: true, type: 'longtext' })
    configScriptUDP: string;

    @Column({ default: false })
    deleted: boolean;

    @Column({ default: true })
    active: boolean;

    @Column({ default: false })
    paid: boolean;

    @ManyToOne((type) => User, (user) => user.vpns)
    user: User;
}
