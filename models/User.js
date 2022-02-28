const knex = require('../database/connection');
const bcrypt = require('bcrypt');

class User {

    async findAll() {

        try {
            const result = await knex.select(["id", "name", "email", "role"]).table("users");
            return result;
        } catch(err) {
            console.error(err);
            return [];
        }
        
    }

    async findById(id) {

        try {
            const result = await knex.select(["id", "name", "email", "role"]).where({ id }).table("users")

            if(result.length > 0) return result[0]
            else undefined;

        } catch(err) {

            console.error(err)
            return undefined

        }
    }

    async new(name, email, password) {

        try { 
            const salt = bcrypt.genSaltSync(10);
            const hash = await bcrypt.hash(password, salt);

            await knex.insert({ email, password: hash, name, role: 0 }).table('users');
        }
        catch(err) { console.log(err) }
    }

    async findEmail(email) {

        try {

            const emailExists = await knex.select("*").from("users").where({ email: email });

            if(emailExists.length > 0) return true;
            else return false;

        } catch(err) {
            console.log(err);
            return false;
        }

    }

    async update(id, name, email, role) {

        const user = await this.findById(id)

        if(user != undefined) {
            
            let editUser = {}

            if(email != undefined) {
                if(email != user.email) {
                    const result = await this.findEmail(email)
                    if(!result) {
                        editUser.email = email;
                    } else {
                        return {status: false, err: "O email já existe!"}
                    }
                }
            }

            if(name != undefined) {
                editUser.name = name;
            }

            if(role != undefined) {
                editUser.role = role;
            }

            try {

                await knex.update(editUser).where({ id }).table("users")
                return { status: true }

            } catch(err) {

                return {status: false, err}

            }   
            
            

        } else {
            return {status: false, err: "O usuário não existe"}
        }

    }

    async delete(id) {
        const user = await this.findById(id);

        if(user != undefined) {

            try {
                await knex.delete().where({ id }).table("users")
                return { status: true }
            } catch(err) {
                return { status: false, err}
            }

        } else {
            return { status: false, err: "O usuário não existe!"}
        }
    }
}

module.exports = new User();