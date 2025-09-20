import express from 'express';
import dotenv from 'dotenv';
import {sequelize} from './src/models/index.js';
import authRoutes from './src/routes/authRoutes.js';
import taskRoutes from  './src/routes/taskRoutes.js';
import commentRoutes from './src/routes/commentRoutes.js';
// import { swaggerSpec, swaggerUi } from "./swagger.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: [process.env.FRONTEND_URL, "http://localhost:3001"], credentials: true }));
app.use(cookieParser());



// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   //keyGenerator: (req /*, res*/) => req.user?.id || req.ip ,// per-user if auth, else IP,
//   message: 'Too many requests from this IP'
// });

// ROUTES USING THE LIMITER
// app.use('/auth',limiter, authRoutes);
// app.use('/task',limiter,taskRoutes);
// app.use('/comment',limiter,commentRoutes);

app.use('/auth', authRoutes);
app.use('/task',taskRoutes);
app.use('/comment',commentRoutes);

app.get('/', (req, res) => res.send('Task Manager API'));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
}).catch(err => console.error('DB Sync Error:', err));