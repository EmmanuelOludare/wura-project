const incomeInput = document.getElementById('gross-income');
const calculateBtn = document.querySelector('.calculate-btn');
const period = document.querySelector('#period');
const salary = document.getElementById('salary');
const incomeTax = document.getElementById('income-tax');
const netPay = document.getElementById('net-pay');
const periodOptions = document.querySelectorAll('option');
const timeName = document.querySelectorAll('.time-name');

function calculateIncomeTax() {
    if (!isNaN(incomeInput.value)) {
        for (let i = 0; i < periodOptions.length; i++) {
            if (periodOptions[i].value === period.value) {
                console.log(periodOptions[i].value);
            }
        }
        salary.textContent = incomeInput.value;
        let income = parseFloat(incomeInput.value);

        // Income tax calculation logic based on income ranges
        let taxRate = 0;
        if (income <= 300000) {
            taxRate = 0.01; // 1% incomeTax for income less than or equal to 300,000 NGN
        } else if (income <= 600000) {
            taxRate = 0.07; // 7% incomeTax for income between 300,001 and 600,000 NGN
        } else if (income <= 1100000) {
            taxRate = 0.11; // 11% incomeTax for income between 600,001 and 1,100,000 NGN
        } else if (income <= 1600000) {
            taxRate = 0.15; // 15% incomeTax for income between 1,100,001 and 1,600,000 NGN
        } else {
            taxRate = 0.19; // 19% incomeTax for income above 1,600,000 NGN
        }

        let annualIncomeTax = income * taxRate;
        let monthlyIncomeTax = annualIncomeTax / 12;
        let weeklyIncomeTax = annualIncomeTax / 52;
        let dailyIncomeTax = annualIncomeTax / 365;
        let hourlyIncomeTax = annualIncomeTax / (8 * 5 * 52);

        switch (period.value) {
            case 'annual':
                incomeTax.textContent = annualIncomeTax.toFixed(2);
                break;
            case 'monthly':
                incomeTax.textContent = monthlyIncomeTax.toFixed(2);
                break;
            case 'weekly':
                incomeTax.textContent = weeklyIncomeTax.toFixed(2);
                break;
            case 'day':
                incomeTax.textContent = dailyIncomeTax.toFixed(2);
                break;
            case 'hour':
                incomeTax.textContent = hourlyIncomeTax.toFixed(2);
                break;
        }

        netPay.textContent = (income - parseFloat(incomeTax.textContent)).toFixed(2);
    } else {
        alert('Please Input a Valid Gross Income!');
        incomeInput.value = '';
    }
}

calculateBtn.addEventListener('click', calculateIncomeTax);

period.addEventListener('change', function () {
    calculateIncomeTax();
});

for (let i = 0; i < timeName.length; i++) {
    timeName[i].addEventListener('click', function () {
        calculateIncomeTax();
    });
                    }
