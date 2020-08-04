import Registry from 'lib/registry'


/** 
 * A class wh/ establishes a unit of the UI 
 * It is meant to be extended where a custom component is defined
 * */
export default class Component {
    private _name: string
    // Component root HTML element
    private _el: HTMLElement

    // A local component registry to track which other components are in scope of this component
    private _registry = new Registry()

    // Requires a component to be named, have a template, and optional components in scope
    constructor(name: string, template: string, components?: { [key: string]: { new(): Component } }) {
        this._name = name

        for (const c in components)
            this._registry.register(c, components[c])

        // Create a HTML template tag to house the HTML string and then clone it into an
        // HTML element. 
        const templateEl = document.createElement('template')
        templateEl.innerHTML = template;
        this._el = <HTMLElement>templateEl.content.cloneNode(true)

        this.identifyComponents()
    }

    get el(): HTMLElement {
        return this._el
    }

    get name(): string {
        return this._name
    }

    // Parses the HTML child nodes in the provided template for custom components and attemps to
    // instantiate them if present in the local registry
    identifyComponents(): void {
        Array.from(this._el.children).forEach((child, index) => {
            if (child instanceof HTMLUnknownElement) {
                const componentName = child.tagName

                if (this._registry.hasComponentClass(componentName)) {
                    const component = new (this._registry.getComponentClass(componentName))()

                    this._el.replaceChild(component.el, child)
                } else
                    throw `Component ${componentName} is not locally registered`
            }
        })
    }
}
