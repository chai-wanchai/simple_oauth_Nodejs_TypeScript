import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  userId?: number;
  @Column()
  firstName?: string;
  @Column()
  lastName?: string;
  @Column()
  gender?: string;
  @Column()
  dob?: string;
  @Column()
  phoneNumber?: string;
  @Column()
  username?: string;
  @Column()
  email?: string;
  @Column()
  pictureUrl?: string;
  @Column()
  password?: string;
  @Column()
  isActive?: boolean;
  @Column()
  isEmailVerify?: boolean;
  @Column()
  uid?: string;
  @Column()
  idp?: string;
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_date?: Date;
}

