import express, { Application } from 'express';
import morgan from 'morgan';
let PORT = 3306;
const path = require('path');
const cookieSession = require('cookie-session');



// Routes
import indexRoutes from './routes/index.routes'
import todoRouts from './routes/todo.routes'


export class App {

    private app: Application

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middleware();
        this.routes()

    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 5000);

    }

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(indexRoutes)
        this.app.use('/todos', todoRouts)
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log(`app listening on port ${this.app.get('port')}!`);
    }
}