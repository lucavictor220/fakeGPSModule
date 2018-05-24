import express from 'express';
const app = express();
import router from './routes';

app.use('/', router);

app.listen(3000, () => console.log('Fake-use-module is running... \nPort 3000'));