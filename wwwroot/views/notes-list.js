import ReportService from '/services/notes.js'

export default class {
    async header() {
        let titleElement = document.createElement('div')
        titleElement.innerText = "Liste des Rapports"
        return titleElement;
    }

    async content() {
        let itemsElement = document.createElement('div')
        itemsElement.classList.add('ReportList')
        let data = await ReportService.getNotes()
        console.log(data)
        for (let item of data) {
            createReportItem.call(this, item)
        
        }
        return itemsElement

        //---

        function createReportItem(item) {
            let itemElement = document.createElement('div')
            itemElement.classList.add('Report')
            itemElement.classList.add('Report-state-')
            itemElement.addEventListener('click', () => this.#item_click_handler(item))

                let itemTitleElement = document.createElement('div')
                itemTitleElement.classList.add('Report__title')

                let itemTitleDescription = document.createElement('div')
                itemTitleDescription.classList.add('Report__description')
                itemElement.append(itemTitleElement)
                itemElement.append(itemTitleDescription)

                itemTitleElement.innerHTML = RowDataPacket.noteTitle || '[NO TITLE]'
                itemTitleDescription.innerHTML = item.noteContent || ''

                itemsElement.append(itemElement)
        }
    }

    async footer() {
        let buttonAddElement = document.createElement('button')
        buttonAddElement.innerHTML='<img src="/images/add.svg"/>';
        
        let buttonUserElement = document.createElement('button')
        buttonUserElement.innerHTML='<img src="/images/user.svg"/>';

        let button3 = document.createElement('button')

        buttonAddElement.addEventListener('click', ()=>this.#buttonAdd_click_handler.call(this))
        buttonUserElement.addEventListener('click', ()=>this.#buttonUser_click_handler.call(this))

        return [buttonUserElement, buttonAddElement, button3]
    }

    #item_click_handler(item) {
        alert(item.title)
    }

    #buttonAdd_click_handler(){
        this.shell.gotoView('/views/report-add.js')
    }

    #buttonUser_click_handler(){
        this.shell.gotoView('/views/report-user.js')
    }
}