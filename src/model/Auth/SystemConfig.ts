import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
@Entity({ name: 'system_config' })
export class SystemConfig {
  @PrimaryColumn()
  config_code?: string;
  @Column()
  config_name?: string;
  @Column()
  config_default_value?: string;
  @Column()
  description?: string;
  @Column()
  is_active?: boolean;
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_date?: Date;
}