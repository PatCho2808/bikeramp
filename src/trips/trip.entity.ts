import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

class Price {
  readonly value;

  constructor(value: number) {
    console.log(value);
    if (value < 0) {
      throw new Error('Price cannot be a negative number');
    }
    this.value = value;
  }
}

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

  @Column('date')
  date: Date;

  @Column()
  distance: number;

  constructor(startAddress, destinationAddress, price, date, distance) {
    this.startAddress = startAddress;
    this.destinationAddress = destinationAddress;
    this.price = new Price(price).value;
    this.date = date;
    this.distance = distance;
  }
}
