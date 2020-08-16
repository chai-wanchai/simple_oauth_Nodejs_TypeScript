import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Generated, ManyToMany, OneToOne } from 'typeorm';
import { Role } from './Role';
import { User } from './User';
@Entity({ name: 'user_role' })
export class UserRole {
	@Column()
	@Generated('increment')
	id?: number;
	@OneToOne(type => User, { primary: true })
	@JoinColumn({ name: 'user_id' })
	user?: User;
	@ManyToOne(type => Role, { primary: true })
	@JoinColumn({ name: 'role_id' })
	role?: Role;
	@Column({ default: true })
	is_active?: boolean;
	@Column()
	created_by?: string;
	@CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
	created_date?: Date;
	@Column()
	updated_by?: string;
	@UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
	updated_date?: Date;
	[key: string]: any
}
