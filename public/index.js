import angular from 'angular'
import index from './index.sass'
import ApiService from './index.service'
import { boardComponent } from './components/components.module'
import configurations from './configurations/configurations.module'

/**
 * Componente de gerencimento do estado e orquestrador do jogo
 */
class IndexController {
  /**
   * Inicia os valores padrões das váriaves relacionadas ao jogo
   * @return {undefined} undefined
   */
  constructor (apiService, $scope) {
    'ngInject'
    this._scope = $scope
    this._apiService = apiService
    this.loading = true
    this.game = null
    this.loadGameError = false
  }

  /**
   * Constrói as váriaves relacionadas ao jogo
   * @return {undefined} undefined
   */
  async $onInit () {
    await this.loadGame()
    if(this.game)
      this.startBoardsAndTurn()
  }

  /**
   * Inicia os componentes de tabuleiros e váriavel de turno
   * @return {undefined} undefined
   */
  startBoardsAndTurn(){
    this.turn = this.game.PlayerTurn
    this.playerOne
  }

  /**
   * Inicia um novo jogo
   * @return {undefined} undefined
   */
  async startGame(){
    this.loadGameError = false
    this.loading = true
    this.game = null    
    try{
      this.game = await this._apiService.createGame()
      this.loading = false
      this.updateView() 
    } catch (error) {
      this.loadGameError = true
      this.loading = false
      this.game = null    
      this.updateView() 
    }
  }

  /**
   * Carrega o objeto do jogo ativo
   * @return {undefined} undefined
   */
  async loadGame(){ 
    this.loadGameError = false
    this.loading = true
    this.game = null    
    try{
      this.game = await this._apiService.getActiveGame()
      this.loading = false
      this.updateView() 
    } catch (error) {
      this.loadGameError = true
      this.loading = false
      this.game = null    
      this.updateView() 
    }
  }

  /**
   * Retorna indicação se é turno do jogador um
   * @return {boolean} isPlayerOneTurn
   */
  isPlayerOneTurn(){
    if(!this.game) return false

    if(this.game.PlayerTurn == 'player1')
      return true
    
    return false
  }

  /**
   * Retorna indicação se é turno do jogador dois
   * @return {boolean} isPlayerTwoTurn
   */
  isPlayerTwoTurn(){
    if(!this.game) return false

    if(this.game.PlayerTurn == 'player2')
      return true
    
    return false
  }

  updateView(){
    this._scope.$apply() 
  }
}

angular.module('app', [])
  .component('boardComponent', boardComponent)
  .constant('configs', configurations)
  .service('apiService', ApiService, [configurations])
  .controller('IndexController', IndexController, [ApiService])