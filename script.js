// 테마 전환 관련 로직
const themeBtn = document.getElementById('theme-btn');
if (themeBtn) {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);

    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });
}

function updateThemeButton(theme) {
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '🌙 다크 모드' : '☀️ 라이트 모드';
}

// 로또 추첨 로직
const drawBtn = document.getElementById('draw-btn');
if (drawBtn) {
    drawBtn.addEventListener('click', drawNumbers);
}

function drawNumbers() {
    const btn = document.getElementById('draw-btn');
    const container = document.getElementById('result-container');
    if (!btn || !container) return;

    btn.disabled = true;
    btn.textContent = '행운을 부르는 중... ✨';
    container.innerHTML = '';
    
    const numbers = [];
    for (let i = 1; i <= 45; i++) numbers.push(i);
    
    const selected = [];
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        selected.push(numbers[randomIndex]);
        numbers.splice(randomIndex, 1);
    }
    
    selected.sort((a, b) => a - b);
    
    selected.forEach((num, index) => {
        setTimeout(() => {
            createBall(num, container);
            if (index === 5) {
                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = '다시 뽑기! 🍀';
                }, 500);
            }
        }, index * 600);
    });
}

function createBall(number, container) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.textContent = number;
    
    if (number >= 1 && number <= 10) ball.classList.add('color-yellow');
    else if (number >= 11 && number <= 20) ball.classList.add('color-blue');
    else if (number >= 21 && number <= 30) ball.classList.add('color-red');
    else if (number >= 31 && number <= 40) ball.classList.add('color-gray');
    else ball.classList.add('color-green');
    
    container.appendChild(ball);
    setTimeout(() => ball.classList.add('show'), 50);
}

// 저녁 메뉴 추천 로직
const menus = [
    { name: "삼겹살", icon: "🥓" },
    { name: "치킨", icon: "🍗" },
    { name: "피자", icon: "🍕" },
    { name: "스시", icon: "🍣" },
    { name: "떡볶이", icon: "🥘" },
    { name: "파스타", icon: "🍝" },
    { name: "햄버거", icon: "🍔" },
    { name: "비빔밥", icon: "🥗" },
    { name: "돈까스", icon: "🍛" },
    { name: "스테이크", icon: "🥩" },
    { name: "쌀국수", icon: "🍜" },
    { name: "짜장면", icon: "🍜" },
    { name: "마라탕", icon: "🍲" },
    { name: "라멘", icon: "🍜" },
    { name: "타코", icon: "🌮" }
];

const recommendBtn = document.getElementById('recommend-btn');
if (recommendBtn) {
    recommendBtn.addEventListener('click', () => {
        const menuIcon = document.getElementById('menu-icon');
        const menuName = document.getElementById('menu-name');
        
        recommendBtn.disabled = true;
        recommendBtn.textContent = "맛있는 메뉴 고르는 중... ⏳";
        
        // 애니메이션 효과
        let count = 0;
        const interval = setInterval(() => {
            const randomMenu = menus[Math.floor(Math.random() * menus.length)];
            menuIcon.textContent = randomMenu.icon;
            menuName.textContent = randomMenu.name;
            count++;
            
            if (count > 10) {
                clearInterval(interval);
                const finalMenu = menus[Math.floor(Math.random() * menus.length)];
                menuIcon.textContent = finalMenu.icon;
                menuName.textContent = "오늘의 추천: " + finalMenu.name + "!";
                recommendBtn.disabled = false;
                recommendBtn.textContent = "다른 메뉴 추천받기! 🍴";
            }
        }, 100);
    });
}
