export class PromptListItemModel { 

    constructor(option, callback) {
      this._option = option
      this._callback = callback
    }
    
    get option() {
      return this._option
    }

    get callback() {
      return this._callback
    }
}