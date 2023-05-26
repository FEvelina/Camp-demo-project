const User = require('../models/user');

//getting the register page
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

//saving the data of the new account
module.exports.register  = async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err)  return next(err);
            req.flash('success', 'Welcome to My Camp!!');
            res.redirect('/campgrounds');
        })
        
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}

//getting the login page
module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

//flashing and redirecting
module.exports.login =  (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

//logout and redirect to campgrounds page
module.exports.logout = (req, res) => {
    req.logout( function (err) {
        if (err) { return next(err) }
        req.flash('success', 'Goodbye!')
        res.redirect('/campgrounds');
    })
    }