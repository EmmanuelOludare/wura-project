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
        salary.textContent = incomeInput.value;

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
});

for (let i = 0; i < timeName.length; i++) {
    timeName[i].addEventListener('click', function () {
        const selectedTimePeriod = timeName[i].textContent.toLowerCase();
        const periodValue = period.value.toLowerCase();

        // Calculate the effective number of work hours in a year
        const workHoursPerWeek = 8 * 5; // 8 hours per day, 5 days a week
        const workWeeksPerYear = 52; // Assuming 52 weeks in a year
        const totalWorkHoursPerYear = workHoursPerWeek * workWeeksPerYear;

        if (selectedTimePeriod === periodValue) {
            salary.textContent = incomeInput.value;
        } else {
            switch (selectedTimePeriod) {
                case 'annual':
                    if (periodValue === 'hour') {
                        salary.textContent = (incomeInput.value * totalWorkHoursPerYear).toFixed(2); // Convert hourly income to annual based on work hours
                    } else if (periodValue === 'month') {
                        salary.textContent = (incomeInput.value * totalWorkHoursPerYear / 12).toFixed(2); // Convert monthly income to annual based on work hours
                    } else {
                        salary.textContent = incomeInput.value * 12; // Convert other periods to annual
                    }
                    break;
                case 'month':
                    if (periodValue === 'hour') {
                        salary.textContent = (incomeInput.value * 173.33).toFixed(2); // Convert hourly income to monthly based on work hours
                    } else if (periodValue === 'annual') {
                        salary.textContent = (incomeInput.value / 12).toFixed(2); // Convert annual income to monthly based on work hours
                    } else {
                        salary.textContent = incomeInput.value; // Display other periods directly
                    }
                    break;
                case 'weekly':
                    if (periodValue === 'hour') {
                        salary.textContent = (incomeInput.value * 40).toFixed(2); // Convert hourly income to weekly based on work hours
                    } else {
                        salary.textContent = (incomeInput.value / 52).toFixed(2); // Convert annual/monthly/daily income to weekly
                    }
                    break;
                case 'day':
                    if (periodValue === 'hour') {
                        salary.textContent = (incomeInput.value * 8).toFixed(2); // Convert hourly income to daily based on work hours
                    } else {
                        salary.textContent = (incomeInput.value / 365).toFixed(2); // Convert annual/monthly/weekly income to daily
                    }
                    break;
                case 'hour':
                    if (periodValue === 'annual') {
                        salary.textContent = (incomeInput.value / totalWorkHoursPerYear).toFixed(2); // Convert hourly income to daily based on work hours
                    } else {
                        salary.textContent = (incomeInput.value / 365).toFixed(2); // Convert annual/monthly/weekly income to daily
                    }
                    break;
            }
        }
    });
}
