import fs from 'node:fs'

import { ValidationModel } from '../models/ValidationModel.js'

export class FileService {
  constructor(filepath) {
    this._isValid = false
    this._filepath = filepath
    this._file = this.crateArrayFile()
  }

  crateArrayFile() {
    this.validateRemFile()
    const stringFile = this.readFile()
    const array = this.convertReadFileIntoArrayFile(stringFile)
    return array
  }

  readFile() {
    const stringFile = fs.readFileSync(this._filepath, { encoding: 'utf-8' })
    return stringFile
  }

  convertReadFileIntoArrayFile(stringFile) {
    const array = stringFile.split('\n')
    return array
  }

  getLinesWithoutHeaderAndFooter() {
    return this._file.slice(2, -2)
  }

  findLinesBySegment(segment) {
    const segmentFixPosition = 13
    const lines = this.getLinesWithoutHeaderAndFooter().filter(line => line[segmentFixPosition] === segment)
    return lines
  }

  findLinesByCompany(company) {
    const lines = this.getLinesWithoutHeaderAndFooter().filter(line => line.includes(company))
    return lines
  }

  validateRemFile() {
    const splittedFilepath = this._filepath.split('/')
    const filename = splittedFilepath.pop()

    const isRemFile = this.isExtentionValid(filename, 'rem')
    if (!isRemFile) {
      throw new ValidationModel(false, `O arquivo "${filename}" não possui a extensão ".rem"`)
    }

    const dirPath = splittedFilepath.join('/')
    const dirExists = this.dirExists(dirPath)
    if (!dirExists) {
      throw new ValidationModel(false, `O diretório "${dirPath}" não existe`)
    }

    const isValidFilePath = this.isFilePathValid(filename, dirPath)
    if (!isValidFilePath) {
      throw new ValidationModel(false, `O arquivo "${filename}" não existe no diretório "${dirPath}"`)
    }

    const hasAccess = this.userHasAccessToFile(this._filepath)
    if (!hasAccess) {
      throw new ValidationModel(false, `O usuário não tem acesso de leitura ao arquivo "${this._filepath}"`)
    }

    this._isValid = true
    return new ValidationModel(true)
  }

  userHasAccessToFile(filepath) {
    try {
      fs.accessSync(filepath, fs.constants.R_OK)
      return true
    } catch (e) {
      return false
    }
  }

  isFilePathValid(filename, dirPath) {
    const listOfFiles = fs.readdirSync(dirPath, { encoding: 'utf8' })
    const isValidFilePath = listOfFiles.includes(filename)
    return isValidFilePath
  }

  dirExists(dirPath) {
    try {
      fs.readdirSync(dirPath)
      return true
    } catch (e) {
      return false
    }
  }

  isExtentionValid(filename, extention) {
    const extension = filename.split('.').pop()
    return extension === extention
  }

  writeJsonFile(filepath, data) {
    fs.writeFileSync(filepath, JSON.stringify(data), { encoding: 'utf8' })
  }
}