/**
 * Componente de tabuleiro com suas ações
 */
class BoardComponentController {
  /**
   * Inicia os valores padrões das váriaves relacionadas ao tabuleiro
   * @return {undefined} undefined
   */
  constructor () {
    this.myPositions = []
    this.canShoot = false
    this.isSettingShip = false
    this.settingShip = ''
    this.prePositionShips = {
      carrier: {
        positions: [],
        limit: 5
      },
      battleship: {
        positions: [],
        limit: 4
      },
      submarine: {
        positions: [],
        limit: 3
      },
      destroyer: {
        positions: [],
        limit: 3
      },
      cruiser: {
        positions: [],
        limit: 2
      }
    }
  }

  /**
   * Constrói as váriaves relacionadas ao tabuleiro
   * @return {undefined} undefined
   */
  $onInit () {
    this.createMyPositions()
  }

  /**
   * Cria o grid com as posições do jogador
   * @return {undefined} undefined
   */
  createMyPositions() {
    for(let row = 0; row < 10; row++)
      for(let column = 0; column < 10; column++)
        this.myPositions.push({
          row, 
          column,
          ship: this.getShipInitials(row, column),
          color: this.getPositionColor(row, column)
        })
  }

  /**
   * Indica se o usuário pode posicionar os navios
   * @return {boolean} canSetShips
   */
  canSetShips(){
    if(!this.myBoardInput)
      return false

    if(!this.myBoardInput.Carrier &&
      !this.myBoardInput.Battleship &&
      !this.myBoardInput.Submarine &&
      !this.myBoardInput.Destroyer &&
      !this.myBoardInput.Cruiser)
      return true

    return false
  }

  startSetShip(ship){
    this.isSettingShip = true
    this.settingShip = ship
    this.prePositionShips[ship].positions = []
  }

  isShipSetted(ship){
    return this.prePositionShips[ship] && 
    this.prePositionShips[ship].positions && 
    this.prePositionShips[ship].positions.length == this.prePositionShips[ship].limit
  }

  setShip(position){
    if(!this.isSettingShip) return
    this.prePositionShips[this.settingShip]
      .positions
      .push([position.row, position.column])

    if(this.prePositionShips[this.settingShip].positions.length == this.prePositionShips[this.settingShip].limit){
      this.isSettingShip = false
      this.settingShip = ''
    }
  }

  getPositionColor(row, column){
    if(!this.myBoardInput)
      return

    if(this.hasHitInPosition(row, column))
      return 'red'

    if(this.hasShipInPosition(row, column))
      return 'green'

    return 'blue'
  }

  hasHitInPosition(row, column){
    if(!this.myBoardInput)
      return false

    if(this.myBoardInput.Hits.some(hit => hit.Line == row && hit.Column == column))
      return true

    return false
  }

  hasShipInPosition(row, column){
    if(!this.myBoardInput)
      return false

    if(this.isCarrierInPosition(row, column) || 
      this.isBattleshipInPosition(row, column) || 
      this.isSubmarineInPosition(row, column) ||
      this.isDestroyerInPosition(row, column) || 
      this.isCruiserInPosition(row, column))
      return true

    return false
  }

  getShipInitials(row, column){
    if(!this.myBoardInput)
      return

    if(this.isCarrierInPosition(row, column))
      return 'PA'

    if(this.isBattleshipInPosition(row, column))
      return 'EN'

    if(this.isSubmarineInPosition(row, column))
      return 'SM'

    if(this.isDestroyerInPosition(row, column))
      return 'DT'

    if(this.isCruiserInPosition(row, column))
      return 'BP'
  }

  isShipInPosition(ship, row, column){
    return ship.Positions.some(position => position.Line == row && position.Column == column)
  }

  isCarrierInPosition(row, column){
    if(!this.myBoardInput.Carrier)
      return false
    
    if(isShipInPosition(this.myBoardInput.Carrier, row, column))
      return true

    return false
  }

  isBattleshipInPosition(row, column){
    if(!this.myBoardInput.Battleship)
      return false
    
    if(isShipInPosition(this.myBoardInput.Battleship, row, column))
      return true

    return false
  }

  isSubmarineInPosition(row, column){
    if(!this.myBoardInput.Submarine)
      return false
    
    if(isShipInPosition(this.myBoardInput.Submarine, row, column))
      return true

    return false
  }

  isDestroyerInPosition(row, column){
    if(!this.myBoardInput.Destroyer)
      return false
    
    if(isShipInPosition(this.myBoardInput.Destroyer, row, column))
      return true

    return false
  }

  isCruiserInPosition(row, column){
    if(!this.myBoardInput.Cruiser)
      return false
    
    if(isShipInPosition(this.myBoardInput.Cruiser, row, column))
      return true

    return false
  }

  updateView(){
    this._scope.$apply() 
  }
}

export { BoardComponentController } 