const canvas = document.getElementById('canvas')
function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}
resize()
window.addEventListener('resize', ()=>{
    resize();
    clearCanvas();
})

const ctx = canvas.getContext('2d')


//容器以20*20分割，并向上取整
const blockWidth = Math.ceil(canvas.width/20)//宽度块个数
const blockHeight = Math.ceil(canvas.height/20)//高度块个数
const containWidth = blockWidth*20//容器宽度
const containHeight = blockHeight*20//容器高度
console.log(canvas.width/20,canvas.height/20)
console.log(blockWidth,blockHeight)
console.log(containWidth,containHeight)
const block = { width:20, height:20};//块大小

const v = 0.2;//星星速度

//在每个块中随机放置4个星星
let x1,y1,x2,y2;//块的左上xy，右下xy
let starColor = ['#246b6fcc', '#1c4046cc', '#105456cc', '#2d3847cc', '#1a3d49cc']
//将界面以界面中心分成4个象限，使每个象限的星星在象限内随机移动，碰到边缘就反弹
const centerX = containWidth/2
const centerY = containHeight/2
// 存储所有星星的数组
const stars = [];

// 重新生成星星，将星星信息存储到数组中
for (x1 = 0; x1 < blockWidth; x1++) {
    for (y1 = 0; y1 < blockHeight; y1++) {
        for (let i = 0; i < 4; i++) {//每个块随机生成4个星星
            const x = x1 * block.width + Math.floor(Math.random() * block.width);
            const y = y1 * block.height + Math.floor(Math.random() * block.height);
            const size = Math.floor(Math.random() * 4) + 1;//星星大小1-5px
            const color = starColor[Math.floor(Math.random() * starColor.length)];//随机颜色
            
            // 判断星星所在象限并初始化随机速度
            let vx, vy;
            if (x < centerX && y < centerY) {
                // 第一象限
                vx = (Math.random() * 2 - 1) * v;
                vy = (Math.random() * 2 - 1) * v;
            } else if (x >= centerX && y < centerY) {
                // 第二象限
                vx = (Math.random() * 2 - 1) * v;
                vy = (Math.random() * 2 - 1) * v;
            } else if (x < centerX && y >= centerY) {
                // 第三象限
                vx = (Math.random() * 2 - 1) * v;
                vy = (Math.random() * 2 - 1) * v;
            } else {
                // 第四象限
                vx = (Math.random() * 2 - 1) * v;
                vy = (Math.random() * 2 - 1) * v;
            }
            
            stars.push({ x, y, size, color, vx, vy });//将星星信息存储到数组中
        }
    }
}

// 清空画布函数
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 绘制星星函数
function drawStars() {
    for (const star of stars) {
        ctx.fillStyle = star.color;
        ctx.fillRect(star.x, star.y, star.size, star.size);
    }
}

// 更新星星位置函数，处理反弹逻辑
function updateStars() {
    for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;
        
        // 判断星星所在象限
        if (star.x < centerX && star.y < centerY) {
            // 第一象限
            if (star.x <= 0 || star.x + star.size >= centerX) star.vx = -star.vx;
            if (star.y <= 0 || star.y + star.size >= centerY) star.vy = -star.vy;
        } else if (star.x >= centerX && star.y < centerY) {
            // 第二象限
            if (star.x <= centerX || star.x + star.size >= containWidth) star.vx = -star.vx;
            if (star.y <= 0 || star.y + star.size >= centerY) star.vy = -star.vy;
        } else if (star.x < centerX && star.y >= centerY) {
            // 第三象限
            if (star.x <= 0 || star.x + star.size >= centerX) star.vx = -star.vx;
            if (star.y <= centerY || star.y + star.size >= containHeight) star.vy = -star.vy;
        } else {
            // 第四象限
            if (star.x <= centerX || star.x + star.size >= containWidth) star.vx = -star.vx;
            if (star.y <= centerY || star.y + star.size >= containHeight) star.vy = -star.vy;
        }
    }
}

// 动画循环函数
function animate() {
    clearCanvas();
    updateStars();
    drawStars();
    requestAnimationFrame(animate);
}

// 启动动画
animate();
