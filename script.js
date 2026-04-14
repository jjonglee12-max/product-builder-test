document.getElementById('draw-btn').addEventListener('click', drawNumbers);

function drawNumbers() {
    const btn = document.getElementById('draw-btn');
    const container = document.getElementById('result-container');
    
    // 버튼을 비활성화해서 추첨 중에 또 누르지 못하게 합니다.
    btn.disabled = true;
    btn.textContent = '행운을 부르는 중... ✨';
    
    // 이전 결과 지우기
    container.innerHTML = '';
    
    // 1부터 45까지 번호 배열 만들기
    const numbers = [];
    for (let i = 1; i <= 45; i++) {
        numbers.push(i);
    }
    
    const selected = [];
    
    // 6개의 랜덤 번호를 중복 없이 뽑기
    for (let i = 0; i < 6; i++) {
        // 남은 번호들 중에서 랜덤으로 하나 고릅니다.
        const randomIndex = Math.floor(Math.random() * numbers.length);
        // 뽑힌 번호를 결과 배열에 넣습니다.
        selected.push(numbers[randomIndex]);
        // 뽑힌 번호는 풀(pool)에서 제거하여 중복을 방지합니다.
        numbers.splice(randomIndex, 1);
    }
    
    // 번호를 보기 좋게 오름차순으로 정렬!
    selected.sort((a, b) => a - b);
    
    // 조금씩 시차를 두고 공이 하나씩 나타나게 하는 애니메이션!
    selected.forEach((num, index) => {
        setTimeout(() => {
            createBall(num, container);
            
            // 6번째 마지막 공까지 다 나왔으면 버튼을 다시 켤 수 있게 합니다.
            if (index === 5) {
                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = '다시 뽑기! 🍀';
                }, 500); // 마지막 공 나오고 0.5초 뒤에 버튼 활성화
            }
        }, index * 600); // 0.6초마다 공이 하나씩 나옴
    });
}

function createBall(number, container) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.textContent = number;
    
    // 번호 대역별로 한국 로또 기준의 색상을 입혀줍니다.
    if (number >= 1 && number <= 10) {
        ball.classList.add('color-yellow');
    } else if (number >= 11 && number <= 20) {
        ball.classList.add('color-blue');
    } else if (number >= 21 && number <= 30) {
        ball.classList.add('color-red');
    } else if (number >= 31 && number <= 40) {
        ball.classList.add('color-gray');
    } else {
        ball.classList.add('color-green');
    }
    
    container.appendChild(ball);
    
    // 약간의 딜레이(50ms) 후 CSS의 show 클래스를 추가해서 통통 튀는 애니메이션 작동
    setTimeout(() => {
        ball.classList.add('show');
    }, 50);
}
