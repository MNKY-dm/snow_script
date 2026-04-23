console.log("Extension [snow_script] chargée : OK");

let selectCategory = document.getElementById('incident.category');
let selectSubCategory = document.getElementById('incident.subcategory');
let selectItem = document.getElementById('incident.u_item');

let inputShortDescription = document.getElementById('incident.short_description');

function setShortDescription() {
    // console.log("setShortDescription en cours");
    let tab = inputShortDescription.value.split('- ');
    let shortDescription = tab[tab.length - 1];
    inputShortDescription.value = category + ' - ' + subCategory + ' - ' + item + ' - ' + CI + ' - ' + shortDescription;
    // console.log("finalshortdescription : " + finalShortDescription);
}

let shortDescription = ''
inputShortDescription.addEventListener('input', () => {
    shortDescription = inputShortDescription.value;
    // console.log("shortdescription : " + shortDescription)
    setShortDescription()
})
// console.log("getShortDescription OK");

let category = '';
selectCategory.addEventListener('change', () => {
    category = selectCategory.value;
    category = category.toUpperCase();
    // console.log("category : " + category)
    setShortDescription()
})
// console.log("getCategory OK");

let subCategory = ''
selectSubCategory.addEventListener('change', () => {
    subCategory = selectSubCategory.value;
    subCategory = subCategory.toUpperCase();
    // console.log("subcategory : " + subCategory)
    setShortDescription()
})
// console.log("getSubCategory OK");

let item = '';
selectItem.addEventListener('change', () => {
    item = selectItem.value;
    item = item.toUpperCase();
    // console.log("item : " + item)
    setShortDescription()
})
// console.log("getItem OK");

let CI = ''

const inputCIDisplay = document.getElementById('sys_display.incident.cmdb_ci');

function updateCIWhenReady() {
    const display = inputCIDisplay?.value?.trim() || '';

    if (!display) return

    CI = display.toUpperCase()
    console.log("CI : " + CI)
    console.log('sys_id = ' + display)
    setShortDescription()
}

inputCIDisplay.addEventListener('input', () => {
    setTimeout(()=>{
        updateCIWhenReady();
    }, 2500)
})



