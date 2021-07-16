import cloudinary from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fileupload from 'express-fileupload';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import { configSocket } from './config';
import { isAuth } from './middlewares/auth';
import authRoute from './routes/auth.routes';
import chatRoutes from './routes/chat.routes';
import swaggerDocuments from './swagger';

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

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

app.use(
    fileupload({
        useTempFiles: true,
    }),
);

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(`/api/auth`, authRoute);

app.use(
    `/api/${version}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocuments),
);

app.get('/', (req, res) => {
    res.send(`Listening on port ${port}`);
});

app.use(isAuth);
app.use(`/api`, chatRoutes);

const server = app.listen(port, () => {
    console.log(`Example app listening atss http://localhost:${port}`);
});
server.timeout = 3000;

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://chat-chit-v1.herokuapp.com',
        ],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
});
configSocket(io);
