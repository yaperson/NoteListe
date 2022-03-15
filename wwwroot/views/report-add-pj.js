import ReportService from '/services/pj.js'

export default class {
    async header() {
        let titleElement = document.createElement('div')
        titleElement.innerText = "New Report"

        // let messageElement = document.createElement('div')
        // messageElement.classList.add('msg')
        // messageElement.innerText = "Nature du rapport"
        
        return titleElement;
    }

    async content() {

        let itemsElement = document.createElement('div')
        itemsElement.classList.add('ReportList')
        let data = await ReportService.getReports()
        for (let item of data.items) {
            createServiceItem.call(this, item)
        }
        return itemsElement

        //---

        function createServiceItem(item) {
            let itemElement = document.createElement('div')
            itemElement.classList.add('Report')
            itemElement.addEventListener('click', () => this.#item_click_handler(item))

            let itemTitleElement = document.createElement('div')
            itemTitleElement.classList.add('Report__title')

            let itemInfoElement = document.createElement('div')
            itemInfoElement.classList.add('Report__info')
            
            itemElement.append(itemTitleElement)
            itemElement.append(itemInfoElement)

            itemTitleElement.innerHTML = item.title || '[NO TITLE]'
            itemInfoElement.innerHTML = 'type : ' + item.type + ' date : ' + item.date || '[NO TITLE]'

            itemsElement.append(itemElement)
        }
    }


    async footer(){
        let buttonCancelElement = document.createElement('button')
        buttonCancelElement.innerHTML='<img src="/images/cancel.svg"/>';
        
        let buttonOkElement = document.createElement('button')
        buttonOkElement.innerHTML='<img src="/images/ok.svg"/>';

        let buttonAddPhoto = document.createElement('input')
        buttonAddPhoto.setAttribute('type', 'file', 'accept', 'image/*', 'capture', 'camera')

        //  type="file" accept="image/*" capture="camera"

        buttonAddPhoto.innerHTML = '<img src="/images/photo.svg"/>';

        let buttonAddAudio = document.createElement('button')
        buttonAddAudio.innerHTML = '<img src="/images/microphone.svg"/>';

        buttonOkElement.addEventListener('click', ()=>this.#buttonOk_click_handler.call(this))
        buttonCancelElement.addEventListener('click', ()=>this.#buttonCancel_click_handler.call(this))
        buttonAddPhoto.addEventListener('click', ()=> this.#buttonAddPhoto_click_handler.call(this))
        buttonAddAudio.addEventListener('click', ()=> this.#buttonCancel_click_handler.call(this))

        return [buttonOkElement, buttonAddAudio, buttonAddPhoto, buttonCancelElement]
    }   
    
    #item_click_handler(item) {
        alert(item.type)
    }

    #buttonOk_click_handler(){
        this.shell.gotoView('/views/report-list.js')
    }

    #buttonCancel_click_handler(){
        this.shell.gotoView('/views/report-list.js')
    }

    #buttonAddPhoto_click_handler(){
        
    }

}