const database = require ('../../src/database');
const servicePerson = require ('../../src/services/person');

describe("Teste de Pessoas", () => {

    beforeAll(async () => {
        this.transaction = await database.db.transaction()
    })
    afterAll(() => {
        this.transaction.rollback()
    })

    it("should create an person", async () =>{
        const person = {
            name: "Davi",
            address: "Rua 123",
            userId: 1
        }
        
        const addPerson = await servicePerson.Create(person.name, person.address, person.userId, this.transaction)
        this.id = addPerson.id

            expect(addPerson.name).toBe(person.name)
            expect(addPerson.address).toBe(person.address)
            expect(addPerson.userId).toBe(person.userId)
         
    })
    it("should update an person", async () =>{
        const person = {
            id: this.id,
            name: "Davi teste",
            address: "Rua 456"
        }        
        const updtPerson = await servicePerson.Update(person.id, person.name, person.address, this.transaction)

        expect(updtPerson.name).toBe(person.name)
         
    })
    it("should delete an person", async () =>{
        const person = {
            id: this.id
        }
        
        const response = await servicePerson.Delete(person.id, this.transaction)

            expect(response).toBe(true)
        })
             
    
})