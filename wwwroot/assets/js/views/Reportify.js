import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    #containerHtml;
    #headerHtml;
    #bannerHtml;
    #contentHtml;
    #cardHtml;
    #stateBarHtml;
    #titleCardHtml
    #footerHtml;

    constructor(params) {
        super(params)
        this.setTitle("Posts")
    }

    connectedCallback(){
        this.#render()
    }

    async getHtml(){
        return this.#render()
    }

    #render(){

        const data = ['titre', 'test', 'danger']
        const state = ['null', 'envoi', 'traitement', 'fini']
        let indexData = 0
        let indexState = 0
        const data_title = data[indexData]
        const data_state = state[indexState]

        let me = this
        let shadow = this.attachShadow({mode:'open'})
        createStyle()
        createContainer()
        createHeader()
        createBanner()
        createContent()
        newCard(data_title)
        createFooter()


        //---

        function createStyle(){
            let styleHtml = document.createElement('link')
            styleHtml.setAttribute('href', '/assets/css/rp-app.css')
            styleHtml.setAttribute('rel', 'stylesheet')
            shadow.append(styleHtml)
        }

        function createContainer(){
            me.#containerHtml = document.createElement('div')
            me.#containerHtml.classList.add('App')
            shadow.append(me.#containerHtml)
        }

        function createHeader(){
            me.#headerHtml = document.createElement('slot')
            me.#headerHtml.setAttribute('name', 'header')
            me.#headerHtml.classList.add('App__header')
            me.#containerHtml.append(me.#headerHtml)
        }

        function createContent(){
            me.#contentHtml = document.createElement('slot')
            me.#contentHtml.setAttribute('name', 'App__content')
            me.#contentHtml.classList.add('App__content')
            me.#containerHtml.append(me.#contentHtml)
        }

        function createCard(){
            me.#cardHtml = document.createElement('slot')
            me.#cardHtml.setAttribute('name', 'card')
            me.#cardHtml.classList.add('App__content_card')
            me.#contentHtml.append(me.#cardHtml)
        }

        function createStateBarCard(){
            me.#stateBarHtml = document.createElement('div')
            me.#stateBarHtml.classList.add('card__bar')
            me.#cardHtml.append(me.#stateBarHtml)

                 if(indexState == 1) { me.#stateBarHtml.style.border = 'grey 6px solid' ; me.#stateBarHtml.style.background = 'grey'  }
            else if(indexState == 2) { me.#stateBarHtml.style.border = 'blue 6px solid' ; me.#stateBarHtml.style.background = 'blue'  }
            else if(indexState == 3) { me.#stateBarHtml.style.border = 'green 6px solid'; me.#stateBarHtml.style.background = 'green' }
        }

        function createFooter(){
            me.#footerHtml = document.createElement('slot')
            me.#footerHtml.setAttribute('name', 'footer')
            me.#footerHtml.classList.add('App__footer')
            me.#containerHtml.append(me.#footerHtml)
        }

        function createBanner(){
            me.#bannerHtml = document.createElement('slot')
            me.#bannerHtml.setAttribute('name', 'banner')
            me.#bannerHtml.classList.add('App__banner')
            me.#containerHtml.append(me.#bannerHtml)
        }

        function newCard(){
            indexState = 1
            data.forEach(function(item, index, array) {
            console.log(item, index)
                createCard()
                createTitleCard(item)
                if (indexState > 0){
                    createStateBarCard()
                }
            });

            function createTitleCard(item){
                me.#titleCardHtml = document.createElement('span')
                me.#titleCardHtml.classList.add('card__title')
                me.#titleCardHtml.setAttribute('id', 'card__title')
                me.#titleCardHtml.innerText = item       
                me.#cardHtml.append(me.#titleCardHtml) 
            }
        }
    }
}
