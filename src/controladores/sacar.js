const bancoDeDados = require('../bancodedados');


const sacar = (req, res) => {
    let { numero_conta, valor, senha } = req.body;
    numero_conta = Number(numero_conta);


    if (!numero_conta) {
        return res.status(404).json({ mensagem: 'O número da conta é obrigatório.' });
    }


    if (valor <= 0 || !valor) {
        return res.status(404).json({ mensagem: 'O valor digitado deve ser positivo e maior do que 0' });
    }


    if (!senha) {
        return res.status(404).json({ mensagem: 'Informar a senha é obrigatório.' });
    }


    const contaIndex = bancoDeDados.contas.findIndex(conta => conta.numero === numero_conta);


    if (contaIndex === -1) {
        return res.status(404).json({ mensagem: 'Conta não encontrada. Verifique o número da conta digitado' });
    }


    const conta = bancoDeDados.contas[contaIndex];


    if (conta.saldo < valor) {
        return res.status(404).json({ mensagem: 'A conta não possui saldo suficiente para esse saque.' });
    }


    if (conta.usuario.senha !== senha) {
        return res.status(404).json({ mensagem: 'Senha incorreta' });
    }


    conta.saldo -= valor;


    const saque = {
        data: new Date(),
        numero_conta,
        valor
    }


    bancoDeDados.saques.push(saque);


    return res.status(200).json({ mensagem: 'Saque realizado com sucesso.' })


}


module.exports = {
    sacar
}
