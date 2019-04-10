class Register{
    constructor(obj){
        this.username = obj.username;
        this.password = obj.password;
        this.email = obj.email;
        this.admin = false;
    }
}

module.exports = Register;
