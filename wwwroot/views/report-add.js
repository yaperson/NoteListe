export default class {
    #itemSurnameElement
    #itemNameElement
    async header() {
        let titleElement = document.createElement('div')
        titleElement.innerText = "Connecter en tant que ..."
        return titleElement;
    }

    async content() {
        let itemsElement = document.createElement('div')
        itemsElement.classList.add('ReportUser')
        createFormItem.call(this)
        return itemsElement

        //---

        function createFormItem() {
            let itemElement = document.createElement('form')
            itemElement.classList.add('User__form')

            this.#itemSurnameElement = document.createElement('input')
            this.#itemSurnameElement.setAttribute('placeholder', 'Nom')
            this.#itemSurnameElement.classList.add('User__formContent')

            // let itemNameElement = document.createElement('input')
            this.#itemNameElement = document.createElement('input')
            this.#itemNameElement.setAttribute('placeholder', 'Prenom')
            this.#itemNameElement.classList.add('User__formContent')

            let itemTxtRadioElement = document.createElement('span')
            itemTxtRadioElement.innerText = "Monsieur"

            let itemRadioElement = document.createElement('input')
            itemRadioElement.setAttribute('type', 'radio')
            itemRadioElement.innerText= "Monsieur"
            itemRadioElement.classList.add('User__formSelect')


            itemElement.append(this.#itemSurnameElement)
            itemElement.append(this.#itemNameElement)

            // itemElement.append(itemRadioElement)
            // itemElement.append(itemRadioElement)

            itemsElement.append(itemElement)
        }
    }

    async footer(){
        let buttonOkElement = document.createElement('button')
        buttonOkElement.innerHTML='<img src="/images/ok.svg"/>';

        let buttonCancelElement = document.createElement('button')
        buttonCancelElement.innerHTML='<img src="/images/cancel.svg"/>';
        
        buttonOkElement.addEventListener('click', ()=>this.#buttonOk_click_handler.call(this))
        buttonCancelElement.addEventListener('click', ()=>this.#buttonCancel_click_handler.call(this))

        return [buttonOkElement, buttonCancelElement]
    }   

    #buttonOk_click_handler(){
        // this.shell.gotoView('/views/report-list.js')
        let title = this.#itemSurnameElement.value  || "NO TITLE"
        let content = this.#itemNameElement.value   || "THERE IS NOTHING..."

        const url = '/api/sendNote';
        const headers = ({
            'Accept': 'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
        })
        const data = {
            title: title, 
            content: content
        }
        // '"title"'+':'+ data.title +','+ '"content"'+':' + data.content
        // title: title, content: content
        
        fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data) })
            .then(response => response.json())  
            .then(json => console.log(json))
            .catch(err => console.log(err))
            console.log(data)
        this.shell.gotoView('/views/notes-list.js')
    }

    #buttonCancel_click_handler(){
        this.shell.gotoView('/views/report-list.js')
    }
}