import express from 'express';
import dotenv from 'dotenv';
import {sequelize} from './src/models/index.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => res.send('Task Manager API'));

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
}).catch(err => console.error('DB Sync Error:', err));