import { response } from 'express'
import user from '../services/user.js'
import connectService from '../services/user.js'

export default class {
    #itemNameElement
    #itemMailElement
    #itemPasswordElement
    #sendFormElement

    #itemConnectMailElement
    #itemConnectPasswordElement
    #sendConnectFormElement

    async header() {
        let titleElement = document.createElement('div')
        titleElement.innerText = "note app"
        return titleElement;
    }

    async content() {
        let itemsElement = document.createElement('div')
        itemsElement.classList.add('ReportUser')

        createFormConnectUser.call(this)
        
        return itemsElement

        //---
        function createFormConnectUser() {
            let itemElement = document.createElement('form')
            itemElement.classList.add('User__form')

            // let itemNameElement = document.createElement('input')
            this.#itemConnectMailElement = document.createElement('input')
            this.#itemConnectMailElement.setAttribute('placeholder', 'mail')
            this.#itemConnectMailElement.classList.add('User__formContent')

            this.#itemConnectPasswordElement = document.createElement('input')
            this.#itemConnectPasswordElement.setAttribute('placeholder', 'password')
            this.#itemConnectPasswordElement.classList.add('User__formContent')

            this.#sendConnectFormElement = document.createElement('button')
            this.#sendConnectFormElement.innerHTML='se connecter';
            this.#sendConnectFormElement.addEventListener('click', ()=>this.#connect_click_handler.call(this))

            itemElement.append(this.#itemConnectMailElement)
            itemElement.append(this.#itemConnectPasswordElement)
            itemElement.append(this.#sendConnectFormElement)

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
        buttonCancelElement.addEventListener('click', ()=>this.#connect_click_handler.call(this))

        return [buttonOkElement, buttonCancelElement]
    }   

    #send_click_handler(){
        // TODO
    }

    // TODO

    #connect_click_handler(){
        // this.shell.gotoView('/views/report-list.js')
        // let usrName = this.#itemNameElement.value
        let usrMail = this.#itemConnectMailElement.value
        let usrPwd  = this.#itemConnectPasswordElement.value
        //alert(value + ' ' + value2 + ' ' + value3)

        const url = '/api/connectUser';
        const headers = {
            "Content-type": "application/json; charset=UTF-8"
            //,"client_id": "1001125",
            //"client_secret": "876JHG76UKFJYGVHf867rFUTFGHCJ8JHV"
        }

        const data = {
            // usrName: usrName,
            usrMail: usrMail,
            usrPwd:  usrPwd
        }

        fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data) })
            .then(response => response.json())  
            .then(json => console.log(json))
            .catch(err => console.log(err))
            console.log(data)
            
        // let userVerif =  connectService.getUsersConnection()
        console.log(response)
        for (let item of userVerif) {
            console.log(item.route)
            // this.shell.gotoView(item.route)
        }
    }

    #buttonOk_click_handler(){
        // this.shell.gotoView('/views/report-list.js')
        // TODO
    }

    #buttonCancel_click_handler(){
        this.shell.gotoView('/views/index.js')
    }
}