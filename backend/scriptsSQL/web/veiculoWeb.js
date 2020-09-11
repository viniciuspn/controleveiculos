const database = require('../../config/database');
const connVeiculo = database.veiculo('veiculo');

module.exports = function () {

    function validaVeiculo(dados, callback) {
        return connVeiculo('veiculos')
            .where('placa', '=', dados.placa)
            .orWhere('chassi', '=', dados.chassi)
            .orWhere('renavam', '=', dados.renavam)
            .count()
            .select();
    };

    function inseriVeiculo(dados) {
        return connVeiculo('veiculos')
            .insert({
                placa: dados.placa,
                chassi: dados.chassi,
                renavam: dados.renavam,
                modelo: dados.modelo,
                marca: dados.marca,
                ano: dados.ano
            });
    };

    function listaVeiculo() {
        return connVeiculo('veiculos')
            .select(
                'id as idVeiculo',
                'placa as placaVeiculo',
                'chassi as chassiVeiculo',
                'renavam as renavamVeiculo',
                'modelo as modeloVeiculo',
                'marca as marcaVeiculo',
                'ano as anoFabricacao'
            );
    };


    function listaVeiculoPlaca(placa) {
        return connVeiculo('veiculos')
            .where('placa', '=', placa)
            .select(
                'id as idVeiculo',
                'placa as placaVeiculo',
                'chassi as chassiVeiculo',
                'renavam as renavamVeiculo',
                'modelo as modeloVeiculo',
                'marca as marcaVeiculo',
                'ano as anoFabricacao'
            );
    };

    function deleteVeiculo(idVeiculo) {
        return connVeiculo('veiculos')
            .where('id', '=', idVeiculo)
            .delete();
    };

    function atualizaDadosVeiculo(dados, idVeiculo) {
        return connVeiculo('veiculos')
            .where('id', '=', idVeiculo)
            .update({
                placa: dados.placa,
                chassi: dados.chassi,
                renavam: dados.renavam,
                modelo: dados.modelo,
                marca: dados.marca,
                ano: dados.ano
            });
    }

    return {
        validaVeiculo: validaVeiculo,
        inseriVeiculo: inseriVeiculo,
        listaVeiculo: listaVeiculo,
        listaVeiculoPlaca: listaVeiculoPlaca,
        deleteVeiculo: deleteVeiculo,
        atualizaDadosVeiculo: atualizaDadosVeiculo
    };

};