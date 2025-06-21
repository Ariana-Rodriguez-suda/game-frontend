import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})
export class RegisterComponent implements OnInit {
  registerform!: FormGroup;
  isPlayer = false;
  hasClassCode = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerform = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['maestro', Validators.required],
      classCode: [''],
      newClassName: [''], // Para el maestro, nombre del código/clase
    });

    // Actualiza isPlayer para inicializar visibilidad checkbox jugador
    this.isPlayer = this.registerform.get('role')?.value === 'jugador';
  }

  onRoleChange(event: any) {
    const role = event.target.value;
    this.isPlayer = role === 'jugador';

    if (role !== 'jugador') {
      this.hasClassCode = false;
      this.registerform.get('classCode')?.setValue('');
    }

    if (role !== 'maestro') {
      this.registerform.get('newClassName')?.setValue('');
    }
  }

  onClassCodeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.hasClassCode = input.checked;

    if (!this.hasClassCode) {
      this.registerform.get('classCode')?.setValue('');
    }
  }

  onSubmit() {
  console.log('onSubmit llamado');
  if (this.registerform.invalid) {
    console.log('Formulario inválido');
    return;
  }
    const formData = this.registerform.value;

    // Si no tiene código, limpiar campo classCode
    if (!this.hasClassCode) {
      formData.classCode = null;
    }

    // Si es maestro, enviar newClassName como classCode para crear la clase
    if (formData.role === 'maestro' && formData.newClassName) {
      formData.classCode = formData.newClassName;
    }

    // Llamar al servicio de registro
    this.authService.register(formData).subscribe(() => {
      // Redirigir según rol
      if (formData.role === 'maestro') {
        this.router.navigate(['/user-profile']); // Perfil maestro
      } else if (formData.role === 'jugador') {
        this.router.navigate(['/user-profile']); // Perfil jugador
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
