import { getRepository } from 'typeorm';
import Dependentes from '../models/Dependentes';

 interface Request {
  nome: string;
  data_nascimento: string;
  grau_de_parentesco: string;
  id_do_funcionario: string;
  foto: string;
 }

 class DependentesController {
   public async store({ nome, data_nascimento, grau_de_parentesco, id_do_funcionario, foto}: Request): Promise<Dependentes>{
    const dependentesRepository = getRepository(Dependentes);

    const verificarNomeDoDependente = await dependentesRepository.findOne({
      where: { nome },
    })
    if (verificarNomeDoDependente){
      throw new Error(' Dependente ja cadastrado! ')
    }

    const user = dependentesRepository.create({
      nome,
      id_do_funcionario,
      grau_de_parentesco,
      data_nascimento,
      foto,
    });

    await dependentesRepository.save(user);

    return user;
   }
 }

 export default DependentesController;
