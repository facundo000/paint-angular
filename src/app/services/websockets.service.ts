import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {
private socket = io('http://localhost:3000') 

   // Escuchar eventos del servidor
  onCellUpdate(callback: (data: any) => void) {
    this.socket.on('cell-updated', callback);
  }

  onInitialGrid(callback: (grid: any) => void) {
    this.socket.on('initial-grid', callback);
  }

  // Enviar actualizaciones
  updateCell(cellData: { id: number; color: string | null }) {
    this.socket.emit('update-cell', cellData);
  }

  // Desconexión
  disconnect() {
    this.socket.disconnect();
  }

}
