import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-menucliente',
  imports: [CommonModule, RouterLink, RouterOutlet, MatIconModule],
  templateUrl: './menucliente.html',
  styleUrl: './menucliente.css',
})
export class Menucliente implements OnInit{
  isCollapsed = false;
  usuario: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const sesion = localStorage.getItem('usuarioSesion');
    if (sesion) {
      this.usuario = JSON.parse(sesion);
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }

}
