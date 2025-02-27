const database = require('../../src/database')
const serviceUser = require('../../src/services/user')

describe ("Teste de Usuario", () => {

    beforeAll(async() => {
        this.transaction = await database.db.transaction()
    })
    afterAll(() => {
        this.transaction.rollback()
    })


    it ("should create an user", async () => {
        const user = {
            email: "davi@teste.com.br",
            password: "233456"
        }
        const addUser = await serviceUser.Create(user.email, user.password, this.transaction)
        this.id = addUser.id        
        
        expect(addUser.email).toBe(user.email)
        expect(addUser.password).toBe(user.password)
    })
    it ("should update an user", async () => {
        const user = {
            id: this.id,
            email: "123@teste.com.br",
            password: "233456"
        }
        const updtUser = await serviceUser.Update(user.id, user.email, user.password, this.transaction)

        expect(updtUser.email).toBe(user.email)
        expect(updtUser.password).toBe(user.password)
    })
    it ("should delete an user", async () => {
        const user = {
            id: this.id
        }

        const response = await serviceUser.Delete(user.id, this.transaction)

        expect(response).toBe(true)
    })
} ) 