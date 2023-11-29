import EventEmitter from "./EventEmitter.js";

export default class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        const executionStartedAt = Date.now();
        let executionFinishedAt;

        this.emit('begin', executionStartedAt);

        let data;
        let error;

        try {
            data = await asyncFunc(...args);

            this.emit('data', data);
        } catch (err) {
            error = err;

            this.emit('error', error);
        } finally {
            executionFinishedAt = Date.now();
        }

        const executionTime = executionFinishedAt - executionStartedAt;

        this.emit('end', executionFinishedAt, executionTime);

        return {
            data,
            error,
            executionStartedAt,
            executionFinishedAt,
            executionTime,
        }
    }
}
