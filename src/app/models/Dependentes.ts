import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

import Funcionarios from './Funcionarios'

@Entity('dependentes')
class Dependentes{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  data_nascimento: string;

  @Column()
  grau_de_parentesco:string;

  @Column('uuid')
  id_do_funcionario: string;

  @ManyToOne(()=>Funcionarios)
  @JoinColumn({name:'id_do_funcionario'})
  id_do_func: Funcionarios

  @Column()
  foto: string;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

}

export default Dependentes;
