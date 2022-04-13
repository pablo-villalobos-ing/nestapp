import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  idUser: number;
  
  @Column({length: 100})
  nombre: string;

  @Column({length: 255})
  password: string;
  
  @Column({length: 255, unique: true})
  mail: string;

  @Column({type: 'uuid', unique: true})
  resetPasswordToken: string;
  
  @Column({type: 'boolean', default: false})
  activo: boolean;
  
  @CreateDateColumn()
  creadoEn: Date
}
