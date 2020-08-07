import Component from 'lib/component'
import * as pug from 'pug'


function CompFactory(config?: any) {
    const { name, templateFunc } = config

    return function Comp<T extends { new(...args: any[]): {} }>(con: T) {
        return class extends con {
            _templateEl: HTMLElement
            _el: HTMLElement

            constructor(...args: any[]) {
                super(args)

                this._templateEl = document.createElement('div')
                this.render()
            }

            render() {
                const rendTemp = templateFunc({})

                if (this._el) {
                    this._el = document.
                } else {
                    document.createElement()
                }
                this.
            }
        }
    }
}

@CompFactory({
    name: 'Subheader',
    templateFunc: require('./subheader.pug')
})
// Test class for a custom defined component
export default class Subheader { constructor() { } }
