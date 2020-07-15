import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
@Entity({ name: 'client' })
export class Client {
  @Column({ unique: true })
  clientId?: number;
  @Column()
  clientSecret?: string;
  @Column()
  clientName?: string;
  @Column()
  description?: string;
  @Column()
  isActive?: boolean;
  @Column({ nullable: true })
  created_by?: string;
  @Column({ nullable: true })
  updated_by?: string;
  @Column({ nullable: true })
  deleted_by?: string
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_date?: Date;
}
