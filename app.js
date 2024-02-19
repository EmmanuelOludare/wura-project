const incomeInput = document.getElementById('gross-income');
const calculateBtn = document.querySelector('.calculate-btn');
const period = document.querySelector('#period');
const salary = document.getElementById('salary');
const incomeTax = document.getElementById('income-tax');
const netPay = document.getElementById('net-pay');
const periodOptions = document.querySelectorAll('option');
const timeName = document.querySelectorAll('.time-name');

calculateBtn.addEventListener('click', function () {
    if (!isNaN(incomeInput.value)) {
        for (let i = 0; i < periodOptions.length; i++) {
            if (periodOptions[i].value === period.value) {
                console.log(periodOptions[i].value);
            }
        }
        calculateTaxAndNetPay();
    } else {
        alert('Please Input a Valid Gross Income!');
        incomeInput.value = '';
    }
});

function calculateTaxAndNetPay() {
    salary.textContent = incomeInput.value;
    let tax = 0;
    const income = parseFloat(incomeInput.value);
    if (income <= 300000) {
        tax = income * 0.01; // 1% incomeTax for income less than or equal to 300,000 NGN
    } else if (income <= 1500000) {
        tax = (300000 * 0.01) + ((income - 300000) * 0.07); // 7% incomeTax for income between 300,001 and 1,500,000 NGN
    } else if (income <= 3000000) {
        tax = (300000 * 0.01) + (1200000 * 0.07) + ((income - 1500000) * 0.15); // 15% incomeTax for income between 1,500,001 and 3,000,000 NGN
    } else {
        tax = (300000 * 0.01) + (1200000 * 0.07) + (1500000 * 0.15) + ((income - 3000000) * 0.24); // 24% incomeTax for income above 3,000,000 NGN
    }
    incomeTax.textContent = tax.toFixed(2);
    netPay.textContent = (income - tax).toFixed(2);
}

for (let i = 0; i < timeName.length; i++) {
    timeName[i].addEventListener('click', function () {
        const selectedTimePeriod = timeName[i].textContent.toLowerCase();
        const periodValue = period.value.toLowerCase();
        if (selectedTimePeriod === periodValue) {
            salary.textContent = incomeInput.value;
        } else {
            switch (selectedTimePeriod) {
                case 'annual':
                    convertToAnnual(periodValue);
                    break;
                case 'monthly':
                    convertToMonthly(periodValue);
                    break;
                case 'weekly':
                    convertToWeekly(periodValue);
                    break;
                case 'daily':
                    convertToDaily(periodValue);
                    break;
                case 'hourly':
                    convertToHourly(periodValue);
                    break;
            }
        }
    });
}

function convertToAnnual(periodValue) {
    if (periodValue === 'monthly') {
        salary.textContent = (incomeInput.value * 12).toFixed(2);
    } else if (periodValue === 'weekly') {
        salary.textContent = (incomeInput.value * 52).toFixed(2);
    } else if (periodValue === 'daily') {
        salary.textContent = (incomeInput.value * 365).toFixed(2);
    } else if (periodValue === 'hourly') {
        salary.textContent = (incomeInput.value * 8 * 5 * 52).toFixed(2); // Assuming 8 hours per day, 5 days a week, 52 weeks a year
    }
    calculateTaxAndNetPay();
}

function convertToMonthly(periodValue) {
    if (periodValue === 'annual') {
        salary.textContent = (incomeInput.value / 12).toFixed(2);
    } else if (periodValue === 'weekly') {
        salary.textContent = (incomeInput.value * 52 / 12).toFixed(2);
    } else if (periodValue === 'daily') {
        salary.textContent = (incomeInput.value * 365 / 12).toFixed(2);
    } else if (periodValue === 'hourly') {
        salary.textContent = (incomeInput.value * 8 * 5).toFixed(2); // Assuming 8 hours per day, 5 days a week
    }
    calculateTaxAndNetPay();
}

function convertToWeekly(periodValue) {
    if (periodValue === 'annual') {
        salary.textContent = (incomeInput.value / 52).toFixed(2);
    } else if (periodValue === 'monthly') {
        salary.textContent = (incomeInput.value * 12 / 52).toFixed(2);
    } else if (periodValue === 'daily') {
        salary.textContent = (incomeInput.value * 365 / 52).toFixed(2);
    } else if (periodValue === 'hourly') {
        salary.textContent = (incomeInput.value * 8).toFixed(2); // Assuming 8 hours per day
    }
    calculateTaxAndNetPay();
}

function convertToDaily(periodValue) {
    if (periodValue === 'annual') {
        salary.textContent = (incomeInput.value / 365).toFixed(2);
    } else if (periodValue === 'monthly') {
        salary.textContent = (incomeInput.value * 12 / 365).toFixed(2);
    } else if (periodValue === 'weekly') {
        salary.textContent = (incomeInput.value * 52 / 365).toFixed(2);
    } else if (periodValue === 'hourly') {
        salary.textContent = (incomeInput.value * 8).toFixed(2); // Assuming 8 hours per day
    }
    calculateTaxAndNetPay();
}

function convertToHourly(periodValue) {
    if (periodValue === 'annual') {
        salary.textContent = (incomeInput.value / (8 * 5 * 52)).toFixed(2); // Assuming 8 hours per day, 5 days a week, 52 weeks a year
    } else {
        salary.textContent = (incomeInput.value / (8 * 5)).toFixed(2); // Assuming 8 hours per day, 5 days a week
    }
    calculateTaxAndNetPay();
}
