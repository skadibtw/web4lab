import React, { useRef, useEffect, useState } from "react";

const Canvas = ({ r }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const Xcanvas = canvas.width;
    const Ycanvas = canvas.height;

    const clearCanvas = () => {
      ctx.clearRect(0, 0, Xcanvas, Ycanvas);
    };

    const drawGrid = () => {
      const gridSpacing = Xcanvas / 10;
      ctx.strokeStyle = "#e0e0e0";
      ctx.beginPath();
      for (let x = 0; x <= Xcanvas; x += gridSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, Ycanvas);
      }
      for (let y = 0; y <= Ycanvas; y += gridSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(Xcanvas, y);
      }
      ctx.stroke();
    };

    const drawAxes = () => {
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(Xcanvas / 2, 0);
      ctx.lineTo(Xcanvas / 2, Ycanvas);
      ctx.moveTo(0, Ycanvas / 2);
      ctx.lineTo(Xcanvas, Ycanvas / 2);
      ctx.stroke();
    };

    const drawShapes = () => {
      const scale = (Xcanvas / 2) * (r / 5);
      ctx.fillStyle = "#5f9ea0";

      // Четверть круга
      ctx.beginPath();
      ctx.moveTo(Xcanvas / 2, Ycanvas / 2);
      ctx.arc(Xcanvas / 2, Ycanvas / 2, scale / 2, Math.PI, Math.PI / 2);
      ctx.fill();
      ctx.stroke();

      // Прямоугольник
      ctx.beginPath();
      ctx.rect(Xcanvas / 2, Ycanvas / 2, scale, -scale / 2);
      ctx.fill();
      ctx.stroke();

      // Треугольник
      ctx.beginPath();
      ctx.moveTo(Xcanvas / 2 - scale, Ycanvas / 2);
      ctx.lineTo(Xcanvas / 2, Ycanvas / 2);
      ctx.lineTo(Xcanvas / 2, Ycanvas / 2 - scale);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const drawLabels = () => {
      const scale = (Xcanvas / 2) * (r / 5);
      ctx.font = "16px Arial";
      ctx.fillStyle = "#ffffff";

      ctx.fillText("-R", Xcanvas / 2 - scale, Ycanvas / 2 + 20);
      ctx.fillText("-R/2", Xcanvas / 2 - scale / 2, Ycanvas / 2 + 20);
      ctx.fillText("R/2", Xcanvas / 2 + scale / 2, Ycanvas / 2 + 20);
      ctx.fillText("R", Xcanvas / 2 + scale, Ycanvas / 2 + 20);

      ctx.fillText("R", Xcanvas / 2 - 20, Ycanvas / 2 - scale);
      ctx.fillText("R/2", Xcanvas / 2 - 20, Ycanvas / 2 - scale / 2);
      ctx.fillText("-R/2", Xcanvas / 2 - 20, Ycanvas / 2 + scale / 2);
      ctx.fillText("-R", Xcanvas / 2 - 20, Ycanvas / 2 + scale);
    };

    const drawGraph = () => {
      if (r === null) return;

      clearCanvas();
      drawGrid();
      drawAxes();
      drawShapes();
      drawLabels();
    };

    drawGraph();
  }, [r]);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
};

export default Canvas;
