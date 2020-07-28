import { Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, PrimaryColumn, OneToMany } from 'typeorm';
import { ClientConfig } from './ClientConfig';
@Entity({ name: 'client' })
export class Client {
  @PrimaryColumn({ unique: true })
  client_id?: string;
  @Column()
  client_secret?: string;
  @Column()
  client_name?: string;
  @Column()
  description?: string;
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
  @OneToMany(type => ClientConfig, clientConfig => clientConfig.client)
  @JoinColumn()
  clientConfig?: ClientConfig[]
}
