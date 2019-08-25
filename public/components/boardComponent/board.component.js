import template from './board.component.template.html'
import style from './board.component.sass'
import { BoardComponentController } from './board.component.controller'

const bindings = {
  myBoardInput: '<'
}

export const boardComponent = {
  controller: BoardComponentController,
  template,
  bindings
}