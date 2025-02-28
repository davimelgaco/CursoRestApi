const user = require("../model/user")
const jwt = require("jsonwebtoken")

const secretKey = "M!nh4S3nh4Secreta"

class ServiceUser {
    async FindAll(transaction) {
        return user.findAll({ transaction });
    }

    async FindById(id, transaction) {
        return user.findByPk(id, { transaction })
    }

    async Create(email, password, transaction) {
        if (!email) {
            throw new Error("Favor informar o email")
        } else if (!password) {
            throw new Error("Favor informar a senha")
        }
        return user.create({ email, password }, { transaction })
    }

    async Update(id, email, password, transaction) {
        const odlUser = await this.FindById(id, transaction)

        odlUser.email = email || odlUser.email
        odlUser.password = password || odlUser.password

        odlUser.save({ transaction });

        return odlUser;
    }

    async Delete(id, transaction) {
        const user = await this.FindById(id, transaction)

        user.destroy({ transaction })

        return true
    }
    async Login(email, password) {
        if (!email) {
            throw new Error("Favor informar o email")
        } else if (!password) {
            throw new Error("Favor informar a senha")
        }
        const currentUser = await user.findOne({ where: { email }})

        if(!currentUser){
            throw new Error("Email ou senha inválidos")
        }

        if(password === currentUser.password){
            return jwt.sign({ id: currentUser.id }, secretKey, { expiresIn: 60 * 60}) 
        }
        
        throw new Error("Email ou senha inválidos")
        
    }
}

module.exports = new ServiceUser()