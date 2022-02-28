const User = require('../models/User');

function UserController() {
    return {

        async index(req, res) {
            const users = await User.findAll();
            res.json(users);
        },

        async findUserById(req, res) {

            const { id } = req.params;

            const user = await User.findById(id)

            if (user == undefined) {

                res.status(404)
                res.json({})

            } else {
                return res.json(user)
            }

        },

        async create(req, res) {

            const { name, email, password } = req.body;

            if(email == undefined || password == undefined) {
                res.status(400);
                res.json({err: "Você precisa passar um email e uma senha!"});
                return
            }

            const emailExists = await User.findEmail(email)

            if(emailExists) {
                res.status(406);
                res.json({err: "O email já foi cadastrado"});
                return;
            }
       
            await User.new(name, email, password)

            res.status(200);
            res.json({msg: "Usuário cadastrado!"});
            
        },

        async edit(req, res) {
            
            const { id, name, email, role } = req.body;

            const result = await User.update(id, name, email, role);

            if(result != undefined) {
                if(result.status) {
                    res.send('Usuário atualizado!')
                } else {
                    res.status(406)
                    res.send(result.err)
                }
            }  else {
                res.status(406)
                res.send("Ocorreu um erro no servidor!")
            }  
        },

        async delete(req, res) {

            const { id } = req.params;

            const result = await User.delete(id)

            if(result.status) {
                res.status(200)
                res.send("Usuário deletado")
            } else {
                res.status(406)
                res.send(result.err)
            }
        }
    }
}

module.exports = UserController;