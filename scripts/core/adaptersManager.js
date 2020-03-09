class Adapter{
    constructor({name = false, viewSource = false}){
        this.name = name;
        this.viewSource = viewSource;
    }
    build(target){

    }
    load(){
        if(!this.viewSource){
            throw new Error("no view location defined");
        }
        
    }
    onBeforeLoad(){}
    onLoad(){}
    onDisplay(){}
    onData(){}
}
class AdaptersManager{
    constructor(){
        this.adapters = {};
        this.adapterViewsCache = {};
        window.registerAdapter = function(){adaptersManager.registerAdapter(...arguments)}; //TODO: this is full garbage
    }
    registerAdapter(name, {viewSource=false, preload=false} = {}){
        console.log("register adapter:", ...arguments);
        if(this.adapters[name]){
            throw new Error("adapter already registered")
        }
        var adapter = new Adapter({name});
        if(!viewSource){
            viewSource = `${config.adaptersLocation}/${name}${config.adapterExtension}`
        }
        adapter.viewSource = viewSource;
    }
}