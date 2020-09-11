const _ = require('underscore');

const serverConfig = require('../../../config/server');
const veiculoModel = require('./veiculoModel')();
const cliente = new serverConfig.restifyRoute();
const validations = require('../../../util/validations')();
const camposObrigatorioCadastro = ['marca', 'modelo', 'ano', 'renavam', 'placa', 'chassi'];
const camposObrigatorioPesquisaPlaca = ['placa'];
const camposObrigatorioDelete = ['idVeiculo'];
const camposObrigatorioAtualiza = ['idVeiculo', 'marca', 'modelo', 'ano', 'renavam', 'placa', 'chassi'];

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
        var validaVeiculo = await veiculoModel.validaVeiculo(body);
        if (validaVeiculo.error) {
            res.status(500);
            res.send({
                codigo: 1,
                message: 'Erro verificação de veiculo'
            });

        } else {
            if (validaVeiculo.veiculoCadstrado > 0) {
                res.status(400);
                res.send({
                    codigo: 2,
                    data: body,
                    message: 'Agumas destas informações ja foram castradas'
                });
            } else {
                var inserirVeiculo = await veiculoModel.inserirVeiculo(body);
                if (inserirVeiculo.error) {
                    res.status(500);
                    res.send({
                        codigo: 3,
                        message: 'Erro verificação de veiculo'
                    });

                } else {
                    res.status(200);
                    res.send({
                        codigo: 4,
                        message: 'Veiculo cadastrado com sucesso'
                    });
                }
            }
        }

    }

});

cliente.get('/retorna/veiculos', async function (req, res, next) {

    var dadosVeiculos = await veiculoModel.listarVeiculos();
    if (dadosVeiculos.error) {
        res.status(500);
        res.send({
            codigo: 5,
            message: 'Erro ao veriricar veiculos'
        });
    } else if (dadosVeiculos.semDados) {
        res.status(400);
        res.send({
            codigo: 6,
            message: 'Sem veiculos cadastrados'
        });
    } else {
        res.status(400);
        res.send({
            codigo: 7,
            data: dadosVeiculos.dadosVeiculos,
            message: 'Dados veiculos cadastrados'
        });
    }


});

cliente.get('/pesquisa/veiculo', async function (req, res, next) {
    const body = req.body;
    var errorResponse = []

    let validaBody = await validations.validaBody(body, camposObrigatorioPesquisaPlaca);

    if (validaBody.length) {
        errorResponse.push({
            codigo: 7,
            data: validaBody,
            message: 'Campos obrigatórios não foram informados'
        });
    };

    if (errorResponse.length) {
        res.status(400);
        res.send(errorResponse);
    } else {
        var dadosVeiculoPlaca = await veiculoModel.listarVeiculoPlaca(body.placa);
        if (dadosVeiculoPlaca.error) {
            res.status(500);
            res.send({
                codigo: 8,
                message: 'Erro ao veriricar veiculos'
            });
        } else if (dadosVeiculoPlaca.semDados) {
            res.status(400);
            res.send({
                codigo: 9,
                data: body.placa,
                message: 'Veiculo não cadastrado'
            });
        } else {
            res.status(400);
            res.send({
                codigo: 10,
                data: dadosVeiculoPlaca.dadosVeiculo,
                message: 'Dados veiculos cadastrados'
            });
        }
    }

});

cliente.delete('/delete/veiculo', async function (req, res, next) {
    const body = req.body;
    var errorResponse = []

    let validaBody = await validations.validaBody(body, camposObrigatorioDelete);

    if (validaBody.length) {
        errorResponse.push({
            codigo: 10,
            data: validaBody,
            message: 'Campos obrigatórios não foram informados'
        });
    };

    if (errorResponse.length) {
        res.status(400);
        res.send(errorResponse);
    } else {
        var deletaVeiculo = await veiculoModel.deletarVeiculo(body.idVeiculo);
        if (deletaVeiculo.error) {
            res.status(500);
            res.send({
                codigo: 11,
                message: 'Erro ao deletar veiculo'
            });
        } else if (deletaVeiculo.sucessoDelete) {
            res.status(400);
            res.send({
                codigo: 12,
                message: 'Veiculo excluido'
            });
        } else {
            res.status(200);
            res.send({
                codigo: 13,
                message: 'Veiculo informado não encontrado'
            });
        }
    }

});

cliente.put('/atualiza/veiculo', async function (req, res, next) {
    const body = req.body;
    var errorResponse = []

    let validaBody = await validations.validaBody(body, camposObrigatorioAtualiza);

    if (validaBody.length) {
        errorResponse.push({
            codigo: 13,
            data: validaBody,
            message: 'Campos obrigatórios não foram informados'
        });
    };

    if (errorResponse.length) {
        res.status(400);
        res.send(errorResponse);
    } else {
        var atualizaDadosVeiculo = await veiculoModel.atualizarDadosVeiculo(body);
        if (atualizaDadosVeiculo.error) {
            res.status(500);
            res.send({
                codigo: 16,
                message: 'Erro verificação de veiculo'
            });

        } else {
            res.status(200);
            res.send({
                codigo: 17,
                message: 'Veiculo ataulizado com sucesso'
            });
        }

    }

});

module.exports = cliente;