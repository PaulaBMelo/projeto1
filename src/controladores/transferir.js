const bancoDeDados = require('../bancodedados')


const transferir = (req, res) => {


    let { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    numero_conta_destino = Number(numero_conta_destino);
    numero_conta_origem = Number(numero_conta_origem);
    valor = Number(valor)


    if (!numero_conta_destino) {
        return res.status(404).json({ mensagem: 'Número da conta de destino é obrigatório' });
    }


    if (!numero_conta_origem) {
        return res.status(404).json({ mensagem: 'Número da conta de origem é obrigatório' });
    }


    if (!valor) {
        return res.status(404).json({ mensagem: 'Informar o valor é obrigatório' });
    }


    if (!senha) {
        return res.status(404).json({ mensagem: 'Informar a senha é obrigatório' });
    }


    const contaOrigemIndex = bancoDeDados.contas.findIndex(conta => conta.numero === numero_conta_origem);


    if (contaOrigemIndex === -1) {
        return res.status(404).json({ mensagem: 'Conta de origem não existente' });
    }


    const contaOrigem = bancoDeDados.contas[contaOrigemIndex];


    if (contaOrigem.usuario.senha !== senha) {
        return res.status(404).json({ mensagem: 'Senha incorreta' });
    }


    if (contaOrigem.saldo < valor) {
        return res.status(404).json({ mensagem: 'A conta não possui saldo suficiente para realizar essa transferência' });
    }


    const contaDestinoIndex = bancoDeDados.contas.findIndex(conta => conta.numero === numero_conta_destino);


    if (contaDestinoIndex === -1) {
        return res.status(404).json({ mensagem: 'Conta de destino não existe' });
    }


    const contaDestino = bancoDeDados.contas[contaDestinoIndex];


    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;


    const transferencia = {
        data: new Date(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }


    bancoDeDados.transferencias.push(transferencia);


    return res.status(200).json({ mensagem: 'Transferência realizada com sucesso.' });
}


module.exports = {
    transferir
}
