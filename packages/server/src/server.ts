import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.get('/api', function (req, res) {
  console.log('requisição')
  res.send('Requisição!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
