import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, Generated } from 'typeorm';
import { Role } from './Role';
import { Permission } from './Permission';
@Entity({ name: 'role_permission' })
export class RolePermission {
	@Column()
	@Generated('increment')
	rp_id?: number;
	@ManyToOne(type => Role, { primary: true })
	@JoinColumn({ name: 'role_id' })
	role?: Role;
	@ManyToOne(type => Permission, { primary: true })
	@JoinColumn({ name: 'permission_code' })
	permission?: Permission;
	@Column({ default: true })
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
}
