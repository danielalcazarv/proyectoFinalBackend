const logged = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/productos')
    } else {
        next()
    }
};

export default logged;