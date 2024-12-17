import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntriesVariant } from '../entries_variant/entries_variant.entity';
import { ProductCategory } from '../product_category/product_category.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => EntriesVariant, (entriesVariant) => entriesVariant.product)
  entriesVariants: EntriesVariant[];

  @ManyToOne(() => ProductCategory, (category) => category.id)
  category: ProductCategory;
  @Column({ default: null, nullable: true })
  categoryId: number;

  @Column({ type: 'varchar', default: '' })
  name: string;

  @Column({ type: 'smallint', default: 1, comment: '0->in active,1-> active' })
  status: number;

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
