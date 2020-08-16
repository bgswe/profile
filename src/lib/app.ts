import Component from 'lib/component'


/** An Application Component for new projects w/ top-level component specific features */
export default class App extends Component {
    constructor(template: string, components?: { [key: string]: { new(): any } }) {
        super('App', template, components)

        // Append root component el to the document body
        document.body.appendChild(this.el)
    }
}
