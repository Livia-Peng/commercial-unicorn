// 抽象图层
const ctx = context;

class Layer {
  constructor() {
    const lineGradient = ctx.createLinearGradient(0, 0, 0, 300);
    lineGradient.addColorStop(0, "magenta");
    lineGradient.addColorStop(0.5, "blue");
    lineGradient.addColorStop(1, "red");
    this.lineGradient = lineGradient;

    this.rectMargin = 10;
    this.rectCfg = {
      width: 60,
      height: 60,
      radius: 8,
      cols: 7,
      row: 7,
      lineWidth: 1.5,
    };
  }

  // 绘制底盘
  drawChassis() {
    // 最外层矩形
    this.drawRoundRect(0, 0, canvasEle.width, canvasEle.height, 10, 2);

    let row = 0;
    do {
      let cols = 0;
      const y = row * this.rectCfg.height + (row + 1) * this.rectMargin;
      do {
        // console.log({row, cols});
        this.drawRoundRect(cols * this.rectCfg.width + (cols + 1) * this.rectMargin, y);
        cols++;
      } while (cols < this.rectCfg.cols);
      row++;
    } while (row < this.rectCfg.row)
  }

  drawRoundRect(x, y, w, h, r, lw) {
    const width = w || this.rectCfg.width;
    const height = h || this.rectCfg.height;
    const radius = r || this.rectCfg.radius;
    ctx.lineWidth = lw || this.rectCfg.lineWidth;
    ctx.strokeStyle = this.lineGradient;

    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    ctx.lineTo(width - radius + x, y);
    ctx.arc(width - radius + x, radius + y, radius, Math.PI * 1.5, Math.PI * 2);
    ctx.lineTo(width + x, height + y - radius);
    ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 0.5);
    ctx.lineTo(radius + x, height + y);
    ctx.arc(radius + x, height - radius + y, radius, Math.PI * 0.5, Math.PI);
    ctx.closePath();
    context.stroke();
  }
}
