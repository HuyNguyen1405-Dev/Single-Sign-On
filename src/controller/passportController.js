import passport from 'passport';
import LocalStrategy from 'passport-local';
import loginRegisterService from '../service/loginRegisterService';
 
const configPassport  = ()  => {
    passport.use(new LocalStrategy(async function verify(username, password, cb) {
   const rawData = {
    valueLogin: username,
    password: password,
   }
   
   let res = await loginRegisterService.handleUserLogin(rawData);
   console.log(">>> response", res);
   if( res && +res.EC === 0){
    return cb(null, res.DT);
   } else {
    return cb(null, false, {message: res.EM});
   }
}));
}

const handleLogout = (req, res, next) => {
   req.session.destroy(function (err){
    req.logout();
    res.redirect("/");
   })
}

module.exports = {configPassport, handleLogout};