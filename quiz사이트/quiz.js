document.addEventListener("DOMContentLoaded", function() {

    const MAXNUMBER = 6;
    const quizInfo = [
        {
            infoQuestion : "아래의 논리 대수식을 갖는 게이트(gate)는?",
            infoChoice : ["NOR", "AND", "NAND", "XOR"],
            infoAnswer: 1,
            infoDesc : "<br>AND 전체에 NOT가 되어 있습니다.<br>NOT AND 이므로 NAND가 됩니다."
        },{
            infoQuestion : "2진수 1011을 그레이코드(gray code)로 변환하면?",
            infoChoice : ["1010", "0100", "0111", "1110"],
            infoAnswer: 4,
            infoDesc : "<br>2진수를 그레이코드로 변환하는 방법은 첫번째 숫자는 그냥 내리고 나머지는 옆에것을 더해서 내려주면 됩니다."
        },{
            infoQuestion : "이항(binary) 연산에 해당하는 것은?",
            infoChoice : ["COMPLEMENT", "AND", "ROTATE", "SHIFT"],
            infoAnswer: 2,
            infoDesc : "<br>단항연산 : ROTATE, SHIFT, MOVE, NOT(COMPLEMENT) 입니다. "
        },{
            infoQuestion : "다음 그림의 연산결과는?",
            infoChoice : ["1010", "1110", "1101", "1001"],
            infoAnswer: 1,
            infoDesc : "<br>1110 AND 1010의 결과를 묻는 문제 입니다."
        },{
            infoQuestion : "인스트럭션 레지스터(Instruction register), 부호기, 번지해독기, 제어계수기 등과 관계있는 장치는?",
            infoChoice : ["제어장치", "연산장치", "입력장치", "기억장치"],
            infoAnswer: 1,
            infoDesc : "<br>제어 계수기에서 힌트를 얻을수 있습니다.<br>제어장치의 일종입니다."
        },{
            infoQuestion : "언어번역 프로그램(Language translator)에 해당하지 않는 것은?",
            infoChoice : ["컴파일러", "어셈블러", "인터프리터", "로더"],
            infoAnswer: 4,
            infoDesc : "<br>로더는 번역된 프로그램을 실행하는데 관련이 있습니다.<br>간단히 실행관련이라고 할수 있습니다."
        }
    ];


    let progressBar = document.getElementById('fileProgress');
    const  answerchecks = document.querySelectorAll("input[type=radio]"); 
    const nextQuestionBtn = document.querySelector(".nextQuestionBtn");
    const prevQuestionBtn = document.querySelector(".prevQeustionBtn");
    const submitBtn = document.querySelector(".submitBtn");

    const resultModal = document.getElementById("resultModal");
    const closeBtn = document.querySelector(".closeBtn");
    const correctCountElem = document.getElementById("correctCount");
    const incorrectCountElem = document.getElementById("incorrectCount");
    const detailedResultsElem = document.getElementById("detailedResults");

    let userAnswers = [];
    let currentQuestionNum = 1;


    if (currentQuestionNum === 1) nextQuiz();

    function updateButtonVisibility() {
        if (currentQuestionNum !== 1) prevQuestionBtn.classList.remove("hidden");
        else prevQuestionBtn.classList.add("hidden");

        if (currentQuestionNum !== MAXNUMBER) {
            submitBtn.classList.add("hidden");
            nextQuestionBtn.classList.remove("hidden");
        } else {
            submitBtn.classList.remove("hidden");
            nextQuestionBtn.classList.add("hidden");
        }
    }

    prevQuestionBtn.addEventListener("click", function() {
        if (currentQuestionNum > 1) {
            currentQuestionNum--;
            prevQuiz();
        }
    });

    nextQuestionBtn.addEventListener("click", function() {
        let flag = true; 
        answerchecks.forEach( check  => {
            if (check.checked) { 
                userAnswers.push(Number(check.value));
                console.log(userAnswers);
                currentQuestionNum++;
                nextQuiz();
                flag = false;
            }
        });
       if(flag) alert("All questions must be answered");
    });

    submitBtn.addEventListener("click", function() {
        let flag = true; 
        answerchecks.forEach( check  => {
            if (check.checked) { 
                userAnswers.push(Number(check.value));
                console.log(userAnswers);
                flag = false;
            }
        });
       if(flag) alert("All questions must be answered");

        showResults();
        resultModal.classList.add("show");
    });

    closeBtn.addEventListener("click", function() {
        resultModal.classList.remove("show");
    });
    
    

    function nextQuiz() {
        let currentQeustion = document.querySelector(".question");
        let cnt = 0;

        currentQeustion.textContent = `${currentQuestionNum}. ${quizInfo[currentQuestionNum-1].infoQuestion}`;



        const answers = document.querySelectorAll("label");  
        answers.forEach(answer => { 
            answer.textContent = quizInfo[currentQuestionNum-1].infoChoice[cnt++];
        });     

        increaseProgress();

        // 다음문제로 넘어갈때 모든 radio 버튼 체크 해제
        answerchecks.forEach( check  => {
            check.checked = false;
        });
        updateButtonVisibility();
    }

    function prevQuiz() {
        let currentQuestion = document.querySelector(".question");
        let cnt = 0;

        currentQuestion.textContent = `${currentQuestionNum}. ${quizInfo[currentQuestionNum - 1].infoQuestion}`;

        const answers = document.querySelectorAll("label");  
        answers.forEach(answer => {
            answer.textContent = quizInfo[currentQuestionNum - 1].infoChoice[cnt++];
        });

        // 이전 답변 복원
        answerchecks.forEach((check, index) => {
            console.log(currentQuestionNum+" "+userAnswers[currentQuestionNum - 1] + " " + (index+1));
            if (userAnswers[(currentQuestionNum-1)] == index+1) {
                
                check.checked = true;
                userAnswers.pop();
            }
        });

        decreaseProgress();

        updateButtonVisibility();
    }



    function increaseProgress() {

        if (progressBar.value < 100) {
            progressBar.value += 100 / MAXNUMBER;
        }
    }

    function decreaseProgress() {
        if (progressBar.value > 0) {
            progressBar.value -= 100 / MAXNUMBER;
        }
    }

    function showResults() {
        let correctCount = 0;
        let incorrectCount = 0;
        detailedResultsElem.innerHTML = '';

        quizInfo.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const correctAnswer = question.infoAnswer;

            let resultHTML = `<p>${index + 1}번 문제: ${question.infoQuestion}</p>`;
            resultHTML += `<p>사용자 정답: ${question.infoChoice[userAnswer-1]}</p>`;
            resultHTML += `<p>문제 정답: ${question.infoChoice[correctAnswer-1]}</p>`;

            if (userAnswer === correctAnswer) {
                correctCount++;
            } else {
                incorrectCount++;
                resultHTML += `<p>해설: ${question.infoDesc}</p>`;
            }

            detailedResultsElem.innerHTML += resultHTML + '<hr>';
        });

        correctCountElem.textContent = correctCount;
        incorrectCountElem.textContent = incorrectCount;
    }


});