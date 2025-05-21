import { FormGroup } from '@angular/forms';
import { redmineCustomFieldMap } from '../../constants/custom-fields.map';

export function buildRedmineCustomFields(form: FormGroup): any[] {
  const customFields: any[] = [];

  Object.keys(redmineCustomFieldMap).forEach(fieldName => {
    const fieldId = redmineCustomFieldMap[fieldName];
    let value = form.get(fieldName)?.value;

    // 👇 Si el campo es condicional (ej: otroTipoEmpresa), validamos si se debe usar
    if (fieldName === 'otroTipoEmpresa') {
      const tipoEmpresa = form.get('businessType')?.value;
      if (tipoEmpresa !== 'Otro') return; // Solo lo incluimos si eligió "Otro"
    }

    if (value !== null && value !== undefined && value !== '') {
      // 👇 Si es array, convertimos a string (ej: ['A', 'B'] => "A, B")
      if (Array.isArray(value)) {
        value = value.join(', ');
      }

      // 👇 Si es booleano, lo convertimos a "1" / "0"
      if (typeof value === 'boolean') {
        value = value ? '1' : '0';
      }

      customFields.push({
        id: fieldId,
        value: value
      });
    }
  });

  return customFields;
}
