import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { configSocket } from './config';
import { isAuth } from './middlewares/auth';
import authRoute from './routes/auth.routes';
import chatRoutes from './routes/chat.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

const version = 'v1';
mongoose
    .connect(process.env.DB_MONGOO, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(`/api/${version}/auth`, authRoute);
app.use(isAuth);
app.use(`/api/${version}`, chatRoutes);

app.get('/', (req, res) => {
    res.send(`Listening on port ${port}`);
});

const server = app.listen(port, () => {
    console.log(`Example app listening atss http://localhost:${port}`);
});
server.timeout = 3000;

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
});
configSocket(io);
