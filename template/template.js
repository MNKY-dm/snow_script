window.addEventListener('message', (event) => {
    if (typeof g_form === 'undefined') return;
    if (event.data?.type === 'RESET_TEMPLATE') {
        const mandatoryFields = ['caller_id', 'location', 'category', 'subcategory', 'u_item', 'cmdb_ci',
            'contact_type', 'urgency'];

        mandatoryFields.forEach(f => g_form.setMandatory(f, false));
        setTimeout(() => {

            console.log("Reset template en cours...");
            document.getElementById('template_dropdown').value = ''
            g_form.clearValue('category');
            // g_form.clearValue('subcategory')
            // g_form.clearValue('u_item')
            g_form.clearValue('cmdb_ci')
            g_form.clearValue('business_service')
            g_form.clearValue('assignment_group')
            g_form.clearValue('urgency')
            g_form.clearValue('contact_type')

            g_form.clearValue('short_description')
            g_form.clearValue('description')
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
    g_form.setValue('business_service', option.fields.service)
    g_form.setValue('assignment_group', option.fields.group)
    g_form.setValue('urgency', option.fields.urgency)
    g_form.setValue('contact_type', option.fields.contact_type)

    g_form.setValue('short_description', option.fields.short_description)
    g_form.setValue('description', option.fields.description)
    g_form.setValue('close_code', option.fields.close_code)
    g_form.setValue('close_notes', option.fields.close_notes)
});