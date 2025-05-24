import React, {useEffect, useRef} from 'react'

const Diagram = () => {
      const canvasRef = useRef(null)

      useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.fillStyle = 'lightblue';
            context.fillRect(50, 50, 100, 50);

            context.beginPath();
            context.arc(250, 100, 30, 0, 2 * Math.PI);
            context.fillStyle = 'lightgreen';
            context.fill();
            context.stroke();

            context.moveTo(150, 100);
            context.lineTo(220, 100);
            context.stroke();

            context.font = '16px Arial';
            context.fillStyle = 'black';
            context.fillText('Box', 70, 80);
            context.fillText('Circle', 230, 105);

            canvas.addEventListener('click', (event) => {
        console.log('-----------')
                });
      }, [])

      const animate = () => {
            // Update drawing
            requestAnimationFrame(animate);
          };

      animate();

      return <canvas ref={canvasRef} width={500} height={300} />
}

export default Diagram