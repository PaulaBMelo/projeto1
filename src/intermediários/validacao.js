const validarCpf = require('node-cpf');
const validarEmail = require("email-validator");


const validarDados = (req, res, next) => {


    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;


    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }


    //cpf
    const cpfValido = validarCpf.validate(cpf);


    if (!cpfValido) {
        res.status(400).json({ mensage: 'cpf inválio' })
    }


    //email
    const emailValido = validarEmail.validate(email);


    if (!emailValido) {
        res.status(400).json({ mensage: 'email inválido' })
    }


    next();
}


module.exports = {
    validarDados
}
