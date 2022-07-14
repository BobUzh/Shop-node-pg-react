module.exports = class UserDto {
    email;
    id;
    username;

    constructor(model) {
        console.log('21212');
        console.log(model);
        this.email = model.email;
        this.id = model.id;
        this.username = model.username;
    }
};