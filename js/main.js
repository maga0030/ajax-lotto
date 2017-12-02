document.addEventListener("DOMContentLoaded", init);

function init() {
    // when the html and JS finish loading run this script
    document.getElementById('btnSend').addEventListener("click", getNumbers);
    document.getElementById('btnBack').addEventListener("click", nav);
}

function nav(event) {
    let btn = event.target;
    console.log(btn.id);
    
    if (btn.id == "btnSend") {
        document.getElementById("home").classList.remove("active");
        document.getElementById("list").classList.add("active");
        //getNumbers();
    } else if (btn.id == "btnBack") {
        document.getElementById("home").classList.add("active");
        document.getElementById("list").classList.remove("active");
    }
}

function makeURL() {
    let url = "http://localhost/mad9014-lotto/nums.php";
    let fd = new FormData();
    //?digits=4&max=345
    let digits = document.getElementById('digits');
    let max = document.getElementById('max');
    // url = ${variable} rest of string ${another variable};

    url = `${url}digits=${digits.value}&max=${max.value}`;
    
    return url;
}

function getNumbers(event) {
    event.preventDefault();
    let url = "http://localhost/mad9014-lotto/nums.php";
    
    let fd = new FormData();
    let digits = document.getElementById('digits');
    let max = document.getElementById('max');
    
    let dv = digits.value;
    let mv = max.value;
    
    if (parseInt(mv) < (parseInt(dv) * 2)) {
        // the max value must be at least double the digits
        // tell user to try again
        document.getElementById('btnBack').dispatchEvent(new MouseEvent('click'));
        alert("Your max value is too low");
    } else if (isNaN(mv) || isNaN(dv)) {
        // BOTH value must be numbers
        alert("You must provide numeric values for digits and max");
    } else {
    
        //sdo the fetch
        //all the other code from below goes here
        nav(event);
        fd.append('digits', digits.value);
        fd.append('max', max.value);

        let h = new Headers();
        let info = {
            method: 'POST',
            headers: h,
            body: fd
        };

        //let url = makeURL();

        fetch(url, info)
        .then(response => {
            console.dir(response); // see the response in the console
            return response.json();
        }) // passed in => returned
        .then(data => {
            if (data.code == 0) {
                // code 0 means there were no errors on the server
                let ul = document.querySelector("ul.num_list");
                ul.innerHTML = "";
                data.numbers.forEach((num) => {
                    let li = document.createElement("li");
                    li.className = "num";
                    li.textContent = num;
                    ul.appendChild(li);
                });
            } else {
                // the code was bad
            }
        });
    }
    
}