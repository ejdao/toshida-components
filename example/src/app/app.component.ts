import { Component, OnInit } from '@angular/core';
import { TestingComponent } from '@toshida/ng-components/testing';
import { sum } from '@toshida/utilities';

@Component({
  standalone: true,
  imports: [TestingComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log(sum(1, 3));
  }
}
