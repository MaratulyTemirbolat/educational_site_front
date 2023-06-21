const EMAIL_REG = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isValidEmail(email: string) {
    if (EMAIL_REG.test(String(email).toLowerCase())) return { errorMsg: "" };
    return { errorMsg: "неверный формат почты" };
};

export function isValidPassword(password: string) {
    return password.length >= 8 ? { errorMsg: "" } : { errorMsg: "минимум 8 символов" };
}

export function isValidPasswords(password: string, passwordConfirmation: string) {
    const errorPassword = isValidPassword(password);
    const errorPasswordConfirmation = isValidPassword(passwordConfirmation);
    if (errorPassword.errorMsg) return { errorMsg: errorPassword.errorMsg };
    if (errorPasswordConfirmation.errorMsg) return { errorMsg: errorPasswordConfirmation.errorMsg };
    return password !== passwordConfirmation ? { errorMsg: "пароли не совпадают" } : { errorMsg: "" };
}

function isEmptyField(fieldValue: string) {
    return fieldValue.trim()? { errorMsg: "" }: { errorMsg: "поле обязательно к заполнению" }
}

export function isValidInputForm(inputName: string, value: string) {
    switch (inputName) {
        case "email":
            return isValidEmail(value);
        case "last_name": 
        case "first_name":
            return isEmptyField(value);
        case "passwordConfirmation":
        case "password":
            return isValidPassword(value);
        default:
            return { errorMsg: "" };
    }
}

export function isValidForm(formList: any) {
    for(let formItem of formList){
        if (formItem.errorMsg) return false;
    }
    return true;
}