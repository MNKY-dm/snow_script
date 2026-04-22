console.log("Extension [snow_script] chargée : OK");

let selectCategory = document.getElementById('incident.category');
let selectSubCategory = document.getElementById('incident.subcategory');
let selectItem = document.getElementById('incident.u_item');
let inputCI = document.getElementById('incident.cmdb_ci');

let inputShortDescription = document.getElementById('incident.short_description');



function getShortDescription() {
    let shortDescription = ''
    inputShortDescription.addEventListener('input', () => {
        shortDescription = inputShortDescription.value;
        console.log("shortdescription : " + shortDescription)
    })
    return shortDescription;
}

function getCategory() {
    let category = '';
    selectCategory.addEventListener('change', () => {
        category = selectCategory.value;
        console.log("category : " + category)
    })
    return category
}

function getSubCategory() {
    let subCategory = ''
    selectSubCategory.addEventListener('change', () => {
        subCategory = selectSubCategory.value;
        console.log("subcategory : " + subCategory)
    })
    return subCategory;
}

function getItem() {
    let item = '';
    selectItem.addEventListener('change', () => {
        item = selectItem.value;
        console.log("item : " + item)
    })
    return item;
}

function getCI() {
    let CI = ''
    inputCI.addEventListener('input', () => {
        CI = selectItem.value;
        console.log("CI : " + CI)
    })
    return CI;
}

function setShortDescription() {
    let shortDescription = getShortDescription();
    let category = getCategory().toUpperCase();
    let subCategory = getSubCategory().toUpperCase();
    let item = getItem().toUpperCase();
    let CI = getCI().toUpperCase();

    let finalShortDescription = category + ' - ' + subCategory + ' - ' + item + ' - ' + CI + ' - ' + shortDescription;
    inputShortDescription.value = finalShortDescription;
}

setShortDescription()

