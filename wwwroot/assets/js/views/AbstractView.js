export default class extends HTMLElement {
    constructor(params){
        super()
        this.params = params

    }
    setTitle(title){
        document.title = title
    }

    async getHtml() {
        return ""
    }
}