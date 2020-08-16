import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, PrimaryColumn, Generated } from 'typeorm';
import { User } from './User';

@Entity({ name: 'token' })
export class Token {
  @PrimaryColumn({ type: 'uuid' })
  @Generated("uuid")
  token_id?: string;
  @Column({ type: 'uuid' })
  @Generated("uuid")
  refresh_token?: string;
  @Column({ default: true })
  is_active?: boolean;
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_date?: Date;
  @ManyToOne(type => User, user => user.token, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User
}