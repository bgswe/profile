
/** A class to handle the management of a component group */
export default class Registry {
    private _componentRegistry: { [key: string]: any } = {}

    public constructor() { }

    register(name: string, componentClass: any) {
        this._componentRegistry[name.toUpperCase()] = componentClass
    }

    getComponentClass(name: string) {
        return this._componentRegistry[name.toUpperCase()]
    }

    hasComponentClass(name: string) {
        return this._componentRegistry.hasOwnProperty(name.toUpperCase())
    }
}
