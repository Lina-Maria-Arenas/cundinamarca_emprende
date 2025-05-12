import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface FormData {
  companyName: string;
  naturalPerson: string;
  municipality: string;
  meetingDate: string;
  gender: string;
  businessType: string[];
  otherBusinessType: string;
  email: string;
  phone: string;
  address: string;
  responsible: string;
  economicSector: string[];
  otherEconomicSector: string;
  economicActivity: string[];
  otherEconomicActivity: string;
  membersCount: string;
  differentialMembers: string;
  differentialFocus: string[];
  otherDifferentialFocus: string;
  infrastructureType: string[];
  area: string;
  hasPublicPartners: boolean;
  publicPartners: string;
  hasPrivatePartners: boolean;
  privatePartners: string;
  hasMixedPartners: boolean;
  mixedPartners: string;
  workingCapital: string;
  entityDebt: string;
  hasCredits: string;
  motivation: string;
  vision: string;
  fearsStrengths: string;
  differentialGroup: string;
  weeklyTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formDataSubject = new BehaviorSubject<FormData>(this.getInitialFormData());
  formData$ = this.formDataSubject.asObservable();

  constructor() {}

  private getInitialFormData(): FormData {
    return {
      companyName: '',
      naturalPerson: '',
      municipality: '',
      meetingDate: '',
      gender: '',
      businessType: [],
      otherBusinessType: '',
      email: '',
      phone: '',
      address: '',
      responsible: '',
      economicSector: [],
      otherEconomicSector: '',
      economicActivity: [],
      otherEconomicActivity: '',
      membersCount: '',
      differentialMembers: '',
      differentialFocus: [],
      otherDifferentialFocus: '',
      infrastructureType: [],
      area: '',
      hasPublicPartners: false,
      publicPartners: '',
      hasPrivatePartners: false,
      privatePartners: '',
      hasMixedPartners: false,
      mixedPartners: '',
      workingCapital: '',
      entityDebt: '',
      hasCredits: '',
      motivation: '',
      vision: '',
      fearsStrengths: '',
      differentialGroup: '',
      weeklyTime: ''
    };
  }

  updateFormData(partialData: Partial<FormData>): void {
    const currentData = this.formDataSubject.value;
    this.formDataSubject.next({ ...currentData, ...partialData });
  }

  resetFormData(): void {
    this.formDataSubject.next(this.getInitialFormData());
  }

  submitFormData(): void {
    // In a real app, this would call an API
    console.log('Form data submitted:', this.formDataSubject.value);
  }
}