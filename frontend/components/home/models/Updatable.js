export default class Updatable {
    constructor(component) {
        this.component = component;
        this.notifyUpdatedCallback =
            this.notifyUpdatedCallback.bind(this);
        this.isActive = false;
    }
    notifyUpdatedCallback(){
        this.isActive = false;
    }

    notifyUpdated(){
        this.isActive = true;
        this.component.forceUpdate(this.notifyUpdatedCallback);
    }
}