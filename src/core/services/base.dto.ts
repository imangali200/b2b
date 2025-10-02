import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class BaseEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE '+5'",
  })
  createAt: Date;
}
