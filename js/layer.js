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
      lineWidth: 1,
      strokeStyle: "#333"
    };

    const img = new Image();
    img.src = "./img/unicorn.png";
    this.unicornImg = img;
  }

  // 绘制底盘
  drawChassis() {
    // 最外层矩形
    this.drawRoundRect({
      x: 0,
      y: 0,
      w: canvasEle.width,
      h: canvasEle.height,
      r: 15,
      lw: 3,
      sStyle: this.lineGradient
    });

    let row = 0;
    do {
      let cols = 0;
      const y = this.calCoordinate(this.rectCfg.height, row);
      do {
        // console.log({row, cols});
        this.drawRoundRect({
          x: this.calCoordinate(this.rectCfg.width, cols),
          y: y,
          // shadowColor: "#333"
        });
        cols++;
      } while (cols < this.rectCfg.cols);
      row++;
    } while (row < this.rectCfg.row);

    // 初始位置在正中央
    const halfMap = {
      cols: Math.floor(this.rectCfg.cols / 2),
      row: Math.floor(this.rectCfg.row / 2),
    };
    this.drawUnicorn(
      this.calCoordinate(this.rectCfg.width, halfMap.cols),
      this.calCoordinate(this.rectCfg.height, halfMap.row),
      directions.left
    )
  }

  // 圆角正方形
  drawRoundRect({x, y, w, h, r, lw, sStyle, fStyle, shadowColor}) {
    const width = w || this.rectCfg.width;
    const height = h || this.rectCfg.height;
    const radius = r || this.rectCfg.radius;

    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    ctx.lineTo(width - radius + x, y);
    ctx.arc(width - radius + x, radius + y, radius, Math.PI * 1.5, Math.PI * 2);
    ctx.lineTo(width + x, height + y - radius);
    ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 0.5);
    ctx.lineTo(radius + x, height + y);
    ctx.arc(radius + x, height - radius + y, radius, Math.PI * 0.5, Math.PI);
    ctx.closePath();
    if (fStyle) {
      context.fillStyle = fStyle;
      context.fill();
    }
    if (shadowColor) {
      ctx.shadowBlur = 2;
      ctx.shadowColor = shadowColor;
    } else {
      ctx.shadowBlur = 0;
    }
    ctx.lineWidth = lw || this.rectCfg.lineWidth;
    ctx.strokeStyle = sStyle || this.rectCfg.strokeStyle;
    context.stroke();
  }

  // 独角兽
  drawUnicorn(x, y, direction) {
    // console.log(direction)
    const offset = 2;
    const radius = 20;

    let xStart = x + (this.rectCfg.width / 2);
    let yStart = y + (this.rectCfg.height / 2);
    // 三角形（前进方向）
    const triangleH = 10;
    const triangleOffSet = radius - offset;
    ctx.beginPath();
    switch (direction) {
      case directions.up:
        yStart += offset;
        ctx.moveTo(xStart - triangleH, yStart - triangleOffSet);
        ctx.lineTo(xStart, yStart - triangleOffSet - triangleH);
        ctx.lineTo(xStart + triangleH, yStart - triangleOffSet);
        break;
      case directions.down:
        yStart -= offset;
        ctx.moveTo(xStart - triangleH, yStart + triangleOffSet);
        ctx.lineTo(xStart, yStart + triangleOffSet + triangleH);
        ctx.lineTo(xStart + triangleH, yStart + triangleOffSet);
        break;
      case directions.left:
        xStart += offset;
        ctx.moveTo(xStart - triangleOffSet, yStart - triangleH);
        ctx.lineTo(xStart - triangleOffSet - triangleH, yStart);
        ctx.lineTo(xStart - triangleOffSet, yStart + triangleH);
        break;
      case directions.right:
        xStart -= offset;
        ctx.moveTo(xStart + triangleOffSet, yStart - triangleH);
        ctx.lineTo(xStart + triangleOffSet + triangleH, yStart);
        ctx.lineTo(xStart + triangleOffSet, yStart + triangleH);
        break;
      default:
    }
    ctx.closePath();
    ctx.fillStyle = this.lineGradient;
    ctx.fill();
    ctx.strokeStyle = this.lineGradient;
    ctx.stroke();

    // 图像
    ctx.drawImage(this.unicornImg, xStart - radius, yStart - radius, radius * 2, radius * 2);
    // 圆形
    ctx.beginPath();
    ctx.arc(xStart, yStart, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.strokeStyle = this.lineGradient;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 0;
    ctx.stroke();
  }

  calCoordinate(len, idx) {
    return idx * len + (idx + 1) * this.rectMargin
  }
}
