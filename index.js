console.log("ok ma poule");
let inputFirstName = document.getElementById('firstname-aa0914db-0551-46e4-b85b-7a1902ff02d0');
let selectCountry = document.getElementById('phone_ext-aa0914db-0551-46e4-b85b-7a1902ff02d0');
let title = '';

let firstName = '';
let country = ''
inputFirstName.addEventListener('input', () => {
    firstName = inputFirstName.value;
    console.log(firstName)
})

selectCountry.addEventListener('change', () => {
    country = selectCountry.value;
    console.log(country)
    inputFirstName.value += country;
})
