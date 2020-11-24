import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer'; 
import fs from 'fs';
import path from 'path';

import FuncionariosController from '../app/controllers/FuncionariosController';
import Funcionarios from '../app/models/Funcionarios';
import uploadConfig from '../config/upload';

const pastaFotos = path.resolve(__dirname, '..', '..', 'tmp');

const funcionariosRouter = Router();
const upload = multer(uploadConfig);

funcionariosRouter.post('/', upload.single('foto'), async(request, response) => {
  try {
    const { nome, departamento, funcao, email, telefone } = request.body;
    const funcionariosController = new FuncionariosController();

    const user = await funcionariosController.store({
      nome,
      departamento,
      funcao,
      email,
      telefone,
      foto: request.file.filename
    });

    return response.json(user);
  }catch(erro){
    // Quando acontece erro ele cadastra a imagem
    const caminhoFoto = path.join(pastaFotos, request.file.filename);
    await fs.promises.unlink(caminhoFoto);
    return response.status(400).json({ error: erro.message });
  }
});

funcionariosRouter.get('/', async(request, response) => {
  const funcionariosRepositorio = getRepository(Funcionarios)
  const user = await funcionariosRepositorio.find()
  return response.json(user);
});

funcionariosRouter.put('/like/:id', async (request, response) => {
  try {
    const funcionariosRepositorio = getRepository(Funcionarios);
    const { id } = request.params;
    const user = await funcionariosRepositorio.findOne(id);
    if (user){
      user.like = user.like + 1;
      await funcionariosRepositorio.save(user);
    }
    return response.json(user?.like)
  } catch (erro) {
    return response.json({err: erro.message})
  }
});

funcionariosRouter.put('/dislike/:id', async (request, response) => {
  try {
    const funcionariosRepositorio = getRepository(Funcionarios);
    const { id } = request.params;
    const user = await funcionariosRepositorio.findOne(id);
    if (user){
      user.dislike = user.dislike + 1;
      await funcionariosRepositorio.save(user);
    }
    return response.json(user?.dislike)
  } catch (erro) {
    return response.json({err: erro.message})
  }
});

funcionariosRouter.patch('/:id', upload.single('foto'), async (request, response) => {
  try {
    const {nome, funcao, departamento, email, telefone } = request.body;
    const funcionariosRepositorio = getRepository(Funcionarios);
    const { id } = request.params;
    const user = await funcionariosRepositorio.findOne(id);
  
    if (user){
      const caminhoFoto = path.join(pastaFotos, user.foto);
      await fs.promises.unlink(caminhoFoto);

      {nome ? user.nome = nome: null }
      {funcao ? user.funcao = funcao: null }
      {departamento ? user.departamento = departamento: null }
      {email ? user.email = email: null }
      {telefone ? user.telefone = telefone: null }
      {request.file.filename ? user.foto = request.file.filename : null}

      await funcionariosRepositorio.save(user);
    }
  
    return response.json(user)
  } catch (erro) {
    return response.json({err: erro.message})
  }
});

funcionariosRouter.get('/:id', async(request, response) => {
  try {
    const funcionariosRepositorio = getRepository(Funcionarios)
    const { id } = request.params;
    const user = await funcionariosRepositorio.findOne(id)
    return response.json(user);
  } catch (erro) {
    return response.json({err: erro.message})
  }
});

funcionariosRouter.delete('/:id', async(request, response) => {
  try {
    const funcionariosRepositorio = getRepository(Funcionarios)
    const { id } = request.params;
    const funcionario = await funcionariosRepositorio.findOne(id);

    if (funcionario === undefined) {
      return response.json({ message: 'Nenhum funcionario encontrado' })
    }

    const caminhoFoto = path.join(pastaFotos, funcionario.foto);
    await fs.promises.unlink(caminhoFoto);

    await funcionariosRepositorio.delete(id)
    return response.send();
  } catch (erro) {
    return response.json({err: erro.message})
  }
});


export default funcionariosRouter;
