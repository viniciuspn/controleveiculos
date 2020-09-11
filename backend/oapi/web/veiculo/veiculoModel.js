const _ = require('underscore');
const clienteSql = require('../../../scriptsSQL/web/veiculoWeb')();

module.exports = function () {


    async function validaVeiculo(dados) {
        let retorno = {
            veiculoCadstrado: 0,
            error: undefined
        };
        let promise = await clienteSql.validaVeiculo(dados)
            .then(function (rowsValidaVeiculo) {
                retorno.veiculoCadstrado = rowsValidaVeiculo[0]['count(*)'];
            })
            .catch(function (error) {
                retorno.error = error;
            })

        return retorno;
    };

    async function inserirVeiculo(dados) {
        let retorno = {
            sucessoDados: false,
            error: undefined
        };
        let promise = await clienteSql.inseriVeiculo(dados)
            .then(function (rowsInseriVeiculo) {
                retorno.sucessoDados = true;
            })
            .catch(function (error) {
                retorno.error = error;
            })

        return retorno;

    };

    async function listarVeiculos() {
        let retorno = {
            dadosVeiculos: [],
            semDados: false,
            error: undefined
        };
        let promise = await clienteSql.listaVeiculo()
            .then(function (rowsListaVeiculo) {
                if (rowsListaVeiculo[0]) {
                    _.each(rowsListaVeiculo, function (result) {
                        retorno.dadosVeiculos.push(result);
                    })
                } else {
                    retorno.semDados = true;
                }
            })
            .catch(function (error) {
                retorno.error = error;
            })

        return retorno;
    };

    async function listarVeiculoPlaca(placa) {
        let retorno = {
            dadosVeiculo: [],
            semDados: false,
            error: undefined
        };
        let promise = await clienteSql.listaVeiculoPlaca(placa)
            .then(function (rowsListaVeiculoPlaca) {
                if (rowsListaVeiculoPlaca[0]) {
                    _.each(rowsListaVeiculoPlaca, function (result) {
                        retorno.dadosVeiculo.push(result);
                    })
                } else {
                    retorno.semDados = true;
                }
            })
            .catch(function (error) {
                retorno.error = error;
            })

        return retorno;
    };

    async function deletarVeiculo(idVeiculo) {
        let retorno = {
            sucessoDelete: false,
            error: undefined
        };
        let promise = await clienteSql.deleteVeiculo(idVeiculo)
            .then(function (rowsDeleteVeiculo) {
                if (rowsDeleteVeiculo > 0) {
                    retorno.sucessoDelete = true
                }
            })
            .catch(function (error) {
                retorno.error = error;
            })

        return retorno;
    };

    async function atualizarDadosVeiculo(dados, idVeiculo) {
        let retorno = {
            sucessoDados: false,
            error: undefined
        };
        let promise = await clienteSql.atualizaDadosVeiculo(dados, idVeiculo)
            .then(function (rowsAtualizaDadosVeiculo) {
                retorno.sucessoDados = true;
            })
            .catch(function (error) {
                retorno.error = error;
            })

        return retorno;

    };

    return {
        validaVeiculo: validaVeiculo,
        inserirVeiculo: inserirVeiculo,
        listarVeiculos: listarVeiculos,
        listarVeiculoPlaca: listarVeiculoPlaca,
        deletarVeiculo: deletarVeiculo,
        atualizarDadosVeiculo: atualizarDadosVeiculo
    }
};