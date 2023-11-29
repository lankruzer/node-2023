export default class EventEmitter {
    _listeners = {};

    addListener(eventName, callback) {
        if (Array.isArray(this._listeners[eventName])) {
            this._listeners[eventName].push(callback);
        } else {
            this._listeners[eventName] = [callback];
        }
    }

    on(eventName, callback) {
        this.addListener(eventName, callback);
    }

    removeListener(eventName, callback) {
        if (Array.isArray(this._listeners[eventName])) {
            let position = -1;

            for (let i = this._listeners[eventName].length - 1; i >= 0; i--) {
                if (this._listeners[eventName][i] === callback) {
                    position = i;
                    break;
                }
            }

            if (position < 0) {
                return;
            }

            if (position === 0) {
                this._listeners[eventName].shift();
            } else {
                this._listeners[eventName].splice(position, 1);
            }
        }
    }

    off(eventName, callback) {
        this.removeListener(eventName, callback);
    }

    once(eventName, callback) {
        callback._once = true;

        this.addListener(eventName, callback);
    }

    emit(eventName, ...args) {
        if (this._listeners[eventName]?.length) {
            this._listeners[eventName].forEach((callback) => {
                if (callback._once) {
                    this.removeListener(eventName, callback);
                }

                callback(...args);
            })
        }
    }

    listenerCount(eventName) {
        return this._listeners[eventName]?.length || 0;
    }

    rawListeners(eventName) {
        return this._listeners[eventName];
    }
}