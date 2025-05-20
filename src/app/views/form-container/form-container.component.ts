import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../../helpers/services/form-data-service.service';
import { AuthService } from '../../helpers/services/auth-service.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  serverResponse: {success: boolean, message: string} | null = null;

  // Opciones para los campos de selección múltiple
  businessTypeOptions = [
    'Asociación', 'Pre cooperativa', 'Cooperativa', 'Corporación', 
    'Fundación', 'En Comandita', 'S.A', 'EAT', 'S.A.S', 'LTDA', 
    'Idea de negocio', 'Otra'
  ];

  economicSectorOptions = [
    'Agrícola', 'Pecuario', 'Agroindustrial', 'Artesanal', 
    'Minería', 'Comercial', 'Industrial', 'Transporte', 
    'Turismo', 'Otra'
  ];

  economicActivityOptions = [
    'Acopio', 'Comercialización', 'Transformación', 'Agroindustria',
    'Producción', 'Exportación', 'Importación', 'Otra'
  ];

  differentialFocusOptions = [
    'Indígena', 'Afro', 'Raizal', 'Víctima del conflicto',
    'LGBTIQ+', 'Joven', 'Personas con discapacidad', 'Otra'
  ];

  infrastructureTypeOptions = [
    'Propia', 'Arrendada', 'Familiar', 'Comodato'
  ];

  constructor(
    private formDataService: FormDataService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      // Información Básica
      companyName: ['', [Validators.maxLength(100)]],
      naturalPerson: ['', [Validators.required, Validators.maxLength(100)]],
      municipality: ['', [Validators.required, Validators.maxLength(50)]],
      meetingDate: ['', [Validators.required]],

      // Información de Contacto
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      responsible: ['', [Validators.required, Validators.maxLength(100)]],
      gender: ['', [Validators.required]],

      // Tipo de Emprendimiento
      businessType: this.fb.array([], [Validators.required]),
      otherBusinessType: [''],

      // Actividad Económica
      economicSector: this.fb.array([], [Validators.required]),
      otherEconomicSector: [''],
      economicActivity: this.fb.array([], [Validators.required]),
      otherEconomicActivity: [''],

      // Información de Socios/Afiliados
      membersCount: ['', [Validators.required, Validators.min(0)]],
      differentialMembers: ['', [Validators.min(0)]],
      differentialFocus: this.fb.array([]),
      otherDifferentialFocus: [''],

      // Infraestructura e Instalaciones
      infrastructureType: this.fb.array([], [Validators.required]),
      area: ['', [Validators.min(0)]],
      hasPublicPartners: [false],
      publicPartners: [''],
      hasPrivatePartners: [false],
      privatePartners: [''],
      hasMixedPartners: [false],
      mixedPartners: [''],

      // Información Financiera
      workingCapital: ['', [Validators.min(0)]],
      entityDebt: ['', [Validators.min(0)]],
      hasCredits: [''],

      // Contexto
      motivation: ['', [Validators.maxLength(500)]],
      vision: ['', [Validators.maxLength(500)]],
      fearsStrengths: ['', [Validators.maxLength(500)]],
      differentialGroup: ['', [Validators.maxLength(100)]],
      weeklyTime: ['', [Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.formDataService.formData$.subscribe(data => {
      this.form.patchValue(data);
      this.updateFormArray('businessType', data.businessType || []);
      this.updateFormArray('economicSector', data.economicSector || []);
      this.updateFormArray('economicActivity', data.economicActivity || []);
      this.updateFormArray('differentialFocus', data.differentialFocus || []);
      this.updateFormArray('infrastructureType', data.infrastructureType || []);
    });
  }

  private updateFormArray(controlName: string, values: string[]): void {
    const formArray = this.form.get(controlName) as FormArray;
    formArray.clear();
    values.forEach(value => formArray.push(new FormControl(value)));
  }

  onCheckboxChange(event: Event, controlName: string, value: string): void {
    const formArray = this.form.get(controlName) as FormArray;
    const target = event.target as HTMLInputElement;
    
    if (target.checked) {
      formArray.push(new FormControl(value));
    } else {
      const index = formArray.controls.findIndex(x => x.value === value);
      if (index >= 0) {
        formArray.removeAt(index);
      }
    }
  }

  async submitForm(): Promise<void> {
    this.submitted = true;
    this.markAllAsTouched();
    
    if (this.form.valid) {
      try {
        // Simular envío al servidor
        this.serverResponse = null;
        this.form.disable();
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simular respuesta exitosa
        this.serverResponse = {
          success: true,
          message: 'Formulario enviado con éxito. Gracias por tu información.'
        };
        
        // Guardar datos en el servicio
        this.formDataService.updateFormData(this.form.value);
        this.formDataService.submitFormData();
        
        // Resetear formulario después de 3 segundos
        setTimeout(() => {
          this.resetForm();
          this.submitted = false;
          this.serverResponse = null;
        }, 3000);
      } catch (error) {
        this.serverResponse = {
          success: false,
          message: 'Error al enviar el formulario. Por favor intenta nuevamente.'
        };
        this.form.enable();
      }
    } else {
      this.scrollToFirstInvalidControl();
    }
  }

  resetForm(): void {
    if (confirm('¿Estás seguro que deseas limpiar todo el formulario?')) {
      this.form.reset();
      ['businessType', 'economicSector', 'economicActivity', 'differentialFocus', 'infrastructureType'].forEach(
        controlName => (this.form.get(controlName) as FormArray).clear()
      );
      this.formDataService.resetFormData();
      this.submitted = false;
      this.serverResponse = null;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  private markAllAsTouched(): void {
    Object.values(this.form.controls).forEach(control => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(c => c.markAsTouched());
      } else if (control instanceof FormArray) {
        control.controls.forEach(c => c.markAsTouched());
      } else {
        control.markAsTouched();
      }
    });
  }

  private scrollToFirstInvalidControl(): void {
    const firstInvalidControl = document.querySelector('.ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Agregar clase de error temporal
      firstInvalidControl.classList.add('highlight-error');
      setTimeout(() => {
        firstInvalidControl.classList.remove('highlight-error');
      }, 3000);
    }
  }

  getFieldError(field: string): string | null {
    const control = this.form.get(field);
    if (control?.errors && (control.touched || this.submitted)) {
      if (control.errors['required']) {
        return 'Este campo es requerido';
      } else if (control.errors['email']) {
        return 'Ingrese un correo electrónico válido';
      } else if (control.errors['pattern']) {
        return 'Formato inválido';
      } else if (control.errors['min']) {
        return `El valor mínimo es ${control.errors['min'].min}`;
      } else if (control.errors['maxlength']) {
        return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }

  getArrayError(arrayName: string): string | null {
    const array = this.form.get(arrayName) as FormArray;
    if (array?.errors && (array.touched || this.submitted)) {
      if (array.errors['required']) {
        return 'Seleccione al menos una opción';
      }
    }
    return null;
  }

  // Métodos de conveniencia para acceder a los controles del formulario
  get f() { return this.form.controls; }
  get businessTypeArray() { return this.form.get('businessType') as FormArray; }
  get economicSectorArray() { return this.form.get('economicSector') as FormArray; }
  get economicActivityArray() { return this.form.get('economicActivity') as FormArray; }
  get differentialFocusArray() { return this.form.get('differentialFocus') as FormArray; }
  get infrastructureTypeArray() { return this.form.get('infrastructureType') as FormArray; }
}