import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('funcionarios')
class Funcionarios{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  funcao: string;

  @Column()
  departamento: string;

  @Column()
  telefone: string;

  @Column()
  foto: string;

  @Column()
  like: number;

  @Column()
  dislike: number;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

}


export default Funcionarios;
