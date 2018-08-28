function shuffle(array) {
    for (let i = 0; i < array.length -1; i++) {
        const target = i + Math.floor((array.length - i) * Math.random());
        let aux = array[i];
        array[i] = array[target];
        array[target] = aux;
    }

    return array;
}

export default shuffle;
