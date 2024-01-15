import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import {
    AuthRouter,
    UsersRouter,
    CategoriesRouter,
    RecipesRouter,
    FavoritesRouter,
    MenusRouter
} from './routes';
import U from './common/u';

const app = express();

app.use(express.static('public'));
app.use(cors({credentials: true, origin: true}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

/* Server */
const server = http.createServer(app);
server.listen(5000);

/* Database */
(async function() {
    mongoose.Promise = Promise;
    let connection = false;
    while(!connection) {
        try {
            await mongoose.connect(process.env['MONGODB_URL'], {dbName: 'recipes-blog'});
            console.log('DB Connection done.');
            connection = true;
        } catch (error) {
            console.log(`DB Connection error (${process.env['MONGODB_URL']}), waiting 30 seconds...`);
            await U.sleep(30);
        }
    }
})();

/* Routes */
const root = 'backend';
app.use(`/${root}/auth`, AuthRouter);
app.use(`/${root}/users`, UsersRouter);
app.use(`/${root}/categories`, CategoriesRouter);
app.use(`/${root}/recipes`, RecipesRouter);
app.use(`/${root}/favorites`, FavoritesRouter);
app.use(`/${root}/menus`, MenusRouter);



