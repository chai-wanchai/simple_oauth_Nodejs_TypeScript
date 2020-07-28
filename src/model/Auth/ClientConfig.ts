
import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Client } from './Client';
import { SystemConfig } from './SystemConfig';
@Entity({ name: 'client_config' })
export class ClientConfig {
  @ManyToOne(type => Client, client => client.client_id, { primary: true })
  @JoinColumn({ name: 'client_id' })
  client?: number;
  @ManyToOne(type => SystemConfig, systemConfig => systemConfig.config_code, { primary: true })
  @JoinColumn({ name: 'config_code' })
  config?: string;
  @Column()
  configValue?: string;
  @Column({ type: 'text', nullable: true })
  description?: string;
  @Column({ default: true })
  is_active?: boolean;
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
