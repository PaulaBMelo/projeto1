let { contas } = require('../bancodedados');


const deletarConta = (req, res) => {
    let numeroConta = req.params.numeroConta;
    numeroConta = Number(numeroConta);


    const contaIndex = contas.findIndex((conta) => conta.numero === numeroConta);


    if (contaIndex === -1) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
    }


    const saldoConta = contas[contaIndex].saldo;


    if (saldoConta !== 0) {
        return res.status(400).json({ mensagem: "Não é possível excluir uma conta com saldo diferente de 0" });
    }


    contas.splice(contaIndex, 1);


    res.status(200).json({ mensagem: "Conta excluída com sucesso" });
}


module.exports = {
    deletarConta
}
