import { CommandLineService } from "./services/CommandLineService.js";
import { FileService } from "./services/FileService.js";
import { PromptListItemModel } from "./models/PromptListItemModel.js";
import { SegmentService } from "./services/SegmentService.js";
import { CompanyService } from "./services/CompanyService.js";
import { JsonService } from "./services/JsonService.js";


class Main {
  fileService
  segmentService
  companyService
  jsonService

  constructor() {
    this.commandLineService = new CommandLineService()
  }

  init = async () => {
    try {
      await this.initFileService()
      
      const mainPrompList = this.createMainPromptList()
      const prompListItem = await this.promptMainList(mainPrompList)
      await prompListItem.callback(this.fileService)

    } catch (e) {
      console.log(e.message || e)
    }
  }

  initFileService = async () => {
    while (true) {
      try {
        let path = await this.commandLineService.promptSingleQuestion({
          message: 'Caminho do arquivo CNAB: '
        })
        this.fileService = new FileService(path)

        this.segmentService = new SegmentService(this.fileService)
        this.companyService = new CompanyService(this.fileService)
        this.jsonService = new JsonService(this.fileService)

        break
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  promptMainList = async (mainPrompList) => {
    const prompListItem = await this.commandLineService.promptListQuestion({
      list: mainPrompList,
      message: 'Escolha uma das opções abaixo:'
    })
    return prompListItem
  }

  createMainPromptList = () => {
    const companySearch = new PromptListItemModel(
      'Pesquisar pelo nome da empresa',
      this.companyService.printResults.bind(this.companyService)
    )
    const segmentSearch = new PromptListItemModel(
      'Pesquisar por uma faixa de caracteres e segmento',
      this.segmentService.printResults.bind(this.segmentService)
    )
    const mkJsonFile = new PromptListItemModel(
      'Criar arquivo JSON com nome e endereço da empresa',
      this.jsonService.write.bind(this.jsonService)
    )
    return [companySearch, segmentSearch, mkJsonFile]
  }
}

const main = new Main()
main.init()
