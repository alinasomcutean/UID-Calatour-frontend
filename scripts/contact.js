var errors = "";
var confirmation = "";

window.onload = function () {
    document.getElementById("surname").onblur = validateSurname;
    document.getElementById("firstName").onblur = validateFirstName;
    document.getElementById("address").onblur = validateAddress;
    document.getElementById("birthDate").onblur = validateBirthdate;
    document.getElementById("phoneNumber").onblur = validatePhoneNumber;
    document.getElementById("email").onblur = validateEmail;

    document.getElementById("reset").onclick = reset;
    document.getElementById("contactForm").onsubmit = displayMessage;
}

function displayMessage() {
    errors = "The following data are wrong:";
    validateSurname();
    validateFirstName();
    validateAddress();
    validateBirthdate();
    validatePhoneNumber();
    validateEmail();
    if (errors.length == 29) {
        document.getElementById("errors").innerHTML = "";
        confirmation += "Data was correctly introduced.";
        document.getElementById("confirmation").innerHTML = confirmation;
    } else {
        document.getElementById("confirmation").innerHTML = "";
        document.getElementById("errors").innerHTML = errors;
    }
    errors = "The following data are wrong:";
    return false; //do not continue with the force submission (prevents from reloading the page if something is wrong)
}

function validateSurname() {
    var surnameInput = document.getElementById("surname");
    //var surnameError = document.getElementById("surnameError");

    if (surnameInput.value.length < 3) {
        //surnameInput.style.backgroundColor = "red";
        surnameInput.classList.add("invalid"); //connects with the attribute class from html
        surnameInput.classList.remove("valid");
        errors += '<li id="1">Field <strong>' + document.getElementById("surnameLabel").textContent + '</strong> (' + surnameInput.value + ') is invalid.</li>';
        //surnameError.innerHTML = "Value is invalid";
    } else {
        //alert("Surname valid");
        surnameInput.classList.add("valid");
        surnameInput.classList.remove("invalid");
        //surnameError.innerHTML = "Value is correct";
    }
}

function validateFirstName() {
    var firstNameInput = document.getElementById("firstName");

    if (firstNameInput.value.length < 3) {
        firstNameInput.classList.add("invalid");
        firstNameInput.classList.remove("valid");
        errors += '<li>Field <strong>' + document.getElementById("firstNameLabel").textContent + '</strong> (' + firstNameInput.value + ') is invalid.</li>';
    } else {
        firstNameInput.classList.add("valid");
        firstNameInput.classList.remove("invalid");
    }
}

function validateAddress() {
    var addressInput = document.getElementById("address");
    var patternDigit = /\d/g;
    var patternChars = /[@#$%^&*]/g;

    if (addressInput.value.length < 3 || patternDigit.test(addressInput.value) == false || patternChars.test(addressInput.value)) {
        addressInput.classList.add("invalid");
        addressInput.classList.remove("valid");
        errors += '<li>Field <strong>' + document.getElementById("addressLabel").textContent + '</strong> (' + addressInput.value + ') is invalid.</li>';
    } else {
        addressInput.classList.add("valid");
        addressInput.classList.remove("invalid");
    }
}

function validateBirthdate() {
    var birthDateInput = document.getElementById("birthDate");
    var pattern = /\d{2}\/\d{2}\/\d{4}/g;

    if (pattern.test(birthDateInput.value) == false) {
        birthDateInput.classList.add("invalid");
        birthDateInput.classList.remove("valid");
        errors += '<li>Field <strong>' + document.getElementById("birthDateLabel").textContent + '</strong> (' + birthDateInput.value + ') is invalid.</li>';
    } else {
        var date = birthDateInput.value.split("/");
        var day = parseInt(date[0]);
        var month = parseInt(date[1]);
        var year = parseInt(date[2]);

        //Check month with 31 days
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            if (day >= 1 && day <= 31) {
                birthDateInput.classList.add("valid");
                birthDateInput.classList.remove("invalid");
            }
            else {
                birthDateInput.classList.add("invalid");
                birthDateInput.classList.remove("valid");
                errors += '<li>Field <strong>Birth Date</strong> (' + birthDateInput.value + ') is invalid.</li>';
            }
        } else {
            //Check month with 30 days
            if (month == 4 || month == 6 || month == 9 || month == 11) {
                if (day >= 1 && day <= 30) {
                    birthDateInput.classList.add("valid");
                    birthDateInput.classList.remove("invalid");
                } else {
                    birthDateInput.classList.add("invalid");
                    birthDateInput.classList.remove("valid");
                    errors += '<li>Field <strong>Birth Date</strong> (' + birthDateInput.value + ') is invalid.</li>';
                }
            } else {
                //Check if the february has 28 or 29 days
                if (year % 4 == 0) {
                    if (month == 2 && day >= 1 && day <= 29) {
                        birthDateInput.classList.add("valid");
                        birthDateInput.classList.remove("invalid");
                    } else {
                        birthDateInput.classList.add("invalid");
                        birthDateInput.classList.remove("valid");
                        errors += '<li>Field <strong>Birth Date</strong> (' + birthDateInput.value + ') is invalid.</li>';
                    }
                } else {
                    if (month == 2 && day >= 1 && day <= 28) {
                        birthDateInput.classList.add("valid");
                        birthDateInput.classList.remove("invalid");
                    } else {
                        birthDateInput.classList.add("invalid");
                        birthDateInput.classList.remove("valid");
                        errors += '<li>Field <strong>Birth Date</strong> (' + birthDateInput.value + ') is invalid.</li>';
                    }
                }
            }
        }
    }
}

function validatePhoneNumber () {
    var phoneNumberInput = document.getElementById("phoneNumber");
    var pattern = /\d{3}\-\d{9}/g;

    if(pattern.test(phoneNumberInput.value)) {
        phoneNumberInput.classList.add("valid");
        phoneNumberInput.classList.remove("invalid");
    } else {
        phoneNumberInput.classList.add("invalid");
        phoneNumberInput.classList.remove("valid");
        errors += '<li>Field <strong>' + document.getElementById("phoneNumberLabel").textContent + '</strong> (' + phoneNumberInput.value + ') is invalid.</li>';
    }
}

function validateEmail () {
    var emailInput = document.getElementById("email");
    var pattern = /[a-z]+@[a-z]+\.[a-z]+/i;

    //if(pattern.test(emailInput.value)) {
    if(emailInput.value.match(pattern)) {
        emailInput.classList.add("valid");
        emailInput.classList.remove("invalid");
    } else {
        emailInput.classList.add("invalid");
        emailInput.classList.remove("valid");
        errors += '<li>Field <strong>' + document.getElementById("emailLabel").textContent + '</strong> (' + emailInput.value + ') is invalid.</li>';
    }
}

function reset () {
    var surnameInput = document.getElementById("surname");
    surnameInput.value = "";
    surnameInput.classList.add("standard");

    var firstNameInput = document.getElementById("firstName");
    firstNameInput.value = "";
    firstNameInput.classList.add("standard");

    var addressInput = document.getElementById("address");
    addressInput.value = "";
    addressInput.classList.add("standard");

    var birthDateInput = document.getElementById("birthDate");
    birthDateInput.value = "";
    birthDateInput.classList.add("standard");

    var phoneNumberInput = document.getElementById("phoneNumber");
    phoneNumberInput.value = "";
    phoneNumberInput.classList.add("standard");

    var emailInput = document.getElementById("email");
    emailInput.value = "";
    emailInput.classList.add("standard");
}