import './navigation.js';

//Const List
const salary = document.getElementById('grossSalary');
const monthly_salary = document.getElementById('monthlySalary');
let income = parseFloat(salary.value) || 0;
const table = document.querySelector('table.needs-wants-savings');
const netIncome = document.querySelector("#netIncome");
const estimated = table.querySelector('tbody > tr');
const spent = estimated.nextElementSibling;
let total_spent = 0;

//Housing Variables
const mortage = document.querySelector('input[placeholder="Mortage"]');
const rent = document.querySelector('input[placeholder="Rent"]');
const maintenance = document.querySelector('input[placeholder="Maintenance"]');
const houseInsurance = document.querySelector('input[placeholder="House Insurance"]');
const utilities = document.querySelector('input[placeholder="Utilities"]');
const phone = document.querySelector('input[placeholder="Phone"]');
let housingTotal = 0;

//Transportation Variables
const carPayment = document.querySelector('input[placeholder="Car Payment"]');
const fuel = document.querySelector('input[placeholder="Fuel"]');
const carInsurance = document.querySelector('input[placeholder="Car Insurance"]');
const repairs = document.querySelector('input[placeholder="Repairs"]');
let transportationTotal = 0;

//Education Variables
const tuition = document.querySelector('input[placeholder="Tuition"]');
const studentLoans = document.querySelector('input[placeholder="Student Loans"]');
let educationTotal = 0;

//Personal Variables
const food = document.querySelector('input[placeholder="Food"]');
const entertainment = document.querySelector('input[placeholder="Entertainment"]');
const clothing = document.querySelector('input[placeholder="Clothing"]');
const medical = document.querySelector('input[placeholder="Medical"]');
let personalTotal = 0;

//Savings Variables
const investments = document.querySelector('input[placeholder="Investments"]');
const retirement = document.querySelector('input[placeholder="Retirement"]');
const emergencyFund = document.querySelector('input[placeholder="Emergency Fund"]');
let savingsTotal = 0;

const customExpenses = document.querySelectorAll('input[placeholder="Custom"]');

addEventListener('input', () => {
    // 50-30-20 split
    estimated.children.item(1).textContent = (income * 0.5).toFixed(2);
    estimated.children.item(2).textContent = (income * 0.3).toFixed(2);
    estimated.children.item(3).textContent = (income * 0.2).toFixed(2);

    // find totals
    housingTotal = parseFloat(mortage.value || 0) + parseFloat(rent.value || 0) + parseFloat(maintenance.value || 0) + parseFloat(houseInsurance.value || 0) + parseFloat(utilities.value || 0) + parseFloat(phone.value || 0);
    transportationTotal = parseFloat(carPayment.value || 0) + parseFloat(fuel.value || 0) + parseFloat(carInsurance.value || 0) + parseFloat(repairs.value || 0);
    educationTotal = parseFloat(tuition.value || 0) + parseFloat(studentLoans.value || 0);
    personalTotal = parseFloat(food.value || 0) + parseFloat(entertainment.value || 0) + parseFloat(clothing.value || 0) + parseFloat(medical.value || 0);
    savingsTotal = parseFloat(investments.value || 0) + parseFloat(retirement.value || 0) + parseFloat(emergencyFund.value || 0);

    // total spent
    total_spent = housingTotal + educationTotal + transportationTotal + personalTotal + savingsTotal;
});

// Categorizing input fields per page based on whether they fill out wants, needs, or savings
const needs = /** @type {NodeListOf<HTMLInputElement>} */ (
    document.querySelectorAll('.need-input')
);

const wants = /** @type {NodeListOf<HTMLInputElement>} */ (
    document.querySelectorAll('.want-input')
);


const savings = /** @type {NodeListOf<HTMLInputElement>} */ (
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

//API Career List
async function careerSelector() {
    const selectElement = document.getElementById('career-list');
    const occupationSalaryMap = new Map();

    try {
        const response = await fetch('https://eecu-data-server.vercel.app/data');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const users = await response.json();

        users.forEach(user => {
            occupationSalaryMap.set(user["Occupation"], user["Salary"]);
            const option = new Option(user["Occupation"], user["Occupation"]);
            selectElement.add(option);
        });

        selectElement.addEventListener('change', () => {
            income = occupationSalaryMap.get(selectElement.value);
            salary.textContent = `Gross Salary: $${income}` || '';

            let monthly_income = Math.floor(income / 12).toFixed(2);
            monthly_salary.textContent = `Monthly Salary: $${monthly_income}` || '';

            // net income
            const net = Math.floor(income - total_spent).toFixed(2);
            if (net > 0) {
                netIncome.classList.remove('negative');
                netIncome.classList.add('positive');
            } else if (net < 0) {
                netIncome.classList.remove('positive');
                netIncome.classList.add('negative');
            } else {
                netIncome.classList.remove('positive', 'negative');
            }
            netIncome.textContent = `${net}`;
        });
    } catch (error) {
        console.error('Error populating user select:', error);
    }
}

careerSelector();

//Pie Chart

const canvas = document.querySelector('#chartCanvas');
let current_chart = null;

function buildChartConfig() {
    const taxes = income * 0.1;
    return {
        type: 'doughnut',
        data: {
            labels: ['Taxes', 'Housing', 'Transportation', 'Education', 'Personal', 'Savings'],
            datasets: [{
                label: 'Monthly (USD)',
                data: [taxes, housingTotal, transportationTotal, educationTotal, personalTotal, savingsTotal],
                backgroundColor: ['#8979FF', '#FF928A', '#3CC3DF', '#FFAE4C', '#537FF1', '#4CAF50']
            }]
        },
        options: {
            animation: false,
            plugins: {
                title: { display: true, text: 'Spending Overview' }

            }
        }
    };
}

function refreshChart() {
    if (current_chart) {
        current_chart.destroy();
    }
    current_chart = new Chart(canvas.getContext('2d'), buildChartConfig());
}

document.body.addEventListener('input', refreshChart);

refreshChart(); // initial render