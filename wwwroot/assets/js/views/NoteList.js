import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle("NoteList")
    }
    async getHtml(){
        return`
        <h1> Posts </h1>

        <p> You are viewing the post ! </p>
        <a href="/"> return </a>
        
        `
    }
}
