export class Reflection {

    /**
     * New instance of generic type
     */
    static getInstance<T>(context: Window, name: string, ...args: any[]): T {
        var instance = Object.create(context[name].prototype);
        instance.constructor.apply(instance, args);
        return <T>instance;
    }

    /**
     * Return class name of instance
     */
    static getClassName(inputClass) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(inputClass["constructor"].toString());
        return (results && results.length > 1) ? results[1] : "";
    }
}