import express from 'express';
const app = express();
import router from './routes';
// import bodyParser from 'body-parser';
//
// app.use(bodyParser.json({ inflate: true }));
app.use('/', router);

app.listen(3000, () => console.log('Fake-use-module is running... \nPort 3000'));