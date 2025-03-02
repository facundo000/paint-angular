import { Cell } from '../interfaces/cell';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { Component, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { WebsocketsService } from './services/websockets.service';

@Component({
  selector: 'app-root',  
  imports: [ColorPickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy  {
  ngOnDestroy(): void {
    this.wsService.disconnect();
  }

  title = 'paint';  

  public cells = signal<Cell[]>([]);
  private cols = 100;
  private cellSize: number = 0;

  public showColorPicker = signal<boolean>(false);
  private selectedColor = signal<string>('#000000');
  pickerPosition = { x: 0, y: 0 };
  private isDragging = signal<boolean>(false);
  private lastTouchedCell = signal<Cell | null>(null);

  private wsService = inject(WebsocketsService)

  ngOnInit() {
    this.calculateGrid();
    this.generateCells();
    this.wsService.onInitialGrid((grid) => {
      this.cells.update(currentCells => 
        currentCells.map(cell => ({
          ...cell,
          color: grid[cell.id] || null
        }))
      );
    });

    this.wsService.onCellUpdate((data) => {
      // Actualizar celda específica
      const cell = this.cells().find(c => c.id === data.id);
      if (cell) cell.color = data.color;
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateGrid();
  }

  private calculateGrid() {
    // Tamaño de celda basado en el ancho de la ventana
    this.cellSize = window.innerWidth / this.cols;
  }

  private generateCells() {
    const totalCells = this.cols * Math.floor(window.innerHeight / this.cellSize);
    this.cells.set(Array.from({ length: totalCells }, (_, i) => ({
      id: i,
      color: null
    })));
  }

  toggleCell(cell: any) {
    this.wsService.updateCell({
      id: cell.id,
      color: cell.color ? null : this.selectedColor()
    });
  }

  onRightClick(event: MouseEvent, cell: Cell) {
    this.pickerPosition = {
      x: event.clientX,
      y: event.clientY
    };
    this.showColorPicker.set(true);    
  }

  onColorSelected(color?: string) {
    this.showColorPicker.set(false);
    if (color) {
      this.selectedColor.set( color);
      console.log()
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button === 0) { // Solo botón izquierdo
      this.isDragging.set(true);
      this.lastTouchedCell.set(null);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging.set(false);
    this.lastTouchedCell.set(null);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging()) return;

    const target = event.target as HTMLElement;
    if (target.classList.contains('cell')) {
      const cellId = Number(target.dataset['cellId']);
      const cell = this.cells().find(c => c.id === cellId);
      
      if (cell && cell !== this.lastTouchedCell()) {
        this.toggleCell(cell); //(cell,true)
        this.lastTouchedCell.set(cell);
      }
    }
  }
}
