import express from 'express';
import routes from './routes';
import cors from 'cors';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use('/files', express.static(uploadConfig.directory));

app.listen(3333, () => {
    console.log('Servidor Rodando')
})
