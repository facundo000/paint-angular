# Paint

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

```bash
npm install -g @angular/cli
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## [technical test ](../paint/src/assets/2do%20test%20programadores%20front%20end.pdf) instructions.

## Bottom line
 <video width="600" controls> <source src="./src/assets/demo.mp4" type="video/mp4"> 

## Explanation
## Implementación de la Cuadrícula Interactiva  

### 📏 Configuración de la Cuadrícula  
- **Ancho**: Se divide la ventana en **100 columnas**.  
- **Alto**: Se calcula dividiendo el alto de la ventana por `cellSize`.  
- **Redimensionado Dinámico**:  
  - Se usa `@HostListener('window:resize')` para recalcular la cuadrícula cuando la ventana cambia de tamaño.  

### 🎨 Diseño y Estilos  
- **Ocupación Completa**:  
  - `width: 100vw` y `height: 100vh` aseguran que el contenedor use toda la pantalla.  
  - `overflow: hidden` elimina las barras de desplazamiento.  
- **Proporciones**:  
  - `aspect-ratio: 1` mantiene las celdas en **relación 1:1**.  
- **Posicionamiento del Selector**:  
  - Se coloca donde ocurrió el **clic** usando `clientX` y `clientY`.  

### 🎛️ Comunicación entre Componentes  
- **Selector de Color** (`color-picker`):  
  - Emite el **color seleccionado** al componente padre.  
  - **Cierre Automático**:  
    - Se cierra al seleccionar un color o al sacar el mouse.  
- **Colores Predefinidos**:  
  - Los **5 colores requeridos** están definidos en el array `colors`.  

### 🖱️ Mecanismo de Arrastre  
- **Algunos de los Eventos Utilizados**:  
  - `mousedown`: Inicia el arrastre.  
  - `mouseup`: Termina el arrastre.  
  - `mousemove`: Detecta el movimiento mientras se arrastra.  
- **Optimización**:  
  - Uso de `lastTouchedCell` para evitar **repintar** la misma celda varias veces.  
- **Eventos Globales**:  
  - `@HostListener('document:...')` maneja eventos a nivel de documento.  

### ⚙️ Otras Mejoras  
- `user-select: none`: Evita la selección accidental de texto.  
- `event.button === 0`: Asegura que solo se detecte el **clic izquierdo**.  
- `toggleCell(isDrag)`: Ahora permite que, durante el arrastre, **solo se pinten celdas no coloreadas**.  
