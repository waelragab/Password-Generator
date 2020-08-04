const result = document.querySelector(".result");
const lengthEle = document.querySelector("#length");
const upper = document.querySelector("#upper");
const lower = document.querySelector("#lower");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const generatPass = document.querySelector(".btn");
const clipboard = document.querySelector(".clipboard");

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboard.addEventListener("click", () => {
    const textArea = document.createElement("textarea");
    const password = result.innerText;
    if (!password || password === "Check something bitch") {
        return;
    }
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert("password copied to clipboard")
})

generatPass.addEventListener("click", () => {
    const length = +lengthEle.value; 
    const hasLower = lower.checked;
    const hasUpper = upper.checked;
    const hasNumber = number.checked;
    const hasSymbol = symbol.checked;
    result.innerText = generatePassword(length, hasLower, hasUpper, hasNumber,  hasSymbol);
})

function generatePassword(length, lower, upper, number, symbol) {
    let generatedPassword = '';
    const typesCount = lower + upper + symbol + number;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        item => Object.values(item)[0]
    )
    //console.log("typesArr: ", typesArr)
    if (typesCount === 0) {
        return "Check something bitch"
    }
    for (let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            //console.log("funcName: ", funcName);

            generatedPassword += randomFunc[funcName]();
        });
        
    }
    return (generatedPassword.slice(0, length));
}

function getRandomLower() {
    const finalPassword = String.fromCharCode((Math.floor(Math.random() * 26) + 97));

    return finalPassword;
}

function getRandomUpper() {
    return String.fromCharCode((Math.floor(Math.random() * 26) + 65))
}

function getRandomNumber() {
    return String.fromCharCode((Math.floor(Math.random() * 10) + 48))
}

function getRandomSymbol() {
    const symbols = '@#$%^&*())_}{<>.,"/'
    return symbols[Math.floor(Math.random() *symbols.length)]
}

console.log(getRandomLower());
console.log(getRandomUpper());
console.log(getRandomNumber());
console.log(getRandomSymbol());