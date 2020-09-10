const _ = require('underscore');

module.exports = function () {

    function validaVeiculo(dados) {
        var resutado = {
            veiculoCadstrado: 0,
            error: undefined
        };

        return resutado;
    };

    function retornaVEiculos() {
        var resutado = {
            dadosVeiculos: [],
            error: undefined
        };


        return resutado;
    };

    function gravarVeiculo(dados) {

    };

    return {
        validaVeiculo: validaVeiculo,
        gravarVeiculo: gravarVeiculo,
        retornaVEiculos: retornaVEiculos
    }
};