let observerCaller = null;
let observerCI = null;
let observerTemplate = null;
window.addEventListener('message', (event) => {
    if (typeof g_form === 'undefined') return;
    if (event.data?.type === 'RESET_TEMPLATE') {
        if (observerCaller) observerCaller.disconnect();
        if (observerCI) observerCI.disconnect();
        const mandatoryFields = ['caller_id', 'location', 'category', 'subcategory', 'u_item', 'cmdb_ci',
            'contact_type', 'urgency'];

        mandatoryFields.forEach(f => g_form.setMandatory(f, false));
        setTimeout(() => {

            console.log("Reset template en cours...");
            document.getElementById('template_dropdown').value = ''
            const mirror = document.querySelector('.select-mirror');
            if (mirror) {
                mirror.innerHTML = `<span style="color: rgb(0, 5, 14);padding-left: 3px;">-- Aucune --</span>`;
                mirror.classList.remove('scrolling');
            }

            g_form.clearValue('category');
            g_form.clearValue('cmdb_ci')
            g_form.clearValue('business_service')
            g_form.clearValue('assignment_group')
            g_form.setValue('state', 1)

            g_form.clearValue('short_description')
            g_form.setValue('description', "Téléphone :\nNombre d'utilisateurs impactés :")
            g_form.clearValue('close_code')
            g_form.clearValue('close_notes')

            setTimeout(() => {
                mandatoryFields.forEach(f => g_form.setMandatory(f, true));
            }, 500);
        }, 500)

        return;
    }
    else if (event.data?.type !== 'APPLY_TEMPLATE') return;

    const option = event.data.data;
    console.log("applying template...");
    console.log("g_form : ", g_form);

    console.log("template injectée : ", option);
    g_form.setValue('category', option.fields.category);
    g_form.setValue('subcategory', option.fields.subcategory)
    g_form.setValue('u_item', option.fields.u_item)
    g_form.setValue('cmdb_ci', option.fields.CI)

    if (observerCaller) observerCaller.disconnect();
    observerCaller = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            console.log("caller_id changé");
            setTimeout(() => {
                g_form.setValue('cmdb_ci', option.fields.CI)
            }, 1000)
        })
    })

    observerCaller.observe(g_form.getControl('caller_id'), { attributes: true, childList: true, subtree: true, characterData: true })



    if (observerCI) observerCI.disconnect();
    observerCI = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            setTimeout(() => {
                if (g_form.getValue('business_service') === '') {
                    g_form.setValue('business_service', option.fields.service)
                }
            }, 1000)
        })
    })
    observerCI.observe(g_form.getControl('cmdb_ci'), { attributes: true, childList: true, subtree: true, characterData: true })


    setTimeout(() => {
        g_form.setValue('business_service', option.fields.service)
    }, 1000) // timeout nécessaire ici car le service est supprimé s'il est entré trop rapidement
    g_form.setValue('assignment_group', option.fields.group)
    g_form.setValue('state', option.fields.state)
    g_form.setValue('urgency', option.fields.urgency)
    g_form.setValue('contact_type', option.fields.contact_type)

    g_form.setValue('short_description', option.fields.short_description)

    if (observerTemplate) observerTemplate.disconnect();
    observerTemplate = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            console.log("template snow natif changé");
            setTimeout(() => {
                g_form.setValue('description', option.fields.description)
            }, 1000)
        })
    })

    observerTemplate.observe(g_form.getControl('u_template'), { attributes: true, childList: true, subtree: true, characterData: true })

    g_form.setValue('description', option.fields.description)

    g_form.setValue('close_code', option.fields.close_code)
    g_form.setValue('close_notes', option.fields.close_notes)
});

// VPN, PING ID, IMPRIMANTES SINERES & WINDOWS, LICENCES OFFICE, CODE PIN BITLOCKER,
// CODE PUK carte SIM