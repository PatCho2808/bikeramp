import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startAddress: string;

  @Column()
  destinationAddress: string;

  @Column()
  price: number;

  @Column()
  date: string;
}
