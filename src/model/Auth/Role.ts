import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RolePermission } from './RolePermission';
@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  role_id?: number;
  @Column({ unique: true })
  role_code?: string;
  @Column()
  role_name?: string;
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
  @OneToMany(type => RolePermission, role => role.role)
  @JoinColumn()
  role_permission?: RolePermission[];
}
