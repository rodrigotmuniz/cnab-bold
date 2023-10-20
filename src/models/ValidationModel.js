export class ValidationModel {
  constructor(isValid, message) {
    this._isValid = isValid
    this._message = message
  }

  get message() {
    return this._message
  }

  get isValid() {
    return this._message
  }
}