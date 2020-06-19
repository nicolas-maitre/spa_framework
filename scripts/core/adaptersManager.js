class Adapter {
    constructor(name) {
        this.name = name;
    }
    build(target, data) {

    }
    load() {
        if (!this.viewSource) {
            throw new Error("no view location defined");
        }
    }
    onBeforeLoad() { }
    onLoad() { }
    onDisplay() { }
    onData() { }
}

class AdapterMethod extends Adapter {
    constructor(name, { method }) {
        super(name);
    }
}
class AdapterView extends Adapter {
    constructor(name, { viewSource }) {
        super(name);
        if (!viewSource) {
            viewSource = `${config.adaptersLocation}${name}${config.adapterExtension}`
        }
        this.viewSource = viewSource;
    }
}

class AdaptersManager {
    constructor() {
        this.adapters = {};
        this.adapterViewsCache = {};
        window.registerAdapter = (...args) => {this.registerAdapter(...args);};
        window.registerAdapterView = (...args) => {this.registerAdapterView(...args);};
        window.registerAdapterMethod = (...args) => {this.registerAdapterMethod(...args);};
    }
    registerAdapter(name, objectArg = false) {
        // typeof object arg
        //      function: adapterMethod method
        //      string: adapterView view name
        //      object: instance of Adapter
        if (this.adapters[name]) {
            throw new Error(`adapter "${name}" already registered`)
        }
        if (!objectArg || typeof objectArg == "string") {
            var adapter = this.registerAdapterView(name, { viewSource: objectArg });
        } else if (typeof objectArg == "function") {//TODO: Attention elseif!
            var adapter = this.registerAdapterMethod(name, objectArg);
        } else if (objectArg instanceof Adapter) {
            var adapter = objectArg;
        } else {
            throw new Error("invalid argument")
        }

        this.adapters[name] = adapter;
        console.log(`adapter "${name}" registered`);
        return adapter;
    }
    registerAdapterView(name, options = {}) {
        return new AdapterView(name, options);
    }
    registerAdapterMethod(name, options = {}) {
        return new AdapterMethod(name, options);
    }
}