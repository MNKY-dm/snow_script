console.log("Extension [snow_script] chargée : OK");

let selectCategory = document.getElementById('incident.category');
let selectSubCategory = document.getElementById('incident.subcategory');
let selectItem = document.getElementById('incident.u_item');
let inputCI = document.querySelector('#sys_display\\.incident\\.cmdb_ci');

let inputShortDescription = document.getElementById('incident.short_description');

function setShortDescription() {
    // console.log("setShortDescription en cours");
    let tab = inputShortDescription.value.split('- ');
    let shortDescription = tab[tab.length - 1];
    let finalShortDescription = category + ' - ' + subCategory + ' - ' + item + ' - ' + CI + ' - ' + shortDescription;
    // console.log("finalshortdescription : " + finalShortDescription);
    inputShortDescription.value = finalShortDescription;
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
inputCI.addEventListener('input', () => {
    setTimeout(() => {
        CI = inputCI.value;
        CI = CI.toUpperCase();
        setShortDescription()
        console.log("CI : " + CI)
    }, 1000)
    // setShortDescription()
})
// console.log("getCI OK");



