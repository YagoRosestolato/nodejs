import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import uploadConfig from '../config/upload';
import DependentesController from '../app/controllers/DependentesController'
import Dependentes from '../app/models/Dependentes';


const dependentesRouter = Router();
const upload = multer(uploadConfig);

const pastaFotos = path.resolve(__dirname, '..', '..', 'tmp');

dependentesRouter.post('/', upload.single('foto'), async (request, response)=> {
  try {
    const { nome, data_nascimento, grau_de_parentesco, id_do_funcionario } = request.body

    const dependentesController = new DependentesController();

    const user = await dependentesController.store({
      data_nascimento,
      grau_de_parentesco,
      id_do_funcionario,
      nome,
      foto: request.file.filename
    });

    return response.json(user)
  }catch(erro){
    // Quando acontece erro ele cadastra a imagem
    const caminhoFoto = path.join(pastaFotos, request.file.filename);
    await fs.promises.unlink(caminhoFoto);
    return response.status(400).json({error: erro.message});
  }
});

dependentesRouter.get('/', async (request, response) => {
  const dependentesRepositorio = getRepository(Dependentes);
  const user = await dependentesRepositorio.find()
  return response.json(user);
});

dependentesRouter.get('/:id', async (request, response) => {
  const dependentesRepositorio = getRepository(Dependentes);
  const { id } = request.params;
  const user = await dependentesRepositorio.findOne(id)
  return response.json(user);
});

dependentesRouter.get('/funcionario/:id', async (request, response) => {
  try {
    const dependentesRepositorio = getRepository(Dependentes);
    const { id } = request.params;
    const user = await dependentesRepositorio.find({
      where: { id_do_funcionario: id }
    })
    return response.json(user);
  } catch (erro) {
    return response.json({ error: erro.message })
  }
});

dependentesRouter.delete('/:id', async (request, response) => {
  try {
    const dependentesRepositorio = getRepository(Dependentes);
    const { id } = request.params;
    const dependente = await dependentesRepositorio.findOne(id);

    if (dependente) {
      const caminhoFoto = path.join(pastaFotos, dependente.foto);
      await fs.promises.unlink(caminhoFoto);
  
      await dependentesRepositorio.delete(id)
      return response.send();
    }

    return response.json({ message: 'Nenhum dependente encontrado'})

  } catch (erro) {
    return response.json({ error: erro.message })
  }
});

dependentesRouter.patch('/:id', upload.single('foto'), async(request, response) => {
  try {
    const {nome, data_nascimento, grau_de_parentesco, id_do_funcionario } = request.body;
    const funcionariosRepositorio = getRepository(Dependentes);
    const { id } = request.params;
    const user = await funcionariosRepositorio.findOne(id);
  
    if (user){
  
      const caminhoFoto = path.join(pastaFotos, user.foto);
      await fs.promises.unlink(caminhoFoto);
  
      {nome ? user.nome = nome: null }
      {data_nascimento ? user.data_nascimento = data_nascimento: null }
      {grau_de_parentesco ? user.grau_de_parentesco = grau_de_parentesco: null }
      {id_do_funcionario ? user.id_do_funcionario = id_do_funcionario: null }
      {request.file.filename ? user.foto = request.file.filename : null}
  
    await funcionariosRepositorio.save(user);
    }
    return response.json(user)
  } catch (erro) {
    const caminhoFoto = path.join(pastaFotos, request.file.filename);
    await fs.promises.unlink(caminhoFoto);
    return response.json({ error: erro.message })
  }
});



export default dependentesRouter;

