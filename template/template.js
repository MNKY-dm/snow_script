window.addEventListener('message', (event) => {
    if (event.data?.type !== 'APPLY_TEMPLATE') return;
    if (typeof g_form === 'undefined') return;

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