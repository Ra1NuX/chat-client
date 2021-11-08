class Room {
    constructor(name, max) {
        this.id = Math.floor(Math.random() * 10);
        this.name = name;
        this.max = max;
        this.users = []
    }
    getName() {
        return this.name
    }
    changeName(name) {
        this.name = name;
    }
    getId() {
        return this.id
    }
    addUser(name, isImportant_) {
        if (this.users.length < this.max) {
            this.users.push(name)
            if (isImportant_) {
                console.log(name, ': delegado')
            }
        } else {
            console.error("Cant add more users: ", name)
        }
    }
    getAllUsers() {
        return this.users;
    }
}

const daw = new Room("DAW1", 15);

console.log(daw.getId(), daw.getName())
daw.addUser("pedro")
daw.addUser("antonio", true)
daw.addUser("juan")
daw.addUser("Lion")
console.log(daw.getAllUsers())