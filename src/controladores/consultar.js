const bancoDeDados = require('../bancodedados');


const consultar = (req, res) => {
    let { numero_conta, senha } = req.query;
    numero_conta = Number(numero_conta)


    if (!numero_conta) {
        return res.status(404).json({ mensagem: 'Informar o número da conta é obrigatório' });
    }


    if (!senha) {
        return res.status(404).json({ mensagem: 'Informar a senha é obrigatório' });
    }


    const contaIndex = bancoDeDados.contas.findIndex(conta => conta.numero === numero_conta);


    if (contaIndex === -1) {
        return res.status(404).json({ mensagem: 'Número da conta não existe' });
    }


    const saldoDaConta = bancoDeDados.contas[contaIndex].saldo


    const exibirSaldo = {
        saldo: saldoDaConta
    }


    return res.status(200).json(exibirSaldo);
}


module.exports = {
    consultar
}
