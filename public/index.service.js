/**
 * Serviço de api
 */
class ApiService {
    /**
     * Inicia os valores padrões das váriaves relacionadas ao serviço
     * @return {undefined} undefined
     */
    constructor($http, configs) {
      'ngInject'
      this.$http = $http
      this._configs = configs
    }

    /**
     * Retorna o jogo ativo no momento
     * @return {Game} game
     */
    async getActiveGame(){
        try{
            const response = await this.$http({
                method: 'GET',
                url: `${this._configs.apiUrl}/game`
            })
            return handleSuccess(response)
        }catch(error){
            handleError(error)
        }
    }

    /**
     * Cria um novo jogo
     * @return {Game} game
     */
    async createGame(){
        try{
            const response = await this.$http({
                method: 'POST',
                url: `${this._configs.apiUrl}/game`
            })
            return handleSuccess(response)
        }catch(error){
            handleError(error)
        }
    }
}

function handleSuccess(response){
    console.log('Success', response)
    return response.data
}

function handleError(error){
    console.log('Error', error)
    throw new Error('Falha ao efetuar request')
}

export default ApiService