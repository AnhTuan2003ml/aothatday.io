// Đây là file main1.js
let bNum = 2;
let bSize = 8;
let bSpeed = 3;
let bDep = 0.01;
let bDist = 40;

// Lấy tham chiếu đến canvas và ngữ cảnh vẽ 2D
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let spots = [];
let hue = 0;

const mouse = {
    x: undefined,
    y: undefined
}

// Xử lý sự kiện di chuyển chuột
canvas.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let i = 0; i < bNum; i++) {
        spots.push(new Particle());
    }
});

// Xử lý sự kiện thay đổi kích thước cửa sổ
window.addEventListener("resize", function () {
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;
    initialize();
});

// Lớp Particle đại diện cho hạt
class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * bSize + 0.1;
        this.speedX = Math.random() * bSpeed - bSpeed / 2;
        this.speedY = Math.random() * bSpeed - bSpeed / 2;
        this.color = "hsl(" + hue + ", 100%, 50%)";
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > bDep) {
            this.size -= bDep;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Xử lý hạt
function handleParticles() {
    for (let i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();
        for (let j = i; j < spots.length; j++) {
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < bDist) {
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size / 3;
                ctx.moveTo(spots[i].x, spots[i].y);
                ctx.lineTo(spots[j].x, spots[j].y);
                ctx.stroke();
            }
        }
        if (spots[i].size <= bDep) {
            spots.splice(i, 1);
            i--;
        }
    }
}

// Hàm thực hiện hoạt hình
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}

// Khởi tạo và bắt đầu hoạt hình
function initialize() {
    spots = [];
    animate();
}

// Gọi hàm khởi tạo
initialize();
