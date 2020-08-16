import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RolePermission } from './RolePermission';
@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  role_id?: number;
  @Column({ unique: true })
  role_code?: string;
  @Column({ nullable: true })
  role_desc?: string;
  @Column()
  is_active?: boolean;
  @Column({ nullable: true })
  created_by?: string;
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_date?: Date;
  @Column({ nullable: true })
  updated_by?: string;
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_date?: Date;
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_date?: Date;
  @Column({ nullable: true })
  deleted_by?: string;
  [key: string]: any;
  @OneToMany(type => RolePermission, role => role.role)
  @JoinColumn()
  role_permission?: RolePermission[];
}
