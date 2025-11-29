import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Usuarioservice } from '../../services/usuarioservice';
import { Usuario } from '../../models/Usuario';

// ANGULAR MATERIAL SNACKBAR
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {

  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: Usuarioservice,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  iniciarSesion() {
    if (this.formLogin.invalid) {
      this.snackBar.open("Completa los campos correctamente.", "Cerrar", {
        duration: 3000,
        verticalPosition: "bottom",
        horizontalPosition: "right"
      });
      return;
    }

    const correoIngresado = this.formLogin.value.correo.trim();
    const passwordIngresado = this.formLogin.value.password.trim();

    this.usuarioService.list().subscribe({
      next: (listaUsuarios: Usuario[]) => {

        const usuarioEncontrado = listaUsuarios.find(
          u => u.correo === correoIngresado
        );

        if (usuarioEncontrado) {
          
          this.usuarioService.listId(usuarioEncontrado.idUsuario).subscribe({
            next: (usuarioCompleto: Usuario) => {

              if (usuarioCompleto.password === passwordIngresado) {

                this.snackBar.open("¡Inicio de sesión exitoso!", "OK", {
                  duration: 2500,
                  verticalPosition: "bottom",
                  horizontalPosition: "right",
                  panelClass: ['snackbar-success']
                });

                localStorage.setItem('usuarioSesion', JSON.stringify(usuarioCompleto));
                this.router.navigate(['/dashboard']);

              } else {
                this.snackBar.open("Contraseña incorrecta.", "Cerrar", {
                  duration: 3000,
                  verticalPosition: "bottom",
                  horizontalPosition: "right",
                  panelClass: ['snackbar-error']
                });
              }

            },
            error: () => {
              this.snackBar.open("Error al verificar la contraseña.", "Cerrar", {
                duration: 3000,
                verticalPosition: "bottom",
                horizontalPosition: "right",
                panelClass: ['snackbar-error']
              });
            }
          });

        } else {
          this.snackBar.open("El correo no está registrado.", "Cerrar", {
            duration: 3000,
            verticalPosition: "bottom",
            horizontalPosition: "right",
            panelClass: ['snackbar-error']
          });
        }
      },

      error: () => {
        this.snackBar.open("Error de conexión con el servidor.", "Cerrar", {
          duration: 3000,
          verticalPosition: "bottom",
          horizontalPosition: "right",
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
