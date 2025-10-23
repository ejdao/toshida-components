import { Component, OnInit } from '@angular/core';
import { sum } from '@toshida/components';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log(sum(1, 2));
  }
}
