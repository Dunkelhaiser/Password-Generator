export {};

const lengthSlider = document.querySelector("#pass-length") as HTMLInputElement;
const generationButton = document.querySelector("#generation-button") as HTMLButtonElement;
const options = document.querySelectorAll(".option input") as NodeListOf<HTMLInputElement>;
const passwordField = document.querySelector("#password-field") as HTMLInputElement;
const passwordStrength = document.querySelector(".strength") as HTMLDivElement;
const copyButton = document.querySelector(".input-section i") as HTMLParagraphElement;

let length = Number(lengthSlider.value);

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/",
};

const passwordStrengthHandler = (password: string) => {
    const checkLength = /^.{8,}$/;
    const checkLowerCase = /[a-z]/;
    const checkUperCase = /[A-Z]/;
    const checkNumbers = /[0-9]/;
    const checkSymbols = /[^A-Za-z0-9]/;
    if (
        checkLength.test(password) &&
        checkLowerCase.test(password) &&
        checkUperCase.test(password) &&
        checkNumbers.test(password) &&
        checkSymbols.test(password)
    ) {
        passwordStrength.id = "excelent";
    } else if (
        checkLength.test(password) &&
        checkLowerCase.test(password) &&
        checkUperCase.test(password) &&
        (checkNumbers.test(password) || checkSymbols.test(password))
    ) {
        passwordStrength.id = "strong";
    } else if (
        checkLength.test(password) &&
        ((checkLowerCase.test(password) && checkUperCase.test(password)) || checkNumbers.test(password) || checkSymbols.test(password))
    ) {
        passwordStrength.id = "medium";
    } else if (
        checkLength.test(password) ||
        checkLowerCase.test(password) ||
        checkUperCase.test(password) ||
        checkNumbers.test(password) ||
        checkSymbols.test(password)
    ) {
        passwordStrength.id = "weak";
    } else passwordStrength.id = "";
};

const generatePassword = () => {
    let password = "";
    let passwordValues = "";
    options.forEach((option) => {
        if (option.checked) {
            passwordValues += characters[option.id as keyof typeof characters];
        }
    });

    if (passwordValues === "") return;

    for (let i = 0; i < length; i++) {
        password += passwordValues[Math.floor(Math.random() * passwordValues.length)];
    }
    passwordField.value = password;
    passwordStrengthHandler(password);
};

const changeLength = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.querySelector<HTMLSpanElement>("#length")!.innerText = lengthSlider.value;
    length = Number(lengthSlider.value);
    generatePassword();
};

const copyPassword = () => {
    if (passwordField.value.length === 0) return;
    navigator.clipboard.writeText(passwordField.value);
    copyButton.className = "fa-solid fa-check";
    setTimeout(() => {
        copyButton.className = "fa-solid fa-copy";
    }, 3000);
};

lengthSlider.addEventListener("input", changeLength);
generationButton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copyPassword);
