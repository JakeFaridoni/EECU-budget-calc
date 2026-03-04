import './navigation.js';

const income_input = /** @type {HTMLInputElement} */ (
    document.querySelector('input[placeholder=Income]')
);
const table = /** @type {HTMLTableElement} */ (
    document.querySelector('table.needs-wants-savings')
);

const estimated = /** @type {HTMLTableRowElement} */ (
    table.querySelector('tbody > tr')
);
const spent = /** @type {HTMLTableRowElement} */ (estimated.nextElementSibling);

let income = 0;
income_input.addEventListener('input', () => {
    income = +income_input.value;
    estimated.children.item(1).textContent = (income / 2).toFixed(2);
    estimated.children.item(2).textContent = (income * 0.3).toFixed(2);
    estimated.children.item(3).textContent = (income * 0.2).toFixed(2);
});

let spent_on_needs = 0;
let spent_on_wants = 0;
let spent_on_savings = 0;

const needs_values = new Map();
const wants_values = new Map();
const savings_values = new Map();

const needs = /** @type {NodeListOf<HTMLInputElement>} */ (
    document.querySelectorAll(
        ':is(#page-1, #page-2, #page-3, #page-4) > input:not([placeholder=Entertainment])'
    )
);

const wants = /** @type {NodeListOf<HTMLInputElement>} */ (
    document.querySelectorAll(
        'input[placeholder=Entertainment], #page-6 > input'
    )
);

const savings = /** @type {NodeListOf<HTMLInputElement>} */ (
    document.querySelectorAll('#page-5 > input')
);

for (const input of needs) {
    needs_values.set(input.placeholder, 0);
    input.addEventListener(
        'input',
        /** @type {InputEvent & { target: HTMLInputElement }} */ ({
            target
        }) => {
            needs_values.set(target.placeholder, +target.value);
            spent_on_needs = needs_values.values().reduce((a, b) => a + b, 0);
            spent.children.item(1).textContent = spent_on_needs.toFixed(2);
        }
    );
}

for (const input of wants) {
    wants_values.set(input.placeholder, 0);
    input.addEventListener(
        'input',
        (
            /** @type {InputEvent & { target: HTMLInputElement }} */ { target }
        ) => {
            wants_values.set(target.placeholder, +target.value);
            spent_on_wants = wants_values.values().reduce((a, b) => a + b, 0);
            spent.children.item(2).textContent = spent_on_wants.toFixed(2);
        }
    );
}

for (const input of savings) {
    savings_values.set(input.placeholder, 0);
    input.addEventListener(
        'input',
        /** @type {InputEvent & { target: HTMLInputElement }} */ ({
            target
        }) => {
            savings_values.set(target.placeholder, +target.value);
            spent_on_savings = savings_values
                .values()
                .reduce((a, b) => a + b, 0);
            spent.children.item(3).textContent = spent_on_savings.toFixed(2);
        }
    );
}
