export function passwordValidator(password) {

    let passwordCheck = false
    let lengthCheck = false;
    let digitalCheck = false
    let capitalCheck = false

    if (password.length > 5) {
        lengthCheck = true
    }

    for (let i = 0; i < password.length; i++) {
        let letter = password.charAt(i)
        if (letter >= 0 && letter <= 9) {
            digitalCheck = true
        } else if (letter == letter.toUpperCase()) {
            capitalCheck = true
        }

    }

    if (lengthCheck && capitalCheck && digitalCheck === true) {
        passwordCheck = true
    }

    return passwordCheck
}

export function emailValidator(email) {

    let emailcheck = false

    let appelstrofCheck = false;
    let textBeforeCheck = false
    let textAFterCheck = false
    let textEndCheck = false

    if (email.includes("@")) {
        appelstrofCheck = true

        const splitemail = email.split('@')

        if (splitemail[0] == "") {
            console.log("beginning is empty")
        } else {
            textBeforeCheck = true
        }

        if (splitemail[1] == "") {
            console.log("ending is empty")
        } else {
            textAFterCheck = true
        }

        const splitend = splitemail[1].split('.')

        if (splitend) {
            const lastitem = splitend[splitend.length - 1]

            if (lastitem === "nl" || lastitem === "com") {
                textEndCheck = true
            }
        }


    }


    if (appelstrofCheck && textBeforeCheck && textAFterCheck && textEndCheck === true) {
        emailcheck = true
    }


    return emailcheck
}

