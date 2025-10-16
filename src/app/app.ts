import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarSmartComponent } from './core/components/navbar/navbar.smart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarSmartComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
