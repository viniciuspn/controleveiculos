const _ = require('underscore');

const serverConfig = require('../../../config/server');
const veiculoModel = require('./veiculoModel')();
const cliente = new serverConfig.restifyRoute();
const validations = require('../../../util/validations')();
const camposObrigatorioCadastro = ['placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano'];

cliente.post('/cadastro/veiculo', async function (req, res, next) {
    const body = req.body;
    var errorResponse = []

    let validaBody = await validations.validaBody(body, camposObrigatorioCadastro);

    if (validaBody.length) {
        errorResponse.push({
            codigo: 0,
            data: validaBody,
            message: 'Campos obrigatórios não foram informados'
        });
    };

    if (errorResponse.length) {
        res.status(400);
        res.send(errorResponse);
    } else {
        var validaVeiculo = veiculoModel.validaVeiculo(body);
        if (validaVeiculo.error) {
            res.status(500);
            res.send({
                codigo: 1,
                message: 'Erro verificação de veiculo'
            });

        } else {
            if (validaVeiculo.veiculoCadstrado === 1) {
                res.status(400);
                res.send({
                    codigo: 2,
                    data: body,
                    message: 'Agumas destas informações ja foram castradas'
                });
            } else {

                var cravaVeicul0 = await veiculoModel.gravarVeiculo(body, novoId);
            }
        }

    }

});

cliente.post('/retorna/veiculo', async function (req, res, next) {


    var dadosVeiculos = veiculoModel.retornaVEiculos();
    if (dadosVeiculos.dadosVeiculos) {
        res.status(400);
        res.send({
            codigo: 3,
            data: dadosVeiculos.dadosVeiculos,
            message: 'Dados Veiculos'
        });
    } else {
        es.status(400);
        res.send({
            codigo: 4,
            data: {},
            message: 'Sem veiculos cadastrados'
        });
    }


});



module.exports = cliente;