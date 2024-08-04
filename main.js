let string = "";
let resultDisplayed = false;
let buttons = document.querySelectorAll('.btn');

Array.from(buttons).forEach((item) => {
    item.addEventListener('click', (e) => {
        const value = e.target.innerHTML;

        if (value === '=') {
            try {
                string = eval(string);
                document.querySelector('input').value = string;
                resultDisplayed = true;
            } catch {
                document.querySelector('input').value = "Error";
                string = "";
            }
        } else if (value === 'AC') {
            string = "";
            document.querySelector('input').value = string;
            resultDisplayed = false;
        } else if (value === '%') {
            let currentString = parseFloat(string);
            string = (currentString / 100).toString();
            document.querySelector('input').value = string;
            resultDisplayed = true;
        } else if (value === 'Del') {
            if (resultDisplayed) {
                string = "";
                resultDisplayed = false;
            } else {
                string = string.substring(0, string.length - 1);
            }
            document.querySelector('input').value = string;
        } else {
            if (resultDisplayed) {
                string = value;
                resultDisplayed = false;
            } else if (isValidInput(string, value)) {
                string = string + value;
            }
            document.querySelector('input').value = string;
        }
    });
});

function isValidInput(currentString, input) {
    const operators = ['+', '-', '*', '/'];
    const lastChar = currentString[currentString.length - 1];

    // Prevent consecutive operators
    if (operators.includes(input) && operators.includes(lastChar)) {
        return false;
    }

    // Prevent starting with an operator except '-'
    if (operators.includes(input) && currentString === '') {
        return input === '-';
    }

    // Prevent multiple decimals in the same number segment
    if (input === '.' && lastNumberSegment(currentString).includes('.')) {
        return false;
    }

    return true;
}

function lastNumberSegment(string) {
    const operators = ['+', '-', '*', '/'];
    for (let i = string.length - 1; i >= 0; i--) {
        if (operators.includes(string[i])) {
            return string.slice(i + 1);
        }
    }
    return string;
}
