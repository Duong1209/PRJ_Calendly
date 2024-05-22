//calendar
const currentMonth = document.querySelector(".month_year"),
daysTag = document.querySelector(".days"),
PrevNextIcon = document.querySelectorAll(".icons span");


let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth(),
currDay = date.getDate();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDateofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofPrevMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDateofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofPrevMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                    && currYear === new Date().getFullYear() ? "today" : "";
        let isFuture = currDay < i && currMonth === new Date().getMonth()
                    && currYear === new Date().getFullYear() ? "selectable" : "";
        liTag += `<li class="${isToday} ${isFuture}" onclick="selectDate(this)">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;  
    }
       
    currentMonth.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

function selectDate(element) {
    if (element.classList.contains("selectable")) {
        const allDays = document.querySelectorAll(".days li");
        allDays.forEach(day => {
          day.classList.remove("active");
        });
        element.classList.add("active");
    }
}

PrevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        
        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});

//AM,PM
const optionMenu = document.querySelector(".select_menu"),
        selectBtn = optionMenu.querySelector(".select_btn"),
        options = optionMenu.querySelectorAll(".time_option"),
        sBtn_text = optionMenu.querySelector(".sbtn_text");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("rotate"));

options.forEach(option =>{
    option.addEventListener("click", () => {
        let selectedOption =  option.querySelector(".option_text").innerText;
        sBtn_text.innerText = selectedOption; 
        
        optionMenu.classList.remove("rotate");

    })
})

//Input_number
function formatInput1(input) {
    if(input.value.length > 2) {
        input.value = input.value.slice(-2);
    }
    if (input.value.length === 1) {
        input.value = '0' + input.value;
    }
    if (parseInt(input.value) > 12) {
        input.value = '12';
    }
}

function formatInput2(input) {
    if(input.value.length > 2) {
        input.value = input.value.slice(-2);
    }
    if (input.value.length === 1) {
        input.value = '0' + input.value;
    }
    if (parseInt(input.value) > 59) {
        input.value = '59';
    }
}


//upload
const form = document.querySelector("form"),
fileInput = form.querySelector(".file_input"),
progressArea = document.querySelector(".progress_area"),
uploadedArea = document.querySelector(".uploaded_area");

form.addEventListener("click", () => {
    fileInput.click();
})

fileInput.onchange = ({target}) =>{
    let file = target.files[0];
    if(file){
        let fileName = file.name;
        uploadFile(fileName);
    }
}

function uploadFile(name){
    
}


//search
const searchWrapper = document.querySelector(".search_input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".auto_com");

inputBox.onkeyup = (e) =>{
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){
        emptyArray = suggName.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
       emptyArray = emptyArray.map((data)=>{
        return data = '<li>' + data + '</li>';
       });
       console.log(emptyArray);
       searchWrapper.classList.add("sugg");
       showSuggestions(emptyArray); 
       let allList = suggBox.querySelectorAll("li");
       for (let i = 0; i < allList.length; i++) {
        allList[i].setAttribute("onclick", "select(this)");
       }
    }else{
        searchWrapper.classList.remove("sugg");
    }
}

function select(element){
    let selectUserData = element.textContent;
    inputBox.value = selectUserData;
    searchWrapper.classList.remove("sugg");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>' + userValue + '</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

//popup
let popup = document.getElementById("popup");

function openPopup(){
    popup.classList.add("open_popup");
}
function closePopup(){
    popup.classList.remove("open_popup");
}