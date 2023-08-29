const verificarSenha = (req, res, next) => {
    const { senha_banco } = req.query;
    if (!senha_banco || senha_banco !== '123') {
        res.status(401).json({ mensagem: 'Senha do banco incorreta' })
    }
    next();
}


module.exports = {
    verificarSenha
}
