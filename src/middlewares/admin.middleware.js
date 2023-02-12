import { logger } from "../utils/logger.js";

const admin = (req, res, next) => {
    const user = req.user
    if(user.admin){
        next()
    } else {
        logger.info(`${user.username} No posee permisos de admin.`)
        res.redirect('/')
    }
};

export default admin;