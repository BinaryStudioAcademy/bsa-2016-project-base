module.exports = function unique(array) {
    for (let i = 0; i < array.length; i += 1) {
        for (let j = i + 1; j < array.length; j += 1) {
            if (JSON.stringify(array[i]) == JSON.stringify(array[j])) {
                array.splice(j--, 1);
            }
        }
    }
    return array;
}