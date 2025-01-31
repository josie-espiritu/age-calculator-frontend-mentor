const dayInput = document.querySelector('.input__text--day')
const dayLabel = document.querySelector('.label__text--day')
const dayErrorMessage = document.querySelector('#error--day')

const monthInput = document.querySelector('.input__text--month')
const monthLabel = document.querySelector('.label__text--month')
const monthErrorMessage = document.querySelector('#error--month')

const yearInput = document.querySelector('.input__text--year')
const yearLabel = document.querySelector('.label__text--year')
const yearErrorMessage = document.querySelector('#error--year')
const submitBtn = document.querySelector('#btn__enter')

const outputYear = document.getElementById('output__years')
const outputMonth = document.getElementById('output__months')
const outputDay = document.getElementById('output__days')

const currentDate = new Date()
let hasError = false


submitBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    let day = dayInput.value
    let month = monthInput.value
    let year = yearInput.value

    let hasError = false

  
    outputYear.textContent = '--'
    outputMonth.textContent = '--'
    outputDay.textContent = '--'

    dayInput.classList.remove('error')
    dayLabel.classList.remove('error')
    dayErrorMessage.textContent = ''
    dayErrorMessage.style.display = 'none'
    monthInput.classList.remove('error')
    monthLabel.classList.remove('error')
    monthErrorMessage.textContent = ''
    monthErrorMessage.style.display = 'none'
    yearInput.classList.remove('error')
    yearLabel.classList.remove('error')
    yearErrorMessage.textContent = ''
    yearErrorMessage.style.display = 'none'


    if(day === ''){
        dayInput.classList.add('error')
        dayLabel.classList.add('error')
        dayErrorMessage.textContent = 'This field is required!'
        dayErrorMessage.style.display = 'block'
        hasError = true
    }
    else if (isNaN(day) || parseInt(day) > 31 || parseInt(day) < 1){
        dayInput.classList.add('error')
        dayLabel.classList.add('error')
        dayErrorMessage.textContent = 'Must be a valid day'
        dayErrorMessage.style.display = 'block'
        hasError = true
    }

    if(month === ''){
        monthInput.classList.add('error')
        monthInput.classList.add('error')
        monthErrorMessage.textContent = 'This field is required!'
        monthErrorMessage.style.display = 'block'
        hasError = true
    }
    else if (isNaN(month) || parseInt(month) > 12 || parseInt(month) < 1){
        monthInput.classList.add('error')
        monthLabel.classList.add('error')
        monthErrorMessage.textContent = 'Must be a valid month'
        monthErrorMessage.style.display = 'block'
        hasError = true
    }

    if(year === ''){
        yearInput.classList.add('error')
        yearInput.classList.add('error')
        yearErrorMessage.textContent = 'This field is required!'
        yearErrorMessage.style.display = 'block'
        hasError = true
    }
    else if (isNaN(year) || parseInt(year) > currentDate.getFullYear() || parseInt(year) < 1900){
        yearInput.classList.add('error')
        yearLabel.classList.add('error')
        yearErrorMessage.textContent = 'Must be in the past'
        yearErrorMessage.style.display = 'block'
        hasError = true
    }

    day = parseInt(day)
    month = parseInt(month)
    year = parseInt(year)

    // checks if the inputs is a valid date

    if(!hasError){
        const testDate = new Date(year,month - 1, day)
        if(
            testDate.getFullYear() !== year ||
            testDate.getMonth() !== month - 1 ||
            testDate.getDate() !== day
        ){
            [dayInput,dayLabel,monthInput,monthLabel,yearInput,yearLabel].forEach(element => (element.classList.add('error')))
            dayErrorMessage.textContent = 'Must be a valid a date'
           dayErrorMessage.style.display = 'block'
           hasError = true
        }
        
    }

    // check if has error then updates outputs and stops the code
    if (hasError){
        outputYear.textContent = '--'
            outputMonth.textContent = '--'
            outputDay.textContent = '--'
            return
       }


    //    calculating age 

    day = currentDate.getDate() - day
    month = currentDate.getMonth() - (month - 1)
    year = currentDate.getFullYear() - year

    if(day < 0){
        month -= 1
        const prevMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        )
        day += prevMonth.getDate()
    }

    if(month < 0){
        year -= 1
        month += 12
    }

    animateNumber('output__years', year);
    animateNumber('output__months', month);
    animateNumber('output__days', day);
})


function animateNumber(id, targetValue) {
    let start = 0;
    const duration = 2000; 
    const increment = Math.ceil(targetValue / (duration / 16)); 
    const element = document.getElementById(id);

    function updateNumber() {
        if (start < targetValue) {
            start += increment;
            if (start > targetValue) start = targetValue;
            element.textContent = start;
            requestAnimationFrame(updateNumber);
        }
    }
    updateNumber();
}
