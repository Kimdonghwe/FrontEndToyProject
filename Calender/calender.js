document.addEventListener("DOMContentLoaded", function() {
    const monthYear = document.getElementById("monthYear");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");

    let currentYear = 2024;
    let currentMonth = 0; // 0: January, 1: February, ..., 11: December

    function updateCalendar() {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // 달력 날짜 부분 업데이트
        calendarBody.innerHTML = ""; // 기존 내용을 지웁니다.

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // 첫 주의 이전 달 날짜를 빈 칸으로 채웁니다.
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            calendarBody.appendChild(emptyCell);
        }

        // 현재 달의 날짜를 채웁니다.
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement("div");
            dayCell.textContent = day;
            calendarBody.appendChild(dayCell);
        }
    }

    prevMonthBtn.addEventListener("click", function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextMonthBtn.addEventListener("click", function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // 초기 달력 업데이트
    updateCalendar();
});