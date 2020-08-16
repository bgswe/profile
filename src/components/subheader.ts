import Component from 'lib/component'
import * as pug from 'pug'

function debounc(func, delta) {
    let timeout: NodeJS.Timeout

    return function (...args: any[]) {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), delta)
    }
}

function CompFactory(config?: any) {
    const { name, templateFunc } = config

    return function Comp<T extends { new(...args: any[]): {} }>(con: T) {
        return class extends con {
            _templateEl: HTMLTemplateElement
            _el: HTMLElement

            _renderTimeout: NodeJS.Timeout

            constructor(...args: any[]) {
                super(args)

                const self = this

                for (const p in this.data) {
                    this.data[`_${p}`] = this.data[p]

                    Object.defineProperty(this.data, p, {
                        get() {
                            return this[`_${p}`]
                        },
                        set(val) {
                            this[`_${p}`] = val
                            self.render()
                        }
                    })

                }

                this._templateEl = document.createElement('template')
                this.render()

                this.identifyEvents(this._el)
            }

            render() {
                this._templateEl.innerHTML = templateFunc(this.data)

                const compiledNode = <HTMLElement>this._templateEl.content.cloneNode(true)
                const newEl = <HTMLElement>compiledNode.firstChild

                if (this._el)
                    this._el.parentNode.replaceChild(newEl, this._el)

                this._el = newEl
                this.identifyEvents(this._el)
            }

            identifyEvents(element: HTMLElement) {
                const self = this

                if (!(element instanceof HTMLUnknownElement)) {
                    const { event } = element.dataset
                    if (event) {
                        const { type, func } = self.methods[event]
                        element.addEventListener(type, func)
                    }
                }

                Array.from(element.children).forEach(this.identifyEvents.bind(this))
            }

            get el() {
                return this._el
            }
        }
    }
}


function methodFactory(data) {
    return function method(event, callback) {
        return { type: event, func: () => callback(data) }
    }
}



@CompFactory({
    name: 'Subheader',
    templateFunc: require('./subheader.pug')
})
// Test class for a custom defined component
export default class Subheader {
    data = {
        count: 0,
    }

    method = methodFactory(this.data)
    methods = {
        increment: this.method('click', function (data) {
            data.count++
        }),
        reset: this.method('click', function (data) {
            data.count = 0
        })
    }
}
