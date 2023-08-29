const validacaoDeCpf = require('node-cpf');
const formatarTelefone = require('telefone/parse');
const { contas } = require('../bancodedados');


let numeroConta = 1;


const criarConta = (req, res) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;


    //cpf
    const formatarCPF = validacaoDeCpf.unMask(cpf)


    //Data de nascimento
    data_nascimento = data_nascimento.replaceAll('/', '-');
    data_nascimento = data_nascimento.slice(6) + data_nascimento.slice(5, 6) + data_nascimento.slice(3, 5) + data_nascimento.slice(2, 3) + data_nascimento.slice(0, 2);


    //telefone
    telefone = formatarTelefone(telefone);


    const validarCPFUnico = contas.every((conta) => conta.usuario.cpf !== formatarCPF);


    const validarEmailUnico = contas.every((conta) => conta.usuario.email !== email);


    if (!validarCPFUnico) {
        return res.status(400).json({ mensagem: "CPF já está em uso por outra conta" });
    }


    if (!validarEmailUnico) {
        return res.status(400).json({ mensagem: "E-mail já está em uso por outra conta" });
    }


    const novaConta = {
        numero: numeroConta++,
        saldo: 0,
        usuario: {
            nome,
            cpf: formatarCPF,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }




    contas.push(novaConta);
    return res.status(201).json({ mensagem: 'conta criada' })
}


module.exports = {
    criarConta
}
