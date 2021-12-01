const passValid = (password) =>{
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(String(password).match(passw)){
        return true
    }
    else return false
}

module.exports = passValid;