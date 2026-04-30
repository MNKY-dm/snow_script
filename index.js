console.log('snow_script on : ', location.href, ' ; readyState=', document.readyState)

console.log('incident.urgency + ', document.getElementById('incident.urgency'))
console.log('incident.category + ', document.getElementById('incident.category'))
console.log('incident.subcategory + ', document.getElementById('incident.subcategory'))
console.log('incident.u_item + ', document.getElementById('incident.u_item'))
console.log('incident.short_description + ', document.getElementById('incident.short_description'))


let isInitialized = false
let retryId = null

let retryCount = 0;
const MAX_RETRIES = 15;

async function start() {
    if (location.href === 'about:srcdoc' || location.href === 'about:blank' && (!location.href.includes('incident.do') || !location.href.includes('incident_list.do'))) return;
    if (retryCount >= MAX_RETRIES) return; // abandon après 15s
    isInitialized = await init();
    if (isInitialized) {
        await loadOverlay();
        return;
    }
    else {
        retryId = setTimeout(start, 1000);
    }
    retryCount++;
    console.log('starting n°', retryCount);
}

async function init() {
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
        document.body.dataset.snowScriptInit = 'true';
        console.log('initialized in init : ok')
        if (retryId) clearTimeout(retryId);
        console.log("Extension [snow_script] chargée : OK pour " + location.href);

        // console.log('inputShortDescritption : ' + inputShortDescription);

        let shortDescription = clearValue(inputShortDescription.value.toUpperCase());
        inputShortDescription.addEventListener('input', () => {
            shortDescription = inputShortDescription.value;
            // console.log("shortdescription : " + shortDescription)
            setShortDescription(inputShortDescription, category, subCategory, item, CI)
        })
// console.log("getShortDescription OK");

        let category = clearValue(selectCategory.value.toUpperCase());
        selectCategory.addEventListener('change', () => {
            category = selectCategory.value;
            category = clearValue(category.toUpperCase());
            // console.log("category : " + category)
            setShortDescription(inputShortDescription, category, subCategory, item, CI)
        })
// console.log("getCategory OK");

        let subCategory = clearValue(selectSubCategory.value.toUpperCase());
        selectSubCategory.addEventListener('change', () => {
            subCategory = selectSubCategory.value;
            subCategory = clearValue(subCategory.toUpperCase());
            // console.log("subcategory : " + subCategory)
            setShortDescription(inputShortDescription, category, subCategory, item, CI)
        })
// console.log("getSubCategory OK");

        let item = clearValue(selectItem.value.toUpperCase());
        selectItem.addEventListener('change', () => {
            item = selectItem.value;
            item = clearValue(item.toUpperCase());
            // console.log("item : " + item)
            setShortDescription(inputShortDescription, category, subCategory, item, CI)
        })
// console.log("getItem OK");

        const inputCIDisplay = document.getElementById('sys_display.incident.cmdb_ci');
        let CI = clearValue(inputCIDisplay.value.toUpperCase());
        
        inputCIDisplay.addEventListener('input', () => {
            setTimeout(()=>{
                const display = inputCIDisplay?.value || '';


                CI = clearValue(display.toUpperCase())
                setShortDescription(inputShortDescription, category, subCategory, item, CI)
            }, 2500)
        })

        inputCIDisplay.addEventListener('click', () => {
            setTimeout(()=>{
                const display = inputCIDisplay?.value?.trim() || '';

                CI = clearValue(display.toUpperCase())
                setShortDescription(inputShortDescription, category, subCategory, item, CI)
            }, 2500)
        })

    }

    return true
}

function setShortDescription(inputShortDescription, category, subCategory, item, CI) {

    let tab = inputShortDescription.value.split('- ');

    let shortDescription = tab[tab.length - 1];
    inputShortDescription.value = category + ' - ' + subCategory + ' - ' + item + ' - ' + CI + ' - ' + shortDescription;

}

// Fonction qui 'nettoie' les valeurs individuellement en fonction des cas et ressort la valeur telle qu'attendue par la hiérarchie
function clearValue(value) {
    switch (value) {
        case 'HARDWARE_FR':  value = 'HARDWARE'
            break
        case 'CYBER':  value = 'CYBERSECURITY'
            break
        case 'INSTALL_CONFIGURATION':  value = 'INSTALL & CONFIGURATION'
            break
        case 'PICKING_DEVICE_PDA':  value = 'PICKING DEVICE (PDA)'
            break
        case 'PARTAGE_D_CRAN':  value = "PARTAGE D'ECRAN"
            break
        case 'OFFICE_EXCEL_WORD_POWERPOINT_ETC':  value = "OFFICE (EXCEL, WORD, POWERPOINT, ETC.)"
            break
        case 'MANHATTAN_MASC':  value = "MANHATTAN - MASC"
            break
        default:
            if (slash(value)) value = slash(value)
            value = value.replace('_', ' ')
            break
    }
    return value
}

// Fonction qui permet de remplacer les '_' par des ' / ' pour une liste définie de valeurs
function slash(value) {
    console.log("slash pour : ", value)
    const slashList = ['WINDOWS_ACTIVE_DIRECTORY', 'INTRANET_OTHER_SOFT', 'PINGID_SSO', 'INSTALL_UNINSTALL', 'MALWARE_VIRUS', 'THIEF_ROGUE']
    slashList.forEach(slash => {
        if (slash === value) {
            value = value.replace('_', ' / ')
            console.log('Valeur slashée : ' + value)
        }
    })
    return value
}


async function loadOverlay() {
    const url = chrome.runtime.getURL('overlay/overlay.html')
    const html = await fetch(url).then(response => response.text())

    const url2 = chrome.runtime.getURL('template/template.json')
    const json = await fetch(url2).then(response => response.json())

    console.log('json :', json)

    const placement = document.getElementById('incident.urgency')
    // console.log("placement : ", placement)
    if (!placement) return false
    console.log("placement OK")
    placement.insertAdjacentHTML('afterend', html)

    const overlay = document.getElementById('overlay')
    const templateDropdown = document.getElementById('template_dropdown')

    json.forEach((item) => {
        const option = new Option(item["label"], item["label"]);
        console.log('option ajoutée :', option)
        templateDropdown.add(option)


    })
    templateDropdown.addEventListener('change', () => {
        let option
        json.forEach((item) => {
            if (item["label"] === templateDropdown.value) {
                option = item
            }
        })
        try {
            window.postMessage({ type: 'APPLY_TEMPLATE', data: option }, '*');
            // applyTemplate(option)
        } catch (e) {
            console.error("Erreur au lancement de applyTemplate() : ", e)
        }
    })


    return true
}

start()