let Shell = class extends HTMLElement {
    #containerHtml;
    #headerHtml;
    #contentHtml;
    #footerHtml;

    constructor() {
        super()
    }

    connectedCallback() {
        let shadow = this.attachShadow({ mode: 'open' })
        createStyle.call(this)
        createReportifyContainer.call(this)
        createHeader.call(this)
        createContent.call(this)
        createFooter.call(this)
        this.gotoView('/views/report-add.js')

        //---

        function createStyle() {
            let styleHtml = document.createElement('link')
            styleHtml.setAttribute('href', '/css/Shell.css')
            styleHtml.setAttribute('rel', 'stylesheet')
            shadow.append(styleHtml)
        }

        function createReportifyContainer() {
            this.#containerHtml = document.createElement('div')
            this.#containerHtml.classList.add('Shell')
            shadow.append(this.#containerHtml)
        }

        function createHeader() {
            this.#headerHtml = document.createElement('slot')
            this.#headerHtml.setAttribute('name', 'header')
            this.#headerHtml.classList.add('Shell__header')
            this.#containerHtml.append(this.#headerHtml)
        }

        function createContent() {
            this.#contentHtml = document.createElement('slot')
            this.#contentHtml.setAttribute('name', 'content')
            this.#contentHtml.classList.add('Shell__content')
            this.#containerHtml.append(this.#contentHtml)
        }

        function createFooter() {
            this.#footerHtml = document.createElement('slot')
            this.#footerHtml.setAttribute('name', 'footer')
            this.#footerHtml.classList.add('Shell__footer')
            this.#containerHtml.append(this.#footerHtml)
        }
    }

    async getView(url, options) {
        options = options || {}
        let viewComponent = await import(url)
        if (!viewComponent || !viewComponent.default) throw new Error(`View ${url} not found.`)
        viewComponent = viewComponent.default
        let view = new viewComponent()
        view.url = url
        view.options = options
        view.shell = this
        return view
    }

    async gotoView(url, options) {
        let view = await this.getView(url, options)
        if (view.header) this.setHeader(await view.header())
        if (view.content) this.setContent(await view.content())
        if (view.footer) this.setFooter(await view.footer())
        return view
    }

    setHeader(element) {
        Array.from(this.querySelectorAll('[slot="header"]'))?.map(elem => elem.remove())
        if (!element) return;
        element = Array.isArray(element) ? element : [element]
        element.map(elem => {
            elem.setAttribute('slot', 'header')
            this.append(elem)
        })
    }

    setContent(element) {
        Array.from(this.querySelectorAll('[slot="content"]'))?.map(elem => elem.remove())
        if (!element) return;
        element = Array.isArray(element) ? element : [element]
        element.map(elem => {
            elem.setAttribute('slot', 'content')
            this.append(elem)
        })
    }

    setFooter(element) {
        Array.from(this.querySelectorAll('[slot="footer"]'))?.map(elem => elem.remove())
        if (!element) return;
        element = Array.isArray(element) ? element : [element]
        element.map(elem => {
            elem.setAttribute('slot', 'footer')
            this.append(elem)
        })
        this.append(element)
    }
}

// Si on veut travailler avec des WebComponent, il faut les ajouter comme suit
// les exporter ne suffit pas pour en faire de nouvelles balises
window.customElements.define('nt-shell', Shell)

export default Shell
