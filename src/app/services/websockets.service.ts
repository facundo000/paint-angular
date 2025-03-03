import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {
  // private url = environment.wsUrl;
  
  // private socket = io(this.url) 
  private socket = io('https://paint-nest-angular-websocket-production.up.railway.app') 
  
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
