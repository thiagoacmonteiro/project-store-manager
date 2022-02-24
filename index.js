const express = require('express');
const router = require('./controllers/router');
const error = require('./middlewares/error');

const app = express();

app.use(express.json());

app.use(error);

require('dotenv').config();

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', router.productsRouter);
app.use('/sales', router.salesRouter); 

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
