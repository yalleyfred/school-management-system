import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

@Entity('user')
@Unique('emailUniqueConstraint', ['email'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'email', unique: true })
  public email: string;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ name: 'hash' })
  public hash: string;

  @Column({ name: 'hash_rt', nullable: true })
  public hastRt: string;

  @CreateDateColumn({ name: 'creation_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public creationDate: Date;

  @UpdateDateColumn({
    name: 'modification_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public modificationDate: Date;

  @Column({ name: 'role' })
  public role: string;
}
