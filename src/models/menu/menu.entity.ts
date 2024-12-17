import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { AccessDet } from '../access_det/access_det.entity';
import { Media } from '../media/media.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class Menu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => AccessDet, (accessDet) => accessDet.menu)
  accessDets: AccessDet[];

  @ManyToOne(() => Media, (media) => media.id)
  media: Media;
  @Column({ default: null, nullable: true })
  mediaId: number;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'int', width: 11, default: 0 })
  level: number;

  @Column({ type: 'int', width: 4 })
  header: number;

  @Column({ type: 'varchar', length: 100 })
  path: string;

  @Column({ type: 'smallint', default: 0 })
  status: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon: string;

  @Column({ type: 'smallint', default: 0 })
  sort: number;

  @Column({ type: 'smallint', default: 0 })
  is_deleted: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  deleted_at: string;

  @ManyToOne(() => UserMobile, (user) => user.id)
  createdBy: UserMobile;
  @Column({ default: null, nullable: true })
  createdById: number;

  @ManyToOne(() => UserMobile, (user) => user.id)
  updatedBy: UserMobile;
  @Column({ default: null, nullable: true })
  updatedById: number;

  @ManyToOne(() => UserMobile, (user) => user.id)
  deletedBy: UserMobile;
  @Column({ default: null, nullable: true })
  deletedById: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: string;
}
