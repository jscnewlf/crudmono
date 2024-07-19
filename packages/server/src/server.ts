import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

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
