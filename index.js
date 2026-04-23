console.log('snow_script on ', location.href, 'readyState=', document.readyState)

console.log('incident.category + ', document.getElementById('incident.category'))
console.log('incident.subcategory + ', document.getElementById('incident.subcategory'))
console.log('incident.u_item + ', document.getElementById('incident.u_item'))
console.log('incident.short_description + ', document.getElementById('incident.short_description'))


let isInitialized = false
let retryId = null

function start() {
    if(location.protocol === 'about:') return
    if (isInitialized) return
    if (init()) return
    retryId = setTimeout(start, 1000)
}

function init() {
    let selectCategory = document.getElementById('incident.category');
    let selectSubCategory = document.getElementById('incident.subcategory');
    let selectItem = document.getElementById('incident.u_item');
    let inputShortDescription = document.getElementById('incident.short_description');


    if (!selectCategory) return false;
    else if (!selectSubCategory) return false;
    else if (!selectItem) return false;
    else if (!inputShortDescription) return false;

    else {
        isInitialized = true;
        if (retryId) clearTimeout(retryId);
        console.log("Extension [snow_script] chargée : OK pour " + location.href);

        // console.log('inputShortDescritption : ' + inputShortDescription);

        let shortDescription = ''
        inputShortDescription.addEventListener('input', () => {
            shortDescription = inputShortDescription.value;
            // console.log("shortdescription : " + shortDescription)
            setShortDescription(inputShortDescription, category, subCategory, item, CI)
        })
// console.log("getShortDescription OK");

        let category = '';
        selectCategory.addEventListener('change', () => {
            category = selectCategory.value;
            category = category.toUpperCase();
            // console.log("category : " + category)
            setShortDescription(inputShortDescription, category, subCategory, item, CI)
        })
// console.log("getCategory OK");

        let subCategory = ''
        selectSubCategory.addEventListener('change', () => {
            subCategory = selectSubCategory.value;
            subCategory = subCategory.toUpperCase();
            // console.log("subcategory : " + subCategory)
            setShortDescription(inputShortDescription, category, subCategory, item, CI)
        })
// console.log("getSubCategory OK");

        let item = '';
        selectItem.addEventListener('change', () => {
            item = selectItem.value;
            item = item.toUpperCase();
            // console.log("item : " + item)
            setShortDescription(inputShortDescription, category, subCategory, item, CI)
        })
// console.log("getItem OK");

        const inputCIDisplay = document.getElementById('sys_display.incident.cmdb_ci');
        let CI = ''
        
        inputCIDisplay.addEventListener('input', () => {
            setTimeout(()=>{
                const display = inputCIDisplay?.value?.trim() || '';


                CI = display.toUpperCase()
                console.log("CI : " + CI)
                console.log('sys_id = ' + display)
                setShortDescription(inputShortDescription, category, subCategory, item, CI)
            }, 2500)
        })

    }

    return true
}

function setShortDescription(inputShortDescription, category, subCategory, item, CI) {
    // console.log("setShortDescription en cours");
    let tab = inputShortDescription.value.split('- ');
    let shortDescription = tab[tab.length - 1];
    inputShortDescription.value = category + ' - ' + subCategory + ' - ' + item + ' - ' + CI + ' - ' + shortDescription;
    // console.log("finalshortdescription : " + finalShortDescription);
}

start()

