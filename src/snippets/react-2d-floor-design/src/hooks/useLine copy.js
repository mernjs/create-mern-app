export const getCanvasCoordinates = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
    };
};

const PIXELS_PER_CM = 37.8; // Conversion factor from pixels to centimeters

const calculateDistance = (p1, p2) => {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

export const drawMeasurement = (ctx, startPoint, newPoint) => {
    // Calculate distance in pixels and convert to centimeters
    const distancePx = calculateDistance(startPoint, newPoint);
    const distanceCm = (distancePx / PIXELS_PER_CM).toFixed(2);

    // Calculate midpoint for measurement text placement
    const midPoint = {
        x: (startPoint.x + newPoint.x) / 2,
        y: (startPoint.y + newPoint.y) / 2,
    };

    // Draw measurement text above the line
    ctx.font = '16px Arial';
    ctx.fillStyle = 'blue';
    ctx.textAlign = 'center';
    ctx.fillText(`${distanceCm} cm`, midPoint.x, midPoint.y - 10); // Display measurement above the line
}

export const drawDottedLine = (ctx, startPoint, endPoint) => {
    ctx.beginPath();
    ctx.setLineDash([5, 5]); // Dotted line pattern (5px dash and 5px gap)
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash to solid
}

export const drawStartPointIndicator = (ctx, startPoint) => {
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red'; // Color of the start point indicator
    ctx.fill();
}

export function drawGrid(ctx, canvas) {
    const { width, height } = canvas;
    const gridSpacing = 20; // Define your grid spacing here
  
    ctx.strokeStyle = '#ddd'; // Light grey color for grid lines
    ctx.lineWidth = 0.5;
  
    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
  
    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }
  
  