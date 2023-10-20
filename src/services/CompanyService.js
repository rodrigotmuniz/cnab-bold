import { CompanyModel } from "../models/CompanyModel.js"
import { ValidationModel } from "../models/ValidationModel.js"
import { CommandLineService } from "./CommandLineService.js"
import { LogService } from "./LogService.js"

export class CompanyService {
  //Poderia colocar em algum arquivo de ambiente as variáveis abaixo
  COMPANY_NAME_FIXED_INDEX = 33
  COMPANY_STREET_FIXED_INDEX = 73
  COMPANY_NEIGHBORHOOD_FIXED_INDEX = 113
  COMPANY_ZIP_CODE_FIXED_INDEX = 128
  COMPANY_CITY_FIXED_INDEX = 136
  COMPANY_STATE_FIXED_INDEX = 151
  SEGMENT_FIXED_INDEX = 13

  _companyName

  constructor(fileService) {
    this.fileService = fileService
    this.logService = new LogService()
    this.commandLineService = new CommandLineService()
  }


  async printResults(fileService) {
    await this.requestAndValidateCompanyName()
    const lines = fileService.findLinesByCompany(this._companyName)
    const from = this.COMPANY_NAME_FIXED_INDEX
    const to = from + this._companyName.length - 1
    const segment = lines[0][this.SEGMENT_FIXED_INDEX]

    this.logService.printCompanies(from, to, lines, this._companyName, segment)
  }

  async requestCompanyName() {
    const message = 'Qual é o nome da empresa? '
    const name = await this.commandLineService.promptSingleQuestion({ message })
    return name
  }

  async requestAndValidateCompanyName() {
    while (true) {
      this._companyName = await this.requestCompanyName()
      try {
        this.nameExistsInTheCorrectPosition()
        break
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  async requestAndValidateJsonOutputAddress() {
    while (true) {
      this._companyName = await this.requestCompanyName()
      try {
        this.nameExistsInTheCorrectPosition()
        break
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  nameExistsInTheCorrectPosition() {
    const lines = this.fileService.getLinesWithoutHeaderAndFooter()
    let numberOfNames = 0
    lines.forEach(line => {
      const index = line.indexOf(this._companyName)
      if (index !== -1) {
        if (index === this.COMPANY_NAME_FIXED_INDEX) {
          numberOfNames++
        } else {
          throw new ValidationModel(false, 'O nome da empresa está numa posição fora do comum')
        }
      }
    })
    if (numberOfNames === 0) {
      throw new ValidationModel(false, 'Não foi encontrado nenhuma empresa com esse nome')
    }
  }

  async createCompanyModel() {
    await this.requestAndValidateCompanyName()
    const line = this.fileService.findLinesByCompany(this._companyName)[0]
    const street = line.substring(this.COMPANY_STREET_FIXED_INDEX, this.COMPANY_NEIGHBORHOOD_FIXED_INDEX).trim()
    const neighborhood = line.substring(this.COMPANY_NEIGHBORHOOD_FIXED_INDEX, this.COMPANY_ZIP_CODE_FIXED_INDEX).trim()
    const zipCode = line.substring(this.COMPANY_ZIP_CODE_FIXED_INDEX, this.COMPANY_CITY_FIXED_INDEX)
    const city = line.substring(this.COMPANY_CITY_FIXED_INDEX, this.COMPANY_STATE_FIXED_INDEX).trim()
    const state = line.substring(this.COMPANY_STATE_FIXED_INDEX, this.COMPANY_STATE_FIXED_INDEX + 2)

    const model = new CompanyModel(this._companyName, street, neighborhood, zipCode, city, state)
    return model
  }

  async requestCompanyName() {
    const message = 'Qual é o nome da empresa? '
    const name = await this.commandLineService.promptSingleQuestion({ message })
    return name
  }




}


// COMPANY_STREET_FIXED_INDEX = 73
// COMPANY_NEIGHBORHOOD_FIXED_INDEX = 113
// COMPANY_ZIP_CODE_FIXED_INDEX = 128
// COMPANY_CITY_FIXED_INDEX = 136
// COMPANY_STATE_FIXED_INDEX = 151