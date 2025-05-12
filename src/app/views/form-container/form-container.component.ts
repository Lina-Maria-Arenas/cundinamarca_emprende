import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../../helpers/services/form-data-service.service';
import { AuthService } from '../../helpers/services/auth-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-container',
  standalone:true,
  imports:[FormsModule],
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {
  formData: any = {};

  constructor(
    private formDataService: FormDataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formDataService.formData$.subscribe(data => {
      this.formData = data;
    });
  }

  updateField(field: string, value: any): void {
    this.formDataService.updateFormData({ [field]: value });
  }

  toggleCheckbox(field: string, value: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    
    const currentArray = [...this.formData[field]];
    
    if (isChecked) {
      currentArray.push(value);
    } else {
      const index = currentArray.indexOf(value);
      if (index > -1) {
        currentArray.splice(index, 1);
      }
    }
    
    this.formDataService.updateFormData({ [field]: currentArray });
  }

  updateCheckboxField(field: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.formDataService.updateFormData({ [field]: target.checked });
  }

  submitForm(): void {
    this.formDataService.submitFormData();
    alert('Formulario enviado con éxito');
  }

  resetForm(): void {
    if (confirm('¿Está seguro que desea limpiar todo el formulario?')) {
      this.formDataService.resetFormData();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}