// JS To switch between pages

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

next.addEventListener('click', () => {
    if (current_page >= form_count - 1) {
        return;
    }
    navigate(current_page + 1);
    if (current_page >= form_count) {
        next.classList.add('inactive');
    }
});

jumpto_section.addEventListener('click', event => {
    if (!(event.target instanceof HTMLButtonElement)) {
        return;
    }
    const page = +event.target.id.slice(5);
    navigate(page);
});

/**
 * @param {number} page
 */
function navigate(page) {
    if (current_page === page) {
        return;
    }
    current_page = page;
    for (const button of jumpto_section.children) {
        if (button.id === `step-${current_page}`) {
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
