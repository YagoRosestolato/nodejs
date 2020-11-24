import { getRepository } from 'typeorm';

import Funcionarios from '../models/Funcionarios';

interface Request {
  nome: string;
  departamento: string;
  funcao: string;
  email: string;
  telefone: string;
  foto: string;
}
class FuncionariosController {
  public async store({ nome, departamento, funcao, email, telefone, foto }: Request): Promise<Funcionarios> {
    const funcionariosRepository = getRepository(Funcionarios);

    const verificaNomeExiste = await funcionariosRepository.findOne({
      where: { nome },
    })
    if (verificaNomeExiste){
      throw new Error ('Esse nome ja foi cadastrado')
    }

    const user = funcionariosRepository.create({
      nome,
      departamento,
      funcao,
      email,
      telefone,
      foto,
    })

    await funcionariosRepository.save(user);

    return user;
  }
}


export default FuncionariosController;
