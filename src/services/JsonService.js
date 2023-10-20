import { ValidationModel } from "../models/ValidationModel.js"
import { CommandLineService } from "./CommandLineService.js"
import { CompanyService } from "./CompanyService.js"

export class JsonService {
  _outputPath

  constructor(fileService) {
    this.fileService = fileService
    this.companyService = new CompanyService(fileService)
    this.commandLineService = new CommandLineService()
  }

  async write() {
    try {
      await this.requestAndValidateJsonOutputPath()
      const model = await this.companyService.createCompanyModel()
      this.writeJsonFile(model)
    } catch (e) {
      console.log(e.message || e)
    }
  }

  async requestAndValidateJsonOutputPath() {
    while (true) {
      this._outputPath = await this.requestJsonFileOutputPath()
      try {
        this.validateJsonPath(this._outputPath)
        break
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  async requestJsonFileOutputPath() {
    const message = 'Qual é o endereço para gravação do JSON? (inclundo o nome e a extensão do arquivo)'
    const filepath = await this.commandLineService.promptSingleQuestion({ message })
    return filepath
  }

  validateJsonPath(filepath) {
    const splittedFilepath = filepath.split('/')
    const filename = splittedFilepath.pop()
    const dirPath = splittedFilepath.join('/')

    const isRemFile = this.fileService.isExtentionValid(filename, 'json')
    if (!isRemFile) {
      throw new ValidationModel(false, `O arquivo "${filename}" não possui a extensão ".json"`)
    }

    const dirExists = this.fileService.dirExists(dirPath)
    if (!dirExists) {
      throw new ValidationModel(false, `O diretório "${dirPath}" não existe`)
    }
  }

  async writeJsonFile(model) {
    this.fileService.writeJsonFile(this._outputPath, model)
    console.log(`Arquivo JSON gravado com sucesso no endereço: ${this._outputPath}`)
  }
}