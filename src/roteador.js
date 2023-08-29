const { depositar } = require('./controladores/depositar');
const { extrato } = require('./controladores/extrato');
const { listarContas } = require('./controladores/listar');
const { sacar } = require('./controladores/sacar');
const { transferir } = require('./controladores/transferir');
const { verificarSenha } = require('./intermediarios/senha');
const { validarDados } = require('./intermediarios/validacao');


const rotas = express();


rotas.use(verificarSenha); //ok
rotas.get('/contas', listarContas); //ok
rotas.post('/contas', validarDados, criarConta); //ok
rotas.put('/contas/:numeroConta/usuario', atualizarDados); //ok
rotas.delete('/contas/:numeroConta', deletarConta); //ok
rotas.post('/transacoes/depositar', depositar); //ok
rotas.post('/transacoes/sacar', sacar); //ok
rotas.post('/transacoes/transferir', transferir); //ok
rotas.get('/contas/saldo', consultar); //ok
rotas.get('/contas/extrato', extrato)


module.exports = { rotas };