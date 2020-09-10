module.exports = function(routeConfig){

    /*     
    * Rotas abertas     
    */
    const openApi = new routeConfig.restifyRoute();
    const server = new routeConfig.restifyRoute();
    /**
     * constantes para rotas do sistema
     */
    const clienteWeb = require('../oapi/web/veiculo/veiculoService');   
    
    server.use('/oapi', openApi);
    openApi.get('/teste', function(req, res, next){
        res.send({
            teste: 'Teste'
        });
    });
    openApi.use('/web', clienteWeb);
   
   server.applyRoutes(routeConfig.server);
};