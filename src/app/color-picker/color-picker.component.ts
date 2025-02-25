import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  imports: [CommonModule],
  template: `
  <div 
  class="color-picker" 
  [ngStyle]="{ 
  'left.px': position.x,
  'top.px': position.y 
  }"
  >
    <div 
      *ngFor="let color of colors"
      class="color-option"
      [style.backgroundColor]="color"
      (click)="selectColor(color)"
    ></div>
  </div>
  `,
  styles: `
  .color-picker {
    position: fixed;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    display: flex;
    gap: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
  } 

  .color-option {
    width: 30px;
    height: 30px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: transform 0.2s;
  }

  .color-option:hover {
    transform: scale(1.1);
    border-color: #000;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent {
  @Output() colorSelected = new EventEmitter<string>();
  @Input() position = { x: 0, y: 0 };
  
  colors: string[] = [
    '#FF0000', // Rojo
    '#00FF00', // Verde
    '#0000FF', // Azul
    '#FFFF00', // Amarillo
    '#FF00FF'  // Magenta
  ];

  selectColor(color: string) {
    this.colorSelected.emit(color);
  }

  @HostListener('mouseleave')
    onMouseLeave() {
      this.colorSelected.emit();
    }
}
