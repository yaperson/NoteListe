export default class {

    #itemTitleElement
    #itemTitleDescription

    async header() {
        let titleElement = document.createElement('div')
        titleElement.innerText = "Note app"

        let buttonUserElement = document.createElement('button')
        buttonUserElement.innerHTML='<img src="/images/user.svg"/>';

        buttonUserElement.addEventListener('click', ()=>this.#buttonUser_click_handler.call(this))

        titleElement.append(buttonUserElement)

        return titleElement;
    }

    async content() {
        let itemsElement = document.createElement('div')
        itemsElement.classList.add('ReportList')

        createContent.call(this)

        return itemsElement
        //---

        function createContent() {
            let itemElement = document.createElement('div')
            itemElement.classList.add('Report')

                this.#itemTitleElement = document.createElement('span')

                this.#itemTitleDescription = document.createElement('span')

                itemElement.append(this.#itemTitleElement)
                itemElement.append(this.#itemTitleDescription)
                this.#itemTitleElement.innerText = 'Note app'
                this.#itemTitleDescription.innerText = 'Organize your notes and access it on all device !'

                itemsElement.append(itemElement)
        }
    }

    async footer() {
        let buttonCancelElement = document.createElement('button')
        buttonCancelElement.innerHTML='<img src="/images/cancel.svg"/>';
        
        buttonCancelElement.addEventListener('click', ()=>this.#buttonAdd_click_handler.call(this))

        return buttonCancelElement
    }

    #item_click_handler(item) {
        this.shell.gotoView('/views/notes-update.js')
    }

    #buttonAdd_click_handler(){
        this.shell.gotoView('/views/notes-add.js')
    }

    #buttonUser_click_handler(){
        this.shell.gotoView('/views/notes-user.js')
    }
}