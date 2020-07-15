import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
@Entity({ name: 'system_config' })
export class SystemConfig {
  @PrimaryColumn()
  configCode?: string;
  @Column()
  configName?: string;
  @Column()
  configDefaultValue?: string;
  @Column()
  description?: string;
  @Column()
  isActive?: boolean;
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_date?: Date;
}