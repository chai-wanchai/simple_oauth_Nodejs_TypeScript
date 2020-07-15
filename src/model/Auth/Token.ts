import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Users } from './User';

@Entity({ name: 'token' })
export class Token {
  @PrimaryColumn()
  tokenId?: string;
  @Column()
  refreshToken?: string;
  @Column()
  isActive?: boolean;
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_date?: Date;
}