import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;
  
  @Column({length: 255})
  nombre: string;

  @Column({length: 255})
  password: string;
  
  @Column({length: 255})
  mail: string;
  
  @Column({type: 'boolean', default: false})
  activo: boolean;
  
  @CreateDateColumn()
  creadoEn: Date
}
