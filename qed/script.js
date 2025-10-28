/**
 * 사용자의 추측(guess)과 정답(answer)을 비교하여
 * '위치와 숫자가 모두 맞는' 항목의 개수만 반환합니다.
 * @param {string} guess - 사용자가 입력한 5자리 숫자 문자열
 * @param {string} answer - 정답 5자리 숫자 문자열
 * @returns {number} - 위치가 맞는 숫자의 개수 (0~5)
 */
function checkGuess(guess, answer) {
    let exactMatches = 0; // 위치와 숫자가 모두 맞는 개수

    for (let i = 0; i < DIGITS; i++) {
        // 정확한 위치와 숫자가 일치하는 경우
        if (guess[i] === answer[i]) {
            exactMatches++;
        }
    }

    // Wordle의 '숫자만 맞음' (노란색) 로직은 필요 없으므로 생략합니다.
    return exactMatches;
// script.js 파일의 updateGameStatus 함수를 다음 코드로 대체하세요.

// 보드에 추측 숫자를 표시 (색상 피드백 없이 숫자만 표시)
function displayGuess(guess, exactMatches) {
    const row = document.getElementById(`row-${currentAttempt}`);
    
    // 1. 타일에 입력된 숫자를 표시
    for (let i = 0; i < DIGITS; i++) {
        const tile = document.getElementById(`tile-${currentAttempt}-${i}`);
        tile.textContent = guess[i];
        tile.classList.add('filled-tile'); // (옵션) 숫자가 채워진 타일 스타일 추가
    }
    
    // 2. 메시지 영역에 피드백 개수 표시
    const feedbackMessage = `✅ 맞는 위치의 숫자 개수: ${exactMatches}개`;
    const messageRow = document.createElement('div');
    messageRow.classList.add('feedback-message');
    messageRow.textContent = feedbackMessage;
    
    // 현재 시도하는 줄 아래에 메시지 추가 (단순화를 위해 messageArea에 표시해도 무방)
    document.getElementById('message-area').textContent = feedbackMessage; 
    
    // 타일은 색칠하지 않으므로, 이 부분을 생략하거나 주석 처리합니다.
}

// 게임 상태 업데이트 (수정)
function updateGameStatus(guess, exactMatches) {
    // 1. 보드에 추측 숫자 표시 및 개수 메시지 출력
    displayGuess(guess, exactMatches); 
    
    if (exactMatches === DIGITS) {
        // 정답을 맞춤 (5개 모두 맞음)
        document.getElementById('message-area').textContent = `🎉 축하합니다! ${currentAttempt + 1}번 만에 정답 ${ANSWER}를 맞췄습니다!`;
        gameOver = true;
    } else if (attemptsLeft - 1 === 0) {
        // 모든 시도 횟수를 소진
        document.getElementById('message-area').textContent = `😭 실패! 정답은 ${ANSWER} 였습니다.`;
        gameOver = true;
    }

    if (gameOver) {
        guessInput.disabled = true;
        submitButton.disabled = true;
    } else {
        attemptsLeft--;
        currentAttempt++;
        guessInput.value = ''; // 입력 필드 초기화
        guessInput.focus();
    }
}
}