import express, {Response, NextFunction} from 'express';
const router = express.Router();
export default router;
import { callGraphApi  } from '../utils/graphApi';
import { GRAPH_ME_ENDPOINT } from '../utils/authConfig';

// custom middleware to check auth state
function isAuthenticated(req: any, res: Response, next: NextFunction) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }
    next();
};

router.get('/id',
    isAuthenticated, // check if user is authenticated
    async function (req: any, res, _next) {
        res.render('pages/user/id', { idTokenClaims: req.session.account.idTokenClaims });
    }
);

router.get('/profile',
    isAuthenticated, // check if user is authenticated
    async function (req: any, res, next) {
        try {
            const graphResponse = await callGraphApi(GRAPH_ME_ENDPOINT, req.session.accessToken);
            res.render('pages/user/profile', { profile: graphResponse });
        } catch (error) {
            next(error);
        }
    }
);
