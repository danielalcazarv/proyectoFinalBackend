import {Router} from 'express';

const routes = Router();

routes.get('/', async (req,res)=>{
    return res.send('Anda pa allá bobo')
});

export default routes;