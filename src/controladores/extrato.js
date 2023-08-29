const bancoDeDados = require('../bancodedados')

const extrato = (req, res) => {
    let { numero_conta, senha } = req.query;
    numero_conta = Number(numero_conta);

    if (!numero_conta) {
        return res.status(404).json({ mensagem: 'Informar o número da conta é obrigatório.' });
    }

    if (!senha) {
        return res.status(404).json({ mensagem: 'Informar a senha é obrigatório.' });
    }

    const contaIndex = bancoDeDados.contas.findIndex(conta => conta.numero === numero_conta);

    if (contaIndex === -1) {
        return res.status(404).json({ mensagem: 'Conta inexistente' });
    }

    const conta = bancoDeDados.contas[contaIndex];

    if (conta.usuario.senha !== senha) {
        return res.status(404).json({ mensagem: 'Senha da conta incorreta' });
    }

    const saques = bancoDeDados.saques.filter(saque => saque.numero_conta === numero_conta);
    const transferenciasFeitas = bancoDeDados.transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta);
    const transferenciasRecebidas = bancoDeDados.transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta);
    const depositos = bancoDeDados.depositos.filter(deposito => deposito.numero_conta === numero_conta);

    const extrato = {
        saques,
        transferenciasFeitas,
        transferenciasRecebidas,
        depositos
    }

    return res.status(200).json(extrato);

}

module.exports = {
    extrato
}