const arr1 = [{ name: "vineet", age: 24 }]
const arr2 = [{ name: "vineet", age: 24 },]


const cmpObjects = (arr1, arr2) => {
    const newArr = []
    arr1.every(item => arr2.some(item2 => {
        item.name == item2.name && item.age == item2.age && newArr.push(item)
    }))
    return newArr
}

console.log(cmpObjects(arr1, arr2))

function isAnaGramString(s1, s2) {
    return s1.split('').sort().join('')
        === s2.split('').sort().join('');
}

console.log(isAnaGramString("file", "ilef"))


