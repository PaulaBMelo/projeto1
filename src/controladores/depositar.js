let bancoDeDados = require('../bancodedados');


const depositar = (req, res) => {
    let { numero_conta, valor } = req.body;
    numero_conta = Number(numero_conta);
    valor = Number(valor)


    if (!numero_conta) {
        return res.status(404).json({ mensagem: 'Informar o número da conta é obrigatório.' });
    }


    if (valor < 0 || valor === 0 || !valor) {
        return res.status(404).json({ mensagem: 'O valor digitado é inválido' });
    }




    const contaIndex = bancoDeDados.contas.findIndex(conta => conta.numero === numero_conta);


    if (contaIndex === -1) {
        return res.status(404).json({ mensagem: 'Não existe conta para o número informado' });
    }


    bancoDeDados.contas[contaIndex].saldo += valor;


    const deposito = {
        data: new Date(),
        numero_conta,
        valor
    }


    bancoDeDados.depositos.push(deposito);


    return res.status(200).json({ mensagem: 'Depósito realizado' });


}


module.exports = {
    depositar
}
