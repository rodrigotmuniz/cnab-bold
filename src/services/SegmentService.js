import { CommandLineService } from "./CommandLineService.js"
import { PromptListItemModel } from "../models/PromptListItemModel.js"
import { LogService } from './LogService.js'

export class SegmentService {
  constructor(fileService) {
    this.fileService = fileService
    this.commandLineService = new CommandLineService()
    this.logService = new LogService()
  }

  async printResults() {
    const initialPosition = await this.requestPosition('Insira a posição inicial. ', 0)
    const finalPosition = await this.requestPosition('Insira a posição final. ', initialPosition)
    const segment = await this.requestSegment()
    const lines = this.fileService.findLinesBySegment(segment)
    this.logService.printSegments(initialPosition, finalPosition, lines, segment)
  }

  async requestPosition(message, minPosition) {
    message += `(Valor númerico deve estar entre ${minPosition} e 240, ambos inclusos):`

    while (true) {
      let readPosition = await this.commandLineService.promptSingleQuestion({ message })
      const position = +readPosition

      if (typeof position === 'number' && !Number.isNaN(position)) {
        if (position >= minPosition  && position <= 240 ) {
          return position
        } else {
          console.log(`A posição "${position}" não está entre ${minPosition} e 240`)
        }
      } else {
        console.log(`A posição "${readPosition}" é inválida!`)

      }
    }
  }

  async requestSegment() {
    const promptList = this.createSegmentPromptList()
    const promptListItem = await this.promptSegmentList(promptList)
    return promptListItem.option
  }

  createSegmentPromptList() {
    const pSegment = new PromptListItemModel('P')
    const qSegment = new PromptListItemModel('Q')
    const rSegment = new PromptListItemModel('R')
    return [pSegment, qSegment, rSegment]
  }

  promptSegmentList = async (promptList) => {
    const promptListItem = await this.commandLineService.promptListQuestion({
      list: promptList,
      message: 'Escolha uma das opções abaixo:'
    })
    return promptListItem
  }



}