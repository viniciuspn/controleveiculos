const _ = require('underscore');

const serverConfig = require('../../../config/server');
const veiculoModel = require('./veiculoModel')();
const veiculo = new serverConfig.restifyRoute();
const validations = require('../../../util/validations')();
const camposObrigatorioCadastro = ['marca', 'modelo', 'ano', 'renavam', 'placa', 'chassi'];
const camposObrigatorioPesquisaPlaca = ['placa'];
const camposObrigatorioDelete = ['idVeiculo'];
const camposObrigatorioAtualiza = ['idVeiculo', 'marca', 'modelo', 'ano', 'renavam', 'placa', 'chassi'];

veiculo.post('/cadastro/veiculo', async function (req, res, next) {
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

veiculo.get('/retorna/veiculos', async function (req, res, next) {

    var dadosVeiculos = await veiculoModel.listarVeiculos();
    if (dadosVeiculos.error) {
        res.status(500);
        res.send({
            codigo: 5,
            message: 'Erro ao listar veiculos'
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
            message: 'Lista de Veiculos'
        });
    }


});

veiculo.get('/pesquisa/veiculo', async function (req, res, next) {
    const body = req.body;
    var errorResponse = []

    let validaBody = await validations.validaBody(body, camposObrigatorioPesquisaPlaca);

    if (validaBody.length) {
        errorResponse.push({
            codigo: 8,
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
                codigo: 9,
                message: 'Erro na pesquisa'
            });
        } else if (dadosVeiculoPlaca.semDados) {
            res.status(400);
            res.send({
                codigo: 10,
                data: body.placa,
                message: 'Veiculo não cadastrado'
            });
        } else {
            res.status(400);
            res.send({
                codigo: 11,
                data: dadosVeiculoPlaca.dadosVeiculo,
                message: 'Informaçẽos veiculo'
            });
        }
    }

});

veiculo.delete('/delete/veiculo/:idVeiculo', async function (req, res, next) {
    const parametro = req.params
    var errorResponse = []

    let validaBody = await validations.validaBody(parametro, camposObrigatorioDelete);

    if (validaBody.length) {
        errorResponse.push({
            codigo: 12,
            data: validaBody,
            message: 'Campos obrigatórios não foram informados'
        });
    };

    if (errorResponse.length) {
        res.status(400);
        res.send(errorResponse);
    } else {
        var deletaVeiculo = await veiculoModel.deletarVeiculo(parametro.idVeiculo);
        if (deletaVeiculo.error) {
            res.status(500);
            res.send({
                codigo: 13,
                message: 'Erro ao deletar veiculo'
            });
        } else if (deletaVeiculo.sucessoDelete) {
            res.status(400);
            res.send({
                codigo: 14,
                message: 'Veiculo excluido'
            });
        } else {
            res.status(200);
            res.send({
                codigo: 15,
                message: 'Veiculo informado não encontrado'
            });
        }
    }

});

veiculo.put('/atualiza/veiculo/:idVeiculo', async function (req, res, next) {
    const body = req.body;
    const parametro = req.params;
    var errorResponse = []

    let validaBody = await validations.validaBody(body, camposObrigatorioAtualiza);

    if (validaBody.length) {
        errorResponse.push({
            codigo: 16,
            data: validaBody,
            message: 'Campos obrigatórios não foram informados'
        });
    };

    if (errorResponse.length) {
        res.status(400);
        res.send(errorResponse);
    } else {
        var atualizaDadosVeiculo = await veiculoModel.atualizarDadosVeiculo(body,parametro.idVeiculo);
        if (atualizaDadosVeiculo.error) {
            res.status(500);
            res.send({
                codigo: 17,
                message: 'Erro atualizar'
            });

        } else {
            res.status(200);
            res.send({
                codigo: 18,
                message: 'Veiculo ataulizado com sucesso'
            });
        }

    }

});

module.exports = veiculo;