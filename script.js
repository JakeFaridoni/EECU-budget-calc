import './navigation.js';

const income_input = /** @type {HTMLInputElement} */ (
    document.querySelector('input[placeholder=Income]')
);
const table = /** @type {HTMLTableElement} */ (
    document.querySelector('table.needs-wants-savings')
);

// Net Income display on left
const netIncome = /** @type {HTMLElement} */ (
    document.querySelector("#netIncome")
);

// Estimated row on final page
const estimated = /** @type {HTMLTableRowElement} */ (
    table.querySelector('tbody > tr')
);

// Spent row
const spent = /** @type {HTMLTableRowElement} */ (estimated.nextElementSibling);

let income = 0;
income_input.addEventListener('input', () => {
    income = +income_input.value;
    // 50-30-20 split
    estimated.children.item(1).textContent = (income * 0.5).toFixed(2);
    estimated.children.item(2).textContent = (income * 0.3).toFixed(2);
    estimated.children.item(3).textContent = (income * 0.2).toFixed(2);
    netIncome.textContent = `$${Math.floor((Number(income_input.value))).toFixed(2)}`;
});

// Categorizing input fields per page based on whether they fill out wants, needs, or savings
const needs = /** @type {NodeListOf<HTMLInputElement>} */ (
    // Pages 1-4 are needs
    document.querySelectorAll('.need-input')
     // ':is(.page-1, .page-2, .page-3, .page-4) > input:not([placeholder=Entertainment])'
);

const wants = /** @type {NodeListOf<HTMLInputElement>} */ (
    // Page 6 is wants
    document.querySelectorAll('.want-input')
        // 'input[placeholder=Entertainment], .page-6 > input'
);


const savings = /** @type {NodeListOf<HTMLInputElement>} */ (
    // Page 5 is savings
    document.querySelectorAll('.saving-input')
);

// Now that we grabbed the inputs for each category...
// We perform the following for each category
let spent_on_needs = 0;
let spent_on_wants = 0;
let spent_on_savings = 0;

const needs_values = new Map();
const wants_values = new Map();
const savings_values = new Map();

function makeInputsWork(category, category_values, spent_on_category, columnIndex) {
    // For every input in the category
    for (const input of category) {
        // Set the default value of each input to 0
        category_values.set(input.placeholder, 0);
        // When you input something
        input.addEventListener(
            'input',
            (
                /** @type {InputEvent & { target: HTMLInputElement }} */ { target }
            ) => {
                 // Change the JS stored value of the input
                category_values.set(target.placeholder, +target.value);

                // Add to total money in needs and put that value into the first column of spent row
                spent_on_category = category_values.values().reduce((a, b) => a + b, 0);
                spent.children.item(columnIndex).textContent = spent_on_category.toFixed(2);
            }
        );
    }
}

makeInputsWork(needs, needs_values, spent_on_needs, 1);
makeInputsWork(wants, wants_values, spent_on_wants, 2);
makeInputsWork(savings, savings_values, spent_on_savings, 3);

// Pie Chart

// Summation of values per category

function sumInputValues(form) {
    const formClass = form.classList[1]
    // Get the inputs of the desired form
    const inputsElement = document.querySelectorAll(`.${formClass} .inputs`)

    // Convert inputsElement into an array containing its children and iterate through them
    // For each iteration, add to a total
}

// BTW forms is declared in navigation.js
sumInputValues(forms.children[0])

const canvas = document.querySelector('canvas');
let current_chart = null;

function update() {
    current_chart?.destroy();
    current_chart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: document
                .querySelectorAll('article')
                .values()
                .map(article => article.firstElementChild.textContent),
            datasets: [
                {
                    label: 'Monthly (USD)',
                    data: all_da_inputs.map(inputs => sum(inputs))
                }
            ]
        }
    });
}

// Whenever you input something, update donut chart
document.body.addEventListener('input', () => {
    update();
});
