import WithTime from "./WithTime.js";

const withTime = new WithTime();

withTime.on(
    'begin',
    (startedAt) => console.log(`About to execute startedAt[${startedAt}]`)
);
withTime.on(
    'end',
    (finishedAt, executionTime) => console.log(`Done with execute finishedAt[${finishedAt}] executionTime[${executionTime}]`)
);

withTime.on(
    'data',
    (data) => console.log('data = ', data)
);

console.log(withTime.rawListeners("end"));


const fetchData = async (url, errorCallback, successCallback) => {
    let data;

    try {
        const response = await fetch(url);
        data = response.json();

        if (typeof successCallback === 'function') {
            successCallback(data);
        }
    } catch (error) {
        if (typeof errorCallback === 'function') {
            errorCallback(error);
        }
    }


    return data;
}

(async function () {
    const res = await withTime.execute(
        fetchData,
        'https://jsonplaceholder.typicode.com/posts/1',
    );

    console.log('res = ', res);
})();
