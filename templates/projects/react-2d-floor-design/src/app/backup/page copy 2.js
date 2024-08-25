"use client";
import Layout from "@/components/Layout";
import { useCanvas } from "@/hooks/useCanvas";
import { useLine } from "@/hooks/useLine";

export default function Home() {
  const { startDrawing, stopDrawing, drawLine } = useLine();

  const handleMouseDown = (e) => {
    const canvas = e.target;
    startDrawing(e, canvas);
  };

  const handleMouseUp = () => {
    stopDrawing();
  };

  const handleMouseMove = (e) => {
    const canvas = e.target;
    drawLine(e, canvas);
  };

  const canvasRef = useCanvas((ctx, canvas) => {
    const handleEvent = (e) => {
      switch (e.type) {
        case 'mousedown':
          handleMouseDown(e);
          break;
        case 'mouseup':
          handleMouseUp();
          break;
        case 'mousemove':
          handleMouseMove(e);
          break;
        default:
          break;
      }
    };

    canvas.addEventListener('mousedown', handleEvent);
    canvas.addEventListener('mouseup', handleEvent);
    canvas.addEventListener('mousemove', handleEvent);

    return () => {
      canvas.removeEventListener('mousedown', handleEvent);
      canvas.removeEventListener('mouseup', handleEvent);
      canvas.removeEventListener('mousemove', handleEvent);
    };
  });

  return (
    <Layout>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        style={{ display: 'block', width: '100vw', height: '100vh' }} 
      />
    </Layout>
  );
}
