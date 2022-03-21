
export default class {
    #itemNameElement
    #itemMailElement
    #itemPasswordElement
    #sendFormElement
    async header() {
        let titleElement = document.createElement('div')
        titleElement.innerText = "note app"
        return titleElement;
    }

    async content() {
        let itemsElement = document.createElement('div')
        itemsElement.classList.add('ReportUser')

        createFormConnectUser.call(this)
        createFormNewUser.call(this)
        
        return itemsElement

        //---
        function createFormConnectUser() {
            let itemElement = document.createElement('form')
            itemElement.classList.add('User__form')

            // let itemNameElement = document.createElement('input')
            this.#itemMailElement = document.createElement('input')
            this.#itemMailElement.setAttribute('placeholder', 'mail')
            this.#itemMailElement.classList.add('User__formContent')

            this.#itemPasswordElement = document.createElement('input')
            this.#itemPasswordElement.setAttribute('placeholder', 'password')
            this.#itemPasswordElement.classList.add('User__formContent')

            this.#sendFormElement = document.createElement('button')
            this.#sendFormElement.innerHTML='se connecter';
            this.#sendFormElement.addEventListener('click', ()=>this.#connect_click_handler.call(this))

            itemElement.append(this.#itemMailElement)
            itemElement.append(this.#itemPasswordElement)
            itemElement.append(this.#sendFormElement)

            // itemElement.append(itemRadioElement)
            // itemElement.append(itemRadioElement)


            itemsElement.append(itemElement)
        }

        function createFormNewUser() {
            let itemElement = document.createElement('form')
            itemElement.classList.add('User__form')

            this.#itemNameElement = document.createElement('input')
            this.#itemNameElement.setAttribute('placeholder', 'Nom')
            this.#itemNameElement.classList.add('User__formContent')

            // let itemNameElement = document.createElement('input')
            this.#itemMailElement = document.createElement('input')
            this.#itemMailElement.setAttribute('placeholder', 'mail')
            this.#itemMailElement.classList.add('User__formContent')

            this.#itemPasswordElement = document.createElement('input')
            this.#itemPasswordElement.setAttribute('placeholder', 'password')
            this.#itemPasswordElement.classList.add('User__formContent')

            this.#sendFormElement = document.createElement('button')
            this.#sendFormElement.innerHTML='Créer un compte';
            this.#sendFormElement.addEventListener('click', ()=>this.#send_click_handler.call(this))

            itemElement.append(this.#itemNameElement)
            itemElement.append(this.#itemMailElement)
            itemElement.append(this.#itemPasswordElement)
            itemElement.append(this.#sendFormElement)

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

    #send_click_handler(){
        // this.shell.gotoView('/views/report-list.js')
        let USR_Name = this.#itemNameElement.value
        let USR_Mail = this.#itemMailElement.value
        let USR_Pwd  = this.#itemPasswordElement.value
        //alert(value + ' ' + value2 + ' ' + value3)

        const url = 'http://localhost:5050/api/newUser';
        const headers = {
            "Content-type": "application/json; charset=UTF-8"
            //,"client_id": "1001125",
            //"client_secret": "876JHG76UKFJYGVHf867rFUTFGHCJ8JHV"
        }

        const data = {
            USR_Name: USR_Name,
            USR_Mail: USR_Mail,
            USR_Pwd:  USR_Pwd
        }

        fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data) })
            .then(response => response.json())  
            .then(json => console.log(json))
            .catch(err => console.log(err))
            console.log(data)
        //this.shell.gotoView('/views/report-list.js')

    }

    #connect_click_handler(){
        // this.shell.gotoView('/views/report-list.js')
        let USR_Name = this.#itemNameElement.value
        let USR_Mail = this.#itemMailElement.value
        let USR_Pwd  = this.#itemPasswordElement.value
        //alert(value + ' ' + value2 + ' ' + value3)

        const url = 'http://localhost:5050/api/connectUser';
        const headers = {
            "Content-type": "application/json; charset=UTF-8"
            //,"client_id": "1001125",
            //"client_secret": "876JHG76UKFJYGVHf867rFUTFGHCJ8JHV"
        }

        const data = {
            USR_Name: USR_Name,
            USR_Mail: USR_Mail,
            USR_Pwd:  USR_Pwd
        }

        fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data) })
            .then(response => response.json())  
            .then(json => console.log(json))
            .catch(err => console.log(err))
            console.log(data)
        //this.shell.gotoView('/views/report-list.js')

    }

    #buttonOk_click_handler(){
        // this.shell.gotoView('/views/report-list.js')
        let USR_Name = this.#itemNameElement.value
        let USR_Mail = this.#itemMailElement.value
        let USR_Pwd  = this.#itemPasswordElement.value
        //alert(value + ' ' + value2 + ' ' + value3)

        const url = 'http://localhost:5050/api/new-user';
        const headers = {
            "Content-type": "application/json; charset=UTF-8"
            //,"client_id": "1001125",
            //"client_secret": "876JHG76UKFJYGVHf867rFUTFGHCJ8JHV"
        }

        const data = {
            USR_Name: USR_Name,
            USR_Mail: USR_Mail,
            USR_Pwd:  USR_Pwd
        }

        fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data) })
            .then(response => response.json())  
            .then(json => console.log(json))
            .catch(err => console.log(err))
            console.log(data)
        //this.shell.gotoView('/views/report-list.js')

    }

    #buttonCancel_click_handler(){
        this.shell.gotoView('/views/index.js')
    }
}