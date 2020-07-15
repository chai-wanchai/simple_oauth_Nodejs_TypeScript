
import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
@Entity({ name: 'client_config' })
export class ClientConfig {
  @PrimaryGeneratedColumn()
  clientId?: number;
  @Column({ unique: true })
  configCode?: string;
  @Column()
  configValue?: string;
  @Column({ type: 'text' })
  description?: string;
  @Column()
  isActive?: boolean;
  @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  updatedBy?: string;
  @Column({ nullable: true })
  deleted_by?: string
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_date?: Date;
}
