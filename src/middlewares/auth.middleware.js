const auth = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect('/')
    }
};

export default auth;