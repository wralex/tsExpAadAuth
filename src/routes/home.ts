import express, {Response} from 'express';
const router = express.Router();
export default router;

router.get ('/', (req: any, res: Response) => {
    return res.render('pages/home/index', {
        title: 'MSAL Node & Express Web App',
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.account?.username,
    });
});