
module.exports = (app) =>{
    require("./signup")(app);
    require("./login")(app);
    require("./verifyemail")(app);
    require("./forgetPassword")(app);
    require("./profile")(app);
    require("./logout")(app);
}