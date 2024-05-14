export default class UserModel {
    constructor(id, name, email, password, type) {
        this.id = id;

        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }
    static signUp(name, email, password, type) {
        const newUser = new UserModel((users.length + 1), name, email, password, type);
        const isPushed = users.push(newUser);
        return isPushed;
    }

    static signIn(email, password) {
        const user = users.find((data) => data.email == email && data.password == password);
        return user;
    }

    static getAll() {
        return users;
    }
}

let users = [
    {
        id: "1",
        name: 'Seller',
        email: 'Seller.Gmail.com',
        password: 'Password',
        type: 'Seller',

    },
    {
        id: "2",
        name: 'Seller2',
        email: 'Seller2.Gmail.com',
        password: 'Password',
        type: 'Seller',

    }
]