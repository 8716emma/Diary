// 테마 관리
const themeBtn = document.getElementById('themeBtn');
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.toggle('light-mode', currentTheme === 'light');
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    drawWheel(); 
});

// --- 페이지 전환 로직 ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'flex';
        setTimeout(() => {
            selectedPage.classList.add('active');
        }, 10);
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        const clickAttr = item.getAttribute('onclick');
        if (clickAttr && clickAttr.includes(pageId)) {
            item.classList.add('active');
        }
    });

    document.getElementById('app').scrollTop = 0;
    if (pageId === 'wheelPage') drawWheel();
}
window.showPage = showPage;

document.addEventListener('DOMContentLoaded', () => {
    showPage('wheelPage');
});

// --- 돌림판 로직 ---
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const optionInput = document.getElementById('optionInput');
const addOptionBtn = document.getElementById('addOptionBtn');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');

let options = []; 
let startAngle = 0;
let arc = 0;
let spinTimeout = null;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;
const colors = ["#FFC312", "#F79F1F", "#E67E22", "#D35400", "#C0392B", "#E74C3C", "#9B59B6", "#8E44AD", "#2980B9", "#3498DB", "#1ABC9C", "#16A085", "#27AE60", "#2ECC71", "#34495E", "#2C3E50"];

function drawWheel() {
    if (!canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (options.length === 0) {
        ctx.fillStyle = document.body.classList.contains('light-mode') ? "#666" : "#aaa";
        ctx.font = '18px Pretendard, sans-serif';
        ctx.textAlign = "center";
        ctx.fillText("옵션을 추가해 주세요!", 250, 250);
        
        ctx.strokeStyle = document.body.classList.contains('light-mode') ? "#ddd" : "#333";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(250, 250, 180, 0, Math.PI * 2);
        ctx.stroke();
        return;
    }

    const outsideRadius = 200, textRadius = 150, insideRadius = 20;
    arc = Math.PI / (options.length / 2);
    ctx.textAlign = "start"; // 텍스트 정렬 초기화

    for (let i = 0; i < options.length; i++) {
        const angle = startAngle + i * arc;
        const grad = ctx.createRadialGradient(250, 250, insideRadius, 250, 250, outsideRadius);
        grad.addColorStop(0, colors[i % colors.length]);
        grad.addColorStop(1, adjustColor(colors[i % colors.length], -20));
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 4;
        ctx.fillStyle = "white";
        ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        const text = options[i];
        ctx.font = 'bold 18px Pretendard, sans-serif';
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
    }
    
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(250, 250, 10, 0, Math.PI * 2);
    ctx.fill();
}

function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function spin() { 
    if (options.length < 2) {
        alert("최소 2개 이상의 옵션이 필요합니다!");
        return;
    }
    spinTime = 0; 
    spinTimeTotal = Math.random() * 3000 + 5000; 
    rotateWheel(); 
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) { stopRotateWheel(); return; }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180); drawWheel();
    spinTimeout = requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
    cancelAnimationFrame(spinTimeout);
    const degrees = startAngle * 180 / Math.PI + 90, arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    const resultText = options[index];
    resultDiv.innerHTML = `<div class="result-badge">축하합니다!</div><div class="result-value" style="color:${colors[index % colors.length]}">${resultText}</div>`;
}

function easeOut(t, b, c, d) { const ts = (t /= d) * t, tc = ts * t; return b + c * (tc + -3 * ts + 3 * t); }

if (addOptionBtn) {
    addOptionBtn.addEventListener('click', () => {
        if (optionInput.value.trim() !== '') { 
            options.push(optionInput.value); 
            optionInput.value = ''; 
            drawWheel(); 
        }
    });
    optionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addOptionBtn.click();
    });
}
if (spinBtn) {
    spinBtn.addEventListener('click', () => { 
        resultDiv.innerHTML = '<div class="spinning-text">행운의 여신이 미소 짓는 중...</div>'; 
        spin(); 
    });
}

// --- AI 동물상 테스트 로직 ---
const AI_URL = "https://teachablemachine.withgoogle.com/models/JZKjOD0_-/";
let aiModel, maxPredictions;

async function loadModel() {
    if (!aiModel) {
        const modelURL = AI_URL + "model.json";
        const metadataURL = AI_URL + "metadata.json";
        aiModel = await tmImage.load(modelURL, metadataURL);
        maxPredictions = aiModel.getTotalClasses();
    }
}

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const spinner = document.getElementById("loading-spinner");
    const previewContainer = document.getElementById("image-preview-container");
    const faceImage = document.getElementById("face-image");
    const labelContainer = document.getElementById("label-container");
    const resultMessage = document.getElementById("ai-result-message");

    spinner.classList.remove("hidden");
    labelContainer.innerHTML = "";
    resultMessage.innerHTML = "";
    resultMessage.classList.add("hidden");
    previewContainer.classList.add("hidden");

    const reader = new FileReader();
    reader.onload = async (e) => {
        faceImage.src = e.target.result;
        previewContainer.classList.remove("hidden");
        await loadModel();
        setTimeout(async () => {
            const prediction = await aiModel.predict(faceImage);
            displayResults(prediction);
            spinner.classList.add("hidden");
        }, 200);
    };
    reader.readAsDataURL(file);
}
window.handleImageUpload = handleImageUpload;

function displayResults(prediction) {
    const labelContainer = document.getElementById("label-container");
    const resultMessage = document.getElementById("ai-result-message");
    labelContainer.innerHTML = "";

    let highestProb = 0;
    let bestMatch = "";

    for (let i = 0; i < maxPredictions; i++) {
        const probValue = prediction[i].probability;
        const className = prediction[i].className;
        const classTitle = className === "Class 1" ? "강아지" : 
                           className === "Class 2" ? "고양이" : className;
        const probability = (probValue * 100).toFixed(0);
        
        if (probValue > highestProb) {
            highestProb = probValue;
            bestMatch = classTitle;
        }

        const barContainer = document.createElement("div");
        barContainer.className = "prediction-bar-container";
        const bar = document.createElement("div");
        bar.className = "prediction-bar";
        bar.style.width = probability + "%";
        const label = document.createElement("span");
        label.className = "prediction-label";
        label.innerHTML = `${classTitle}: ${probability}%`;
        
        if (probability > 50) bar.style.background = "var(--accent-color)";
        else bar.style.background = "rgba(255, 255, 255, 0.3)";
        
        barContainer.appendChild(bar);
        barContainer.appendChild(label);
        labelContainer.appendChild(barContainer);
    }

    if (highestProb > 0) {
        resultMessage.classList.remove("hidden");
        let title = "", desc = "", subDesc = "", emoji = "";
        
        if (bestMatch === "강아지") {
            emoji = "🐶";
            title = "당신은 사랑스러운 강아지상!";
            desc = "다정하고 붙임성 있는 성격으로 주변 사람들에게 긍정적인 에너지를 주시는군요! 웃는 모습이 매력적이며 누구에게나 편안함을 주는 타입입니다.";
            subDesc = "✨ 특징: 선한 눈매, 밝은 미소, 활발한 소통 능력, 강한 친화력";
        } else if (bestMatch === "고양이") {
            emoji = "🐱";
            title = "당신은 시크한 고양이상!";
            desc = "도도하고 지적인 분위기를 풍기며, 알면 알수록 깊은 매력을 가진 분이시네요! 신비로운 첫인상과 함께 세련된 분위기가 돋보이는 타입입니다.";
            subDesc = "✨ 특징: 날카롭지만 매혹적인 눈매, 신비로운 분위기, 독립적인 성향, 섬세한 감성";
        } else {
            emoji = "🤔";
            title = `당신은 유니크한 ${bestMatch}상!`;
            desc = "독특하고 개성 넘치는 매력을 가지고 계시네요! 자신만의 분위기로 주변의 시선을 사로잡는 타입입니다.";
            subDesc = "✨ 특징: 예측 불가능한 매력, 강한 존재감, 남다른 패션 감각";
        }
        
        resultMessage.innerHTML = `
            <div class="result-emoji">${emoji}</div>
            <h4>${title}</h4>
            <div class="result-desc">${desc}</div>
            <div class="result-sub-desc">${subDesc}</div>
            <div class="share-hint">친구들에게도 당신의 매력을 공유해 보세요!</div>
        `;
    }
}
