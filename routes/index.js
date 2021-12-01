
module.exports = (app) =>{
    require("./signup")(app);
    require("./login")(app);
    require("./verifyemail")(app);
}