
// when all the fields are filled, the calculate button will be enabled



const inputs = document.querySelectorAll('#year, #month, #day');
inputs.forEach(input => {
    input.addEventListener('input', checkInputs);
});

function checkInputs() {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
}

// when the calculate button is clicked, the calculateAge function will be called

document.getElementById('calculate').addEventListener('click', () => {
    calculateAge();
});

function calculateAge() {

    const userYear = parseInt(document.getElementById('year').value);
    const userMonth = parseInt(document.getElementById('month').value);
    const userDay = parseInt(document.getElementById('day').value);
    
    // checking if the user has filled all the fields
    if (!userYear || !userMonth || !userDay) {
        alert('Please fill all the fields');
        resetFields();
        return;
    }
    
    // getting the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is 0
    const currentDay = currentDate.getDate();

    // checking if the date is in the future
    const inputDate = new Date(userYear, userMonth - 1, userDay);
    if (inputDate > currentDate) {
        alert('The date entered is in the future. Please enter a valid date.');
        resetFields();
        return;
    }
    
    // calculating the age
    let age = currentYear - userYear;
    let ageMonth = currentMonth - userMonth;
    let ageDay = currentDay - userDay;
    
    // checking if the user's birthday has already happened this year
    if (ageDay < 0) {
        ageMonth--; 
        ageDay += 30; 
    }
    
    if (ageMonth < 0) {
        age--;
        ageMonth += 12;
    }
    
    // creating conditions to display the age
    if (!isValidDate(userYear, userMonth, userDay, currentYear)){
        return;
    }
    
    updateAgeDisplay(age, ageMonth, ageDay);
    console.log(`age: ${age}, month: ${ageMonth}, day: ${ageDay}`);
}

    // creating a function to reset the fields
    function resetFields() {
        document.getElementById('year').value = '';
        document.querySelector('.yearAge').innerHTML = '--';
        document.getElementById('month').value = '';
        document.querySelector('.monthAge').innerHTML = '--';
        document.getElementById('day').value = '';
        document.querySelector('.daysAge').innerHTML = '--';
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // creating a function to validate the date
    function isValidDate(year, month, day, currentYear) {
        let isValid = true;

    if (day < 1 || day > 31) {
        console.log('Invalid day');
        document.getElementById('input-group-day').classList.add('error');
        isValid = false;
    } else if (month === 2 && day > (isLeapYear(year) ? 29 : 28)) {
        console.log('Invalid day for February');
        document.getElementById('input-group-day').classList.add('error');
        alert('Sorry, in this year February has only 28 days...');
        isValid = false;
    } else if ([4, 6, 9, 11].includes(month) && day > 30) {
        console.log('this day is not valid for this month');
        document.getElementById('input-group-day').classList.add('error');
        alert('Sorry, this month has only 30 days...');
        isValid = false;
    } else {
        document.getElementById('input-group-day').classList.remove('error');
    }

    if (month < 1 || month > 12) {
        console.log('Invalid month');
        document.getElementById('input-group-month').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('input-group-month').classList.remove('error');
    }

    if (year >currentYear) {
        console.log('Invalid year');
        document.getElementById('input-group-year').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('input-group-year').classList.remove('error');
    }
    
    return isValid;

}

// updating the display with the age calculated
function updateAgeDisplay(age, ageMonth, ageDay) {
    document.querySelector('.yearAge').innerHTML = age;
    document.querySelector('.monthAge').innerHTML = ageMonth;
    document.querySelector('.daysAge').innerHTML = ageDay;
}