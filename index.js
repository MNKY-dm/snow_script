console.log("Extension [snow_script] chargée : OK");

let selectCategory = document.getElementById('incident.category');
let selectSubCategory = document.getElementById('incident.subcategory');
let selectItem = document.getElementById('incident.u_item');
let inputCI = document.getElementById('incident.cmdb_ci');

let inputShortDescription = document.getElementById('incident.short_description');

function setShortDescription() {
    console.log("setShortDescription en cours");
    let finalShortDescription = category + ' - ' + subCategory + ' - ' + item + ' - ' + CI + ' - ' + shortDescription;
    console.log("finalshortdescription : " + finalShortDescription);
    inputShortDescription.value = finalShortDescription;
}

let shortDescription = ''
inputShortDescription.addEventListener('input', () => {
    shortDescription = inputShortDescription.value;
    console.log("shortdescription : " + shortDescription)
    setShortDescription()
})
console.log("getShortDescription OK");

let category = '';
selectCategory.addEventListener('change', () => {
    category = selectCategory.value;
    console.log("category : " + category)
    setShortDescription()
})
category = category.toUpperCase()
console.log("getCategory OK");

let subCategory = ''
selectSubCategory.addEventListener('change', () => {
    subCategory = selectSubCategory.value;
    console.log("subcategory : " + subCategory)
    setShortDescription()
})
subCategory = subCategory.toUpperCase();
console.log("getSubCategory OK");

let item = '';
selectItem.addEventListener('change', () => {
    item = selectItem.value;
    console.log("item : " + item)
    setShortDescription()
})
item = item.toUpperCase();
console.log("getItem OK");

let CI = ''
inputCI.addEventListener('input', () => {
    CI = selectItem.value;
    console.log("CI : " + CI)
    setShortDescription()
})
CI = CI.toUpperCase();
console.log("getCI OK");



