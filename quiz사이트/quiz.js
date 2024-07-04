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
            infoAnswer: "AND",
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

    const  answerchecks = document.querySelectorAll("input[type=radio]"); 
    const nextQuestionBtn = document.querySelector(".nextQuestionBtn");
    let userAnswers = [];

    let currentQeustionNum = 1;

    if(currentQeustionNum == 1 ) nextQuiz();

    nextQuestionBtn.addEventListener("click", function() {
        if(currentQeustionNum == MAXNUMBER) nextQuestionBtn.remove();
        let flag = true; 
        answerchecks.forEach( check  => {
            if (check.checked) { 
                userAnswers.push(Number(check.value));
                nextQuiz();
                flag = false;
                console.log(userAnswers)
            }
        });
       if(flag) alert("All questions must be answered");
    });

    
    

    function nextQuiz() {
        let currentQeustion = document.querySelector(".question");
        let currentAnswers = [];
        let selectedAnswers = 0;
        let cnt = 0;

        currentQeustion.textContent = `${currentQeustionNum}. ${quizInfo[currentQeustionNum-1].infoQuestion}`;



        const answers = document.querySelectorAll(".answer");  
        answers.forEach(answer => { 
            answer.textContent = quizInfo[currentQeustionNum-1].infoChoice[cnt++];
        });
     
        currentQeustionNum++;
        increaseProgress();

        // 다음문제로 넘어갈때 모든 radio 버튼 체크 해제
        answerchecks.forEach( check  => {
            check.checked = false;
        });
    }

    function beforeQeution(){

    }



    function increaseProgress() {
        const progressBar = document.getElementById('fileProgress');
        if (progressBar.value < 100) {
            progressBar.value += 16.66666;
        }
    }

});