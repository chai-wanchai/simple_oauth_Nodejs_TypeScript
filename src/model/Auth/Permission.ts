import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
@Entity({ name: 'permission' })
export class Permission {
  @PrimaryColumn()
  permission_code?: string;
  @Column({ nullable: true })
  permission_desc?: string;
  @Column()
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
