const getRandomNumber = () => {
    console.log('getRandomNumber() started');
    const result = Math.random();
    console.log('getRandomNumber() result = ', result);
    return result;
}

getRandomNumber();