import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Token } from './Token';
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  user_id?: number;
  @Column({ nullable: true })
  first_name?: string;
  @Column({ nullable: true })
  last_name?: string;
  @Column({ nullable: true })
  gender?: string;
  @Column({ nullable: true })
  dob?: string;
  @Column({ nullable: true })
  phone_number?: string;
  @Column({ nullable: true })
  username?: string;
  @Column()
  email?: string;
  @Column({ nullable: true })
  picture_url?: string;
  @Column({ nullable: true })
  password?: string;
  @Column({ default: true })
  is_active?: boolean;
  @Column({ default: false })
  is_email_verify?: boolean;
  @Column({ nullable: true })
  uid?: string;
  @Column({ nullable: true })
  idp?: string;
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_date?: Date;
  @OneToMany(type=>Token,token=>token.user)
  @JoinColumn()
  token?: Token[]
}

