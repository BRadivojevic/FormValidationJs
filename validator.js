class Validator {
    constructor(confing) {
        this.elementsConfing = confing;
        this.errors = {};

        this.generateErrorsObject();

        this.inputListener();
    }
    //for every input we are making row to save errors (field)
    generateErrorsObject() {
        for (let field in this.elementsConfing) {
            this.errors[field] = [];
        }
    }

    inputListener() {
        let inputSelector = this.elementsConfing;

        for (let field in inputSelector) {
            let el = document.querySelector(`input[name="${field}"]`);

            el.addEventListener('input', this.validate.bind(this));
        }
    }
    //main function
    validate(e) {
        let elFildes = this.elementsConfing;

        let field = e.target;

        let fieldName = field.getAttribute('name');
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if (elFildes[fieldName].required) {
            if (fieldValue === '') {
                this.errors[fieldName].push('The field is empty!');
            }
        }
        if (elFildes[fieldName].email) {
            if (!this.validateEmail(fieldValue)) {
                this.errors[fieldName].push('Invalid email address');
            }
        }
        if (fieldValue.length < elFildes[fieldName].minlength || fieldValue.length > elFildes[fieldName].maxlength) {
            this.errors[fieldName].push(`Field must have minimum ${elFildes[fieldName].minlength} and maximum ${elFildes[fieldName].maxlength}`);
        }
        if (elFildes[fieldName].matching) {
            let matchingEl = document.querySelector(`input[name="${elFildes[fieldName].matching}"]`);

            if (fieldValue !== matchingEl.value) {
                this.errors[fieldName].push('Passwords do not match');
            }
        }
        //print out errors
        this.populateErrors(this.errors);
    }

    populateErrors(errors) {
        //deletion after each input
        for (let element of document.querySelectorAll('ul')) {
            element.remove();
        }
        //going through mistakes
        for (let key of Object.keys(errors)) {

            //creating an ul tab in the parent element of the input
            let parentElement = document.querySelector(`input[name="${key}"]`).parentElement;
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            //writing errors within the ul creating li
            errors[key].forEach(error => {
                let li = document.createElement('li');
                li.innerText = error;
                errorsElement.appendChild(li);
            });
        }
    }

    validateEmail(email) {
        //email validation
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        }
        return false
    }
}