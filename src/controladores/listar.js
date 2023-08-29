const bancoDeDados = require('../bancodedados');


const listarContas = (req, res) => {
    return res.status(200).json(bancoDeDados.contas);
}


module.exports = {
    listarContas
}
