import { Router } from 'express';

import funcionariosRouter from './funcionarios.routes';
import dependentesRouter from './dependentes.routes';

const routes = Router();

routes.use('/funcionarios', funcionariosRouter)
routes.use('/dependentes', dependentesRouter)




export default routes;
