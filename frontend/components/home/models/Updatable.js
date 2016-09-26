export default class Updatable {
    constructor(component) {
        this.component = component;
        this.notifyUpdatedCallback =
            this.notifyUpdatedCallback.bind(this);
        this.isActive = false;
    }
    notifyUpdatedCallback(){
        this.isActive = false;
        this.afterNotifyUpdated && this.afterNotifyUpdated();
        this.afterNotifyUpdated = undefined;
    }

    notifyUpdated(func){
        this.afterNotifyUpdated = func;
        this.isActive = true;
        this.component.forceUpdate(this.notifyUpdatedCallback);
    }
}