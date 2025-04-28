import express, {Request, Response, NextFunction} from 'express';
import dotenv from '@dotenvx/dotenvx';
import session from 'express-session';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {engine} from 'express-handlebars';
import helpers from 'handlebars-helpers';
import path from 'path';

import routes from './routes';

dotenv.config()

const engineConfig = {
    layoutsDir: __dirname + '/../views/layouts',
    partialsDir: __dirname + '/../views/partials',
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        ...helpers(),
    }
}

const sessConfig = {
    secret: process.env.EXPRESS_SESSION_SECRET!, 
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: (process.env.EXPRESS_SESSION_COOKIE_HTTPONLY ?? "false") == "true",
        secure: (process.env.EXPRESS_SESSION_COOKIE_SECURE ?? "true") == "true", // set this to true on production
    }
}

const app = express();
app.engine('hbs', engine(engineConfig));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, '../views'));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session(sessConfig));

app.use(routes);
app.get('/login', (req: any, res: Response) => {
    if (req.session.isAuthenticated) {
        return res.redirect('/'); // Redirect to home if already logged in
    }
    res.redirect('/auth/signin');
});
app.get('/logout', (req: any, res: Response) => {
    if (req.session.isAuthenticated) {
        req.session.destroy((err: any) => {
            if (err) {
                console.error('Session destruction error:', err);
            }
            res.redirect('/auth/signout'); // Redirect to login after logout
        });
    } else {
        res.redirect('/auth/signin'); // Redirect to login if not logged in
    }
});

// catch 404 and forward to error handler
app.use((_req, _res, next) => next(createError(404)));

// error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT ?? 8080; // Default to port 8080 if not specified in .env file;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});