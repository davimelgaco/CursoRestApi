const person = require("../model/person")
const user = require("../model/user")

class ServicePerson {
    async FindAll(transaction) {
        return person.findAll({ transaction });
    }

    async FindById(id, transaction){
        return person.findByPk(id, { include: { model: user } }, { transaction })
    }

    async Create(name, address, userId, transaction) {
        if (!name){
            throw new Error ("Favor informar o nome")
        }else if (!address){
            throw new Error ("Favor informar o endereço")
        }else if (!userId){
            throw new Error ("Favor informar o userId")
        }
       return person.create({ name, address, userId }, { transaction })
    }

    async Update(id, name, address, transaction) {
        const odlPerson = await this.FindById(id, transaction)

        if (!odlPerson) {
            throw new Error("Pessoa não encontrada");
        }

        odlPerson.name = name || odlPerson.name
        odlPerson.address = address || odlPerson.address

        odlPerson.save({ transaction });

        return odlPerson;
    }

    async Delete(id, transaction) {
        const person = await this.FindById(id, transaction)
        person.destroy({ transaction })

        return true
    }
}

module.exports = new ServicePerson()