import Registry from 'lib/registry'


/** 
 * A class wh/ establishes a unit of the UI.
 * It is meant to be extended where a custom component is defined.
 * */
export default class Component {
    private _name: string
    // Component root HTML element
    private _el: HTMLElement

    // A local component registry to track which other components are in scope of this component
    private _registry: Registry = new Registry()
    private _refs: { [key: string]: HTMLElement } = {}

    /** Requires a component to be named, have a template, and optional components in scope */
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

    get refs(): { [key: string]: HTMLElement } {
        return this._refs
    }

    /** Iterates through children HTMLElements and looks for element refs, and custom components */
    identifyComponents(): void {
        Array.from(this._el.children).forEach((child: HTMLElement, index: number) => {
            // Search for component tags and instantiate an instance of them
            if (child instanceof HTMLUnknownElement) {
                const componentName = child.tagName

                if (this._registry.hasComponentClass(componentName)) {
                    const component = new (this._registry.getComponentClass(componentName))()

                    this._el.replaceChild(component.el, child)
                } else
                    throw `Component ${componentName} is not locally registered`
            }

            // Identify any element references declared in the template
            if (child.hasAttribute('ref'))
                this._refs[child.getAttribute('ref')] = <HTMLElement>this._el.children.item(index)
        })
    }
}
