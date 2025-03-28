const protectRoute = (req, res, next) => {
    if(!req.session.isAuthenticated) {
        return res.redirect('/auth/login')
    } 
    if(req.session.isAuthenticated && (req.originalUrl === '/auth/login' || req.originalUrl === '/auth/signup')) {
        return res.redirect('/')
    }
    next()
}

export default protectRoute