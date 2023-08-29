const { contas } = require('../bancodedados');


const atualizarDados = (req, res) => {
    let numeroConta = req.params.numeroConta;
    numeroConta = Number(numeroConta);


    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;


    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(400).json({ mensagem: 'Pelo menos um dos dados deve ser informado para atualização' })
    }


    const contaExistente = contas.find(conta => conta.numero === numeroConta);


    if (!contaExistente) {
        return res.status(400).json({ mensagem: "Conta não encontrada" });
    }




    const validarCPFUnico = contas.every((conta) => conta.usuario.cpf !== cpf);


    const validarEmailUnico = contas.every((conta) => conta.usuario.email !== email);




    if (!validarCPFUnico) {
        return res.status(400).json({ mensagem: "CPF já está em uso por outra conta" });
    }


    if (!validarEmailUnico) {
        return res.status(400).json({ mensagem: "E-mail já está em uso por outra conta" });
    }




    if (nome) {
        contaExistente.usuario.nome = nome;
    }


    if (cpf) {
        contaExistente.usuario.cpf = cpf;
    }


    if (data_nascimento) {
        contaExistente.usuario.data_nascimento = data_nascimento;
    }


    if (telefone) {
        contaExistente.usuario.telefone = telefone;
    }


    if (email) {
        contaExistente.usuario.email = email;
    }


    if (senha) {
        contaExistente.usuario.senha = senha;
    }


    return res.status(200).json({ mensage: 'Conta atualizada com sucesso' });
}


module.exports = {
    atualizarDados
}
