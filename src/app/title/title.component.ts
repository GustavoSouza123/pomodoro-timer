import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [CommonModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {
  @Input() title: string = 'My title';
  @Input() subtitle: string = 'My subtitle';
  @Input() addButton: boolean = false;
}
