import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawing-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './drawing-view.component.html',
  styleUrl: './drawing-view.component.css'
})

export class DrawingViewComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('input', { static: false }) inputRef!: ElementRef<HTMLInputElement>;

  isDrawing = false;
  startPoint: { x: number; y: number } | null = null;
  currentPoint: { x: number; y: number } | null = null;
  length = 0;
  desiredLength = '';
  lines: any[] = [];
  viewMode = 'floor';
  wallHeightA = '';
  wallHeightB = '';
  currentLineIndex: number | null = null;

  private PIXELS_PER_CM = 96 / 2.54;

  ngOnInit() {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.redrawLine();
  }

  calculateDistance(point1: { x: number; y: number }, point2: { x: number; y: number }): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  handleCanvasClick(event: MouseEvent) {
    const clickPoint = { x: event.clientX, y: event.clientY };
    
    if (!this.isDrawing) {
      this.isDrawing = true;
      this.startPoint = clickPoint;
      this.currentPoint = clickPoint;
      this.length = 0;
    } else {
      this.finalizeLine(clickPoint);
    }
  }

  handleMouseMove(event: MouseEvent) {
    if (!this.isDrawing) return;

    let newPoint = { x: event.clientX, y: event.clientY };

    if (this.desiredLength) {
      const desiredPixels = parseFloat(this.desiredLength) * this.PIXELS_PER_CM;
      const dx = newPoint.x - this.startPoint!.x;
      const dy = newPoint.y - this.startPoint!.y;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);
      const scale = desiredPixels / currentDistance;

      newPoint = {
        x: this.startPoint!.x + dx * scale,
        y: this.startPoint!.y + dy * scale
      };
    }

    this.currentPoint = newPoint;
    this.length = this.calculateDistance(this.startPoint!, newPoint) / this.PIXELS_PER_CM;
    this.redrawLine();
  }

  redrawLine() {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = this.viewMode === 'ceiling' ? '#f0f0f0' : '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    this.lines.forEach(line => {
      context.beginPath();
      context.moveTo(line.start.x, line.start.y);
      context.lineTo(line.end.x, line.end.y);
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.stroke();

      if (line.heightA || line.heightB) {
        const midX = (line.start.x + line.end.x) / 2;
        const midY = (line.start.y + line.end.y) / 2;
        const text = `Length: ${line.length.toFixed(2)} cm | A: ${line.heightA || 'N/A'} cm | B: ${line.heightB || 'N/A'} cm`;
        this.drawTextBackground(context, midX, midY, text);
        this.drawText(context, text, midX, midY - 20);
      }
    });

    if (this.startPoint && this.currentPoint) {
      context.beginPath();
      context.moveTo(this.startPoint.x, this.startPoint.y);
      context.lineTo(this.currentPoint.x, this.currentPoint.y);
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.stroke();

      context.beginPath();
      context.arc(this.startPoint.x, this.startPoint.y, 5, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();

      const midX = (this.startPoint.x + this.currentPoint.x) / 2;
      const midY = (this.startPoint.y + this.currentPoint.y) / 2;
      const text = `${this.length.toFixed(2)} cm`;
      this.drawTextBackground(context, midX, midY, text);
      this.drawText(context, text, midX, midY - 20);

      this.showInput(midX, midY - 60);
    }
  }

  drawTextBackground(context: CanvasRenderingContext2D, x: number, y: number, text: string) {
    const padding = 5;
    const textWidth = context.measureText(text).width;
    context.fillStyle = 'rgba(255, 255, 255, 0.7)';
    context.fillRect(x - textWidth / 2 - padding, y - 40, textWidth + padding * 2, 50);
  }

  drawText(context: CanvasRenderingContext2D, text: string, x: number, y: number) {
    context.font = '14px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText(text, x, y);
  }

  showInput(left: number, top: number) {
    const input = this.inputRef.nativeElement;
    input.style.position = 'absolute';
    input.style.left = `${left - 50}px`;
    input.style.top = `${top}px`;
    input.style.width = '100px';
    input.style.display = 'block';
  }

  finalizeLine(endPoint: { x: number; y: number }) {
    this.lines.push({
      start: this.startPoint,
      end: endPoint,
      length: this.length
    });
    this.startPoint = endPoint;
    this.currentPoint = endPoint;
    this.length = 0;
    this.desiredLength = '';
    this.currentLineIndex = this.lines.length - 1;

    this.inputRef.nativeElement.focus();
  }

  cancelDrawing() {
    this.isDrawing = false;
    this.startPoint = null;
    this.currentPoint = null;
    this.desiredLength = '';
    this.inputRef.nativeElement.style.display = 'none';
  }

  handleInputChange(event: Event) {
    this.desiredLength = (event.target as HTMLInputElement).value;
    if (this.startPoint && this.currentPoint) {
      this.handleMouseMove({
        clientX: this.currentPoint.x,
        clientY: this.currentPoint.y
      } as MouseEvent);
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.startPoint && this.currentPoint) {
      this.finalizeLine(this.currentPoint);
    } else if (event.key === 'Escape') {
      this.cancelDrawing();
    }
  }

  handleHeightChange() {
    if (this.currentLineIndex !== null) {
      const updatedLine = {
        ...this.lines[this.currentLineIndex],
        heightA: this.wallHeightA,
        heightB: this.wallHeightB
      };
      this.lines[this.currentLineIndex] = updatedLine;
      this.wallHeightA = '';
      this.wallHeightB = '';
      this.currentLineIndex = null;
    }
  }

  setViewMode(mode: string) {
    this.viewMode = mode;
    this.redrawLine();
  }
}
