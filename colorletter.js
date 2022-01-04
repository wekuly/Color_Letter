$(document).ready(function () {

    const GAME_TIMER = 4;
    const QUETION = 10; //문제수
    let timeinterval;
    let time = GAME_TIMER;
    let score = 0;
    let remain = QUETION;
    let all_timer_m = 0;
    let all_timer_s = 0;
    let alltime;
    let time_m = document.querySelector(".time_m");
    let time_s = document.querySelector(".time_s");
    const another_way = document.querySelector(".another_way");
    const scoreview = document.querySelector(".score")
    const timer = document.querySelector(".time");
    const start = document.querySelector(".start_btn");
    const LSbtn = document.querySelector(".LSbtn");
    const remainview = document.querySelector(".remain");

    function setting() {//세팅
        $(".start_view, .start_view_btn").hide();
        $("#game,.game_mission,#answer,.score_box,.start_and_load").hide();
        $(".finnaly_view").hide();
    }
    function first_view() {// Start_view 시작화면

        setTimeout(function () {
            $(".start_view").fadeIn(1000)
            setTimeout(function () {
                $(function () {
                    $(".start_view").animate({
                        top: "200px"
                    }, { duration: 2000, queue: false });
                    $(".start_view h1").animate({
                        fontSize: '70px'
                    }, { duration: 2000, queue: false });
                    $(".start_view h2").animate({
                        fontSize: '40px'
                    }, { duration: 2000, queue: false });
                }, 1000);
                $(".start_view_btn").fadeIn(3000)
            }, 2000);
        }, 1000);

        //버튼 호버
        $(".start_view_btn div").hover(function () {
            $(this).addClass("btn_hover");
        }, function () {
            $(this).removeClass("btn_hover");
        });
    }
    function Load_and_Start() {//준비화면
        $("#game,.game_mission,#answer,.score_box,.start_and_load").fadeIn(0);
        $("#gameview p").hide();
    }
    function gaming() {//게임진행
        $(start).click(function () {//게임준비화면 넘어가는 버튼
            Load_and_Start();
            btnchange("START");

        });
        // start.addEventListener("click", Load_and_Start); 랑 같음
        //이걸 누르면 준비화면으로 넘어가야됨.
        $(LSbtn).click(function () {//찐 게임시작 버튼
            LSbtn.Disabled = false; //더 클릭안됨
            btnchange("게임 중");
            Color_letter_Main();
            //총게임시간 시간초 시작
            all_timer();
            $("#answer").focus();
            //input 커서 마우스 클릭할필요없이 되게 만들기
        });
    }
    function Color_letter_Main() {//main, 게임시작
        $("#gameview >h2").hide();
        ran_color();
        run(time);
        check();
        remainview.innerText = remain;
    }
    function btnchange(text) {//버튼바꾸기
        LSbtn.innerText = text;
        text == "START" ? LSbtn.classList.remove("loading") : LSbtn.classList.add("loading");
    }
    function ran_color() {//색깔, 글자 서로 다르게 랜덤으로 뽑는 메소드
        let splice_arr = new Array("red", "gold", "green", "blue");
        function randomItem(a) {
            return a[Math.floor(Math.random() * a.length)];
        }
        function ran_case() {
            let choice_color = randomItem(splice_arr);
            $("#gameview p").css("color", choice_color);
            if (choice_color == "red") {
                $(another_way).empty().append("빨강");
                // $(another_way).css("color", choice_color);
            }
            else if (choice_color == "gold") {
                $(another_way).empty().append("노랑");

                // $(another_way).css("color", choice_color);
            }
            else if (choice_color == "green") {
                $(another_way).empty().append("초록");
                // $(another_way).css("color", choice_color);
            }
            else if (choice_color == "blue") {
                $(another_way).empty().append("파랑");
                // $(another_way).css("color", choice_color);
            }
            else {
                $(another_way).empty();
                $(another_way).append("오류");
                // $(another_way).css("color", choice_color);
            }
        }
        $("#gameview p").hide();
        let color_letter = Math.floor(Math.random() * 4);  //0~3
        switch (color_letter) {
            case 0:
                $("#gameview p:nth-child(1)").fadeIn(0);
                splice_arr.splice(0, 1);
                ran_case();
                break;
            case 1:
                $("#gameview p:nth-child(2)").fadeIn(0);
                splice_arr.splice(1, 1);
                ran_case();
                break;
            case 2:
                $("#gameview p:nth-child(3)").fadeIn(0);
                splice_arr.splice(2, 1);
                ran_case();
                break;
            default:
                $("#gameview p:nth-child(4)").fadeIn(0);
                splice_arr.splice(3, 1);
                ran_case();
                break;
        }
    }
    function Q_remain() {//남은횟수줄이기
        remain--;
        remainview.innerText = remain;
    }
    function check() {//정답인지 아닌지 체크
        answer.addEventListener('change', () => {
            if (answer.value === another_way.innerText) {
                score++;
                scoreview.innerText = score;
            }
            next();
        })
    }
    function next() {//다음문제
        clearInterval(timeinterval);
        Q_remain();
        if (remain > 0) {
            ran_color();
            answer.value = null;
            run(time + 1);
        }
        else {
            finnaly();
        }
    }
    function all_timer() {//총 걸린시간 타이머
        alltime = setInterval(function () {

            all_timer_s++;
            if (all_timer_s < 10) {
                time_s.innerText = '0' + all_timer_s;
            }
            else {
                time_s.innerText = all_timer_s;
            }

            if (all_timer_s == 59) {//1분
                all_timer_s = -1;
            }
            else if (all_timer_s == 0) {
                all_timer_m++;
                if (all_timer_m < 10) {
                    time_m.innerText = '0' + all_timer_m;
                }
                else {
                    time_s.innerText = all_timer_s;
                }
            }

        }, 1000);
    }
    function run(t) {//시간초줄이기
        blink();
        t = GAME_TIMER;
        timeinterval = setInterval(function () {
            t > 1 ? t-- : next();
            timer.innerText = t;
        }, 1000);
    }
    function blink() {//깜박임 효과 
        $(".time").css("color", "black");
        setTimeout(function () {
            $(".time").css("color", "white");
        }, 1000);

    }
    function finnaly() {//마지막화면 
        clearInterval(alltime);
        setting();
        $("#first_view").hide();
        $(".finnaly_view").show();
        $(".fin_score p:nth-child(2)").append(all_timer_m * 60 + all_timer_s + '초');
        $(".fin_score p:nth-child(3)").append(score + '개');
        $(".fin_score p:nth-child(4)").append(score / 10 * 100 + '%');
        fin_hover();
    }
    function replay() {//다시하기
        $(".replay").click(function () {
            location.reload();
        });
    }
    function fin_hover() {//버튼호버
        $(".replay , .exit").hover(function () {
            $(this).addClass("fin_hover");
        }, function () {
            $(this).removeClass("fin_hover");
        });
    }
    function exit() {//종료하기
        $(".exit").click(function () {
            alert("종료합니다");
            window.open('', '_self', '');
            window.close();
            //이거 왜안됌 ㅡㅡ
        });
    }



    setting();
    first_view();
    gaming();
    replay();
    exit();


    //나중에 제이쿼리 싹다 없애보기.
});
