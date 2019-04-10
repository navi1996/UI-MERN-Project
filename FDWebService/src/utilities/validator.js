var validator = {};

//validate username and email for registration
validator.validateRegistration = (user) => {
    const username = user.username;
    const email = user.email;

    if (!username.match(/^[a-zA-Z0-9].*[a-zA-Z0-9]{5,}$/)) {
        const err = new Error('Enter a valid username');
        err.status = 400;
        throw err;
    }

    if (!email.match(/^[a-zA-Z].*@{1}[a-zA-Z]+\.{1}com$/)) {
        const err = new Error('Enter a valid email');
        err.status = 400;
        throw err;
    }

}
//validator.validateRegistration({username:'navraj',email:'navrajskkaler@yahoo.com'});
module.exports = validator;
