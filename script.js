// -- Consts & Variables --

// Landing Page 
const salary = document.getElementById('grossSalary');
const monthly_salary = document.getElementById('monthlySalary');
const table = document.querySelector('table.needs-wants-savings');
const netIncome = document.querySelector("#netIncome");
const estimated = table.querySelector('tbody > tr');
const spent = estimated.nextElementSibling;
let total_spent = 0;
let income = parseFloat(salary.value) || 0;

// Housing Page
const mortage = document.querySelector('input[placeholder="Mortage"]');
const rent = document.querySelector('input[placeholder="Rent"]');
const maintenance = document.querySelector('input[placeholder="Maintenance"]');
const houseInsurance = document.querySelector('input[placeholder="House Insurance"]');
const utilities = document.querySelector('input[placeholder="Utilities"]');
const phone = document.querySelector('input[placeholder="Phone"]');
let housingTotal = 0;

// Transportation Page
const carPayment = document.querySelector('input[placeholder="Car Payment"]');
const fuel = document.querySelector('input[placeholder="Fuel"]');
const carInsurance = document.querySelector('input[placeholder="Car Insurance"]');
const repairs = document.querySelector('input[placeholder="Repairs"]');
let transportationTotal = 0;

// Education Page
const tuition = document.querySelector('input[placeholder="Tuition"]');
const studentLoans = document.querySelector('input[placeholder="Student Loans"]');
let educationTotal = 0;

// Personal Page
const food = document.querySelector('input[placeholder="Food"]');
const entertainment = document.querySelector('input[placeholder="Entertainment"]');
const clothing = document.querySelector('input[placeholder="Clothing"]');
const medical = document.querySelector('input[placeholder="Medical"]');
let personalTotal = 0;

// Savings Page
const investments = document.querySelector('input[placeholder="Investments"]');
const retirement = document.querySelector('input[placeholder="Retirement"]');
const emergencyFund = document.querySelector('input[placeholder="Emergency Fund"]');
let savingsTotal = 0;

// Navigation Consts & Variables
let current_page = 0;
const jumpto_section = /** @type {HTMLElement} */ (
    document.querySelector('section.stepContainer')
);
const forms = /** @type {HTMLElement} */ (
    document.querySelector('section#forms')
);
const form_count = forms.querySelectorAll('form').length;
const next = /** @type {HTMLButtonElement} */ (
    document.querySelector('#nextForm')
);
const back = /** @type {HTMLButtonElement} */ (
    document.querySelector('#backForm')
);
const button_divider = /** @type {HTMLSpanElement} */ (
    document.querySelector('#button-divider')
);

// -- Navigation --

// Switches to next page when next btn is clicked
next.addEventListener('click', () => {
    if (current_page >= form_count - 1) {
        return;
    }
    navigate(current_page + 1);
    if (current_page >= form_count - 1) {
        next.classList.add('inactive');
        button_divider.classList.add('inactive');
    } else {
        back.classList.remove('inactive');
        button_divider.classList.remove('inactive');
    }
});


// Switches to previous page when back button is pushed
back.addEventListener('click', () => {
    if (current_page <= 0) {
        return;
    }
    navigate(current_page - 1);
    if (!current_page) {
        back.classList.add('inactive');
        button_divider.classList.add('inactive');
    }
    else {
        next.classList.remove('inactive');
        button_divider.classList.remove('inactive');
    }
});

// Jumps to page when page btn is pushed
jumpto_section.addEventListener('click', event => {
    if (!(event.target instanceof HTMLButtonElement)) {
        return;
    }
    const page = +event.target.id.slice(5);
    navigate(page);
});

// navigate helper function to navigate to different pages
/**
 * @param {number} page
 */
function navigate(page) {
    if (current_page === page) {
        return;
    }
    current_page = page;
    for (const button of jumpto_section.children) {
        if (button.id <= `step-${current_page}`) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
    for (const form of forms.children) {
        if (!(form instanceof HTMLFormElement)) {
            continue;
        }
        if (form.classList.contains(`page-${current_page}`)) {
            form.classList.remove('inactive');
            form.classList.add('active');
        } else {
            form.classList.remove('active');
            form.classList.add('inactive');
        }
    }
}

// -- Inputs --

addEventListener('input', () => {
    housingTotal = parseFloat(mortage.value || 0) + parseFloat(rent.value || 0) + parseFloat(maintenance.value || 0) + parseFloat(houseInsurance.value || 0) + parseFloat(utilities.value || 0) + parseFloat(phone.value || 0);
    transportationTotal = parseFloat(carPayment.value || 0) + parseFloat(fuel.value || 0) + parseFloat(carInsurance.value || 0) + parseFloat(repairs.value || 0);
    educationTotal = parseFloat(tuition.value || 0) + parseFloat(studentLoans.value || 0);
    personalTotal = parseFloat(food.value || 0) + parseFloat(entertainment.value || 0) + parseFloat(clothing.value || 0) + parseFloat(medical.value || 0);
    savingsTotal = parseFloat(investments.value || 0) + parseFloat(retirement.value || 0) + parseFloat(emergencyFund.value || 0);

    // Update total spent
    total_spent = housingTotal + educationTotal + transportationTotal + personalTotal + savingsTotal;

    updateNetIncome();
    saveInputs();
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
                spent.children.item(columnIndex).textContent = spent_on_category ? `-$${Math.floor(spent_on_category).toFixed(2)}` : '-$0.00';
            }
        );
    }
}

makeInputsWork(needs, needs_values, spent_on_needs, 1);
makeInputsWork(wants, wants_values, spent_on_wants, 2);
makeInputsWork(savings, savings_values, spent_on_savings, 3);

// -- Career --

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

        const savedCareer = localStorage.getItem('career');
        if (savedCareer) {
            const match = [...selectElement.options].find(option => option.value === savedCareer);
            if (match) {
                selectElement.value = savedCareer;
                selectElement.dispatchEvent(new Event('change'));
                updateNetIncome();
            }
        }

        selectElement.addEventListener('change', () => {
            income = occupationSalaryMap.get(selectElement.value);
            salary.textContent = income ? `Gross Salary: $${income}` : 'Gross Salary: $0';

            let monthly_income = Math.floor(income / 12).toFixed(2);
            monthly_salary.textContent = income ? `Monthly Salary: $${monthly_income}` : 'Monthly Salary: $0';

            updateNetIncome();
            saveInputs();

            // 50-30-20 split
            estimated.children.item(1).textContent = Math.floor(((income - taxCalc(income)) * 0.5)).toFixed(2);
            estimated.children.item(2).textContent = Math.floor(((income - taxCalc(income)) * 0.3)).toFixed(2);
            estimated.children.item(3).textContent = Math.floor(((income - taxCalc(income)) * 0.2)).toFixed(2);
        });
    } catch (error) {
        console.error('Error populating user select:', error);
    }
}

// Scuffed but fixes the Gross/Monthly salary updating
careerSelector().then(() => {
    loadInputs();
    careerSelector();
});

// -- Net Income --

function updateNetIncome() {
    // net income
    const net = (income - total_spent - taxCalc(income)) ? Math.floor(income - total_spent - taxCalc(income)).toFixed(2) : '0.00';

    // Changes styling based on net income
    if (net > 0) {
        netIncome.classList.remove('negative');
        netIncome.classList.add('positive');
        if (netIncome) netIncome.textContent = `$${net}`;
    } else if (net < 0) {
        netIncome.classList.remove('positive');
        netIncome.classList.add('negative');
        if (netIncome) netIncome.textContent = `-$${net * -1}`;
    } else {
        netIncome.classList.remove('positive', 'negative');
    }

    // Update chart
    refreshChart();
};

// -- Taxes --

// Taxes Calculations
function taxCalc(income) {
    // Non-deductable
    const taxable_income = (income - 16100) > 0 ? income - 16100 : 0;

    // Flat rates
    const medical_tax = income * 0.0145;
    const social_sec = income * 0.062;
    const state_tax = income * 0.04;

    const flat_tax = medical_tax + social_sec + state_tax;

    // Progressive taxes
    income = 100000;
    let progressive_tax = 0;
    if (taxable_income > 50400) {
        progressive_tax = taxable_income * 0.44;
    } else if (taxable_income >= 12401) {
        progressive_tax = taxable_income * 0.22;
    } else {
        progressive_tax = taxable_income * 0.1;
    }
    return progressive_tax + flat_tax;
};


// -- Pie Chart --
const canvas = document.querySelector('#chartCanvas');
let current_chart = null;

function buildChartConfig() {
    const taxes = taxCalc(income);
    let dataset = [taxes, housingTotal, transportationTotal, educationTotal, personalTotal, savingsTotal];
    dataset = dataset.reduce((a, b) => a + b) ? [taxes, housingTotal, transportationTotal, educationTotal, personalTotal, savingsTotal] : 0;
    return {
        type: 'doughnut',
        data: {
            labels: ['Taxes', 'Housing', 'Transportation', 'Education', 'Personal', 'Savings'],
            datasets: [{
                label: 'Monthly (USD)',
                data: dataset,
                backgroundColor: ['#8979FF', '#FF928A', '#3CC3DF', '#FFAE4C', '#537FF1', '#4CAF50']
            }]
        },
        options: {
            animation: false,
            plugins: {
                title: { display: true, text: 'Spending Overview' },
                legend: {
                    display: dataset
                }
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

// Render Chart
refreshChart();

// -- localStorage --

function saveInputs() {
    const inputs = document.querySelectorAll('input[type="number"]');
    // Empty array --> populate with saved inputs names & values
    const saved = {};
    for (const input of inputs) {
        if (input.placeholder) {
            saved[input.placeholder] = input.value;
        }
    }

    // Saves inputs and  the currently selected page to local storage
    localStorage.setItem('inputs', JSON.stringify(saved));
    localStorage.setItem('income', income);
    localStorage.setItem('career', (document.getElementById('career-list')).value);
    localStorage.setItem('page', current_page);

}

function loadInputs() {
    // Grabs inputs and page from local storage
    const savedInputs = localStorage.getItem('inputs');
    const savedIncome = localStorage.getItem('income');
    const savedPage = localStorage.getItem('page');

    // Updates income from local storage
    if (savedIncome) {
        income = parseFloat(savedIncome);
    }

    // Populates input fields with inputs from local storage
    if (savedInputs) {
        const input_values = JSON.parse(savedInputs);
        const inputs = document.querySelectorAll('input[type="number"]');

        for (const input of inputs) {
            if (input_values[input.placeholder]) {
                input.value = input_values[input.placeholder];
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    }

    // Changes page to saved page
    if(savedPage) {
        navigate(parseInt(savedPage));
    }

    // Performs net income calc & refreshes chart
    updateNetIncome();
}