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

        // Income tax calculation logic based on income ranges
        if (incomeInput.value <= 300000) {
            incomeTax.textContent = incomeInput.value * 0.01; // 1% incomeTax for income less than or equal to 300,000 NGN
        } else if (incomeInput.value <= 600000) {
            incomeTax.textContent = parseFloat((incomeInput.value - 300000) * 0.07).toFixed(2); // 7% incomeTax for income between 300,001 and 600,000 NGN
        } else if (incomeInput.value <= 1100000) {
            incomeTax.textContent = (300000 * 0.01) + ((incomeInput.value - 600000) * 0.11).toFixed(2); // 11% incomeTax for income between 600,001 and 1,100,000 NGN
        } else if (incomeInput.value <= 1600000) {
            incomeTax.textContent = (300000 * 0.01) + (500000 * 0.11) + ((incomeInput.value - 1100000) * 0.15).toFixed(2); // 15% incomeTax for income between 1,100,001 and 1,600,000 NGN
        } else {
            incomeTax.textContent = (300000 * 0.01) + (500000 * 0.11) + (500000 * 0.15) + ((incomeInput.value - 1600000) * 0.19).toFixed(2); // 19% incomeTax for income above 1,600,000 NGN
        }

        netPay.textContent = parseFloat(incomeInput.value) - parseFloat(incomeTax.textContent);

    } else {
        alert('Please Input a Valid Gross Income!')
        incomeInput.value = ''
    }
}

calculateBtn.addEventListener('click', calculateIncomeTax);

period.addEventListener('change', function () {
    calculateIncomeTax();
});

for (let i = 0; i < timeName.length; i++) {
    timeName[i].addEventListener('click', function () {
        const selectedTimePeriod = timeName[i].textContent.toLowerCase();
        const periodValue = period.value.toLowerCase();

        // Calculation logic based on selected time period
        switch (selectedTimePeriod) {
            case 'annual':
                if (periodValue === 'hour') {
                    salary.textContent = (incomeInput.value * 8 * 5 * 52).toFixed(2); // Convert hourly income to annual based on work hours
                } else if (periodValue === 'month') {
                    salary.textContent = (incomeInput.value * 12).toFixed(2); // Convert monthly income to annual
                } else if (periodValue === 'weekly') {
                    salary.textContent = (incomeInput.value * 52).toFixed(2); // Convert weekly income to annual
                } else if (periodValue === 'day') {
                    salary.textContent = (incomeInput.value * 365).toFixed(2); // Convert daily income to annual
                }
                break;
            case 'month':
                if (periodValue === 'hour') {
                    salary.textContent = (incomeInput.value * 8 * 5 * 4.345).toFixed(2); // Convert hourly income to monthly based on work hours
                } else if (periodValue === 'annual') {
                    salary.textContent = (incomeInput.value / 12).toFixed(2); // Convert annual income to monthly
                } else if (periodValue === 'weekly') {
                    salary.textContent = (incomeInput.value * 52 / 12).toFixed(2); // Convert weekly income to monthly
                } else if (periodValue === 'day') {
                    salary.textContent = (incomeInput.value * 365 / 12).toFixed(2); // Convert daily income to monthly
                }
                break;
            case 'weekly':
                if (periodValue === 'hour') {
                    salary.textContent = (incomeInput.value * 8 * 5).toFixed(2); // Convert hourly income to weekly based on work hours
                } else if (periodValue === 'annual') {
                    salary.textContent = (incomeInput.value / 52).toFixed(2); // Convert annual income to weekly
                } else if (periodValue === 'month') {
                    salary.textContent = (incomeInput.value * 12 / 52).toFixed(2); // Convert monthly income to weekly
                } else if (periodValue === 'day') {
                    salary.textContent = (incomeInput.value * 365 / 52).toFixed(2); // Convert daily income to weekly
                }
                break;
            case 'day':
                if (periodValue === 'hour') {
                    salary.textContent = (incomeInput.value * 8).toFixed(2); // Convert hourly income to daily based on work hours
                } else if (periodValue === 'annual') {
                    salary.textContent = (incomeInput.value / 365).toFixed(2); // Convert annual income to daily
                } else if (periodValue === 'month') {
                    salary.textContent = (incomeInput.value * 12 / 365).toFixed(2); // Convert monthly income to daily
                } else if (periodValue === 'weekly') {
                    salary.textContent = (incomeInput.value * 52 / 365).toFixed(2); // Convert weekly income to daily
                }
                break;
            case 'hour':
                if (periodValue === 'annual') {
                    salary.textContent = (incomeInput.value / (8 * 5 * 52)).toFixed(2); // Convert annual income to hourly based on work hours
                } else if (periodValue === 'month') {
                    salary.textContent = (incomeInput.value / (8 * 5 * 4.345)).toFixed(2); // Convert monthly income to hourly
                } else if (periodValue === 'weekly') {
                    salary.textContent = (incomeInput.value / (8 * 5)).toFixed(2); // Convert weekly income to hourly
                } else if (periodValue === 'day') {
                    salary.textContent = (incomeInput.value / 8).toFixed(2); // Convert daily income to hourly
                }
                break;
        }
    });
}
