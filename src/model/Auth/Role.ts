import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  roleId?: number;
  @Column({ unique: true })
  roleCode?: string;
  @Column()
  roleName?: string;
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
