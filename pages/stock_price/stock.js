
const sub = document.getElementById('submit');
var tmp = document.getElementById('type');
tmp.value = "detail";
var drp_val = undefined;
var drp = document.getElementById("dropdown");
fetch("https://nse-data1.p.rapidapi.com/market_status", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nse-data1.p.rapidapi.com",
		"x-rapidapi-key": "84768dadcamshd470306e6f403eap1aaba7jsn7ab208e5f3cf"
	}
})
.then(response => {
	return response.json();
})
.then(res => {
    // console.log(res);
    var marketname = res['body']['marketState'][0]["market"];
    var marketstatus = res['body']['marketState'][0]["marketStatus"];
    if(marketname == undefined){
        document.getElementById("scroll-container").style.display = "none";
    }
    else{
        document.getElementById("scroll-text").innerText = `The ${marketname} is ${marketstatus}`
    }
})
.catch(err => {
	// document.getElementById("scroll-container").style.display = "none";
});

tmp.addEventListener("change",function(){
    
    drp.style.setProperty("margin-top","4px");
    drp.style.setProperty("margin-bottom","2px");
    drp.style.display = "block";
    drp_val = drp.value.toString();

})

sub.addEventListener('click',function(e){

    e.preventDefault();
    if(drp_val != undefined){
        drp_val = drp.value.toString();
    }
    const stock_name_temp = document.getElementById('symbol').value;
    const stock_name = stock_name_temp.replace(" ","%20").toString();
    const query = document.getElementById('type').value.toString();
    const induct = document.getElementById('ms').value;
    
    if(induct === 'nifty50'){
        var val = 'nifty_fifty_indices_data';
    }
    else if(induct === 'niftyc'){
        var val = 'nifty_commodity_indices_data';
    }
    else{
        var val = 'nifty_bank_indices_data';
    }

    var arr = [];
    if(query === "detail"){
        fetch(`https://nse-data1.p.rapidapi.com/search_stock?stockname=${stock_name}`, {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-host": "nse-data1.p.rapidapi.com",
		"x-rapidapi-key": "1a2e9897d9mshf8bf85b05e1ea96p15b004jsn0355d9ce7341"
	    }
        })
        .then(response => {
	        return response.json();
        })
        .then(res => {
            for(let i=0;i<res['body']['symbols'].length;i++){
                arr.push(res['body']['symbols'][i]['symbol']);
            }
            // console.log(arr);
        })
        .catch(err => {
            console.error(err);
        });

        setTimeout(send,4000);
        function send(){
            fetch(`https://nse-data1.p.rapidapi.com/${val}`, {
            "method": "GET",
            "headers": {
            "x-rapidapi-host": "nse-data1.p.rapidapi.com",
            "x-rapidapi-key": "1a2e9897d9mshf8bf85b05e1ea96p15b004jsn0355d9ce7341"
            }
            })
            .then(response => {
                return response.json();
            })
            .then(res => {
                console.log(res);
                let cnt = 0
                if(Object.keys(res["body"]).length === 0){
                    let g = document.createElement("h5");
                    let rtext = document.createTextNode("No data found,try after some time");
                    g.appendChild(rtext);
                    g.style.color = "red";
                    g.style.display = "absolute";
                    g.style.top = "60px";
                    document.querySelector('body').appendChild(g);
                    return;
                }
                for(let i=0;i<res["body"]["data"].length;i++){
                    if(arr.includes(res["body"]["data"][i]["symbol"])){
                        if(cnt === 0){
                            var bd = document.getElementsByTagName('body')[0];
                            bd.innerHTML = '<div class="card"></div>';
                            const card = document.getElementsByClassName('card')[0];
                            card.innerHTML = `<p class="stockname"><i>Stock name - ${res['body']['data'][i]['symbol']}</i></p>
                            <br><p class="open">Open price: ${res['body']['data'][i]['open']}</p>
                            <br><p class="todayhigh">Today's Highest: ${res['body']['data'][i]['dayHigh']}</p>
                            <br><p class="todaylow">Today's lowest: ${res['body']['data'][i]['dayLow']}</p>
                            <br><p class="currentprice">Last traded price: ${res['body']['data'][i]['lastPrice']}</p>
                            <br><p class = "previousclose">Prev close: ${res['body']['data'][i]['previousClose']}</p>
                            <br><p class="change">Change: ${res['body']['data'][i]['change']}</p>
                            <br><p class="pchange">% change: ${res['body']['data'][i]['pChange']}</p>
                            <br><p class="yearhigh">year High: ${res['body']['data'][i]['yearHigh']}</p>
                            <br><p class="yearlow">year Low: ${res['body']['data'][i]['yearLow']}</p>
                            <br><p class="pchangeyear">%Change in year: ${res['body']['data'][i]['perChange365d']}</p>
                            <br><p class="pchangemonth">%Change in month: ${res['body']['data'][i]['perChange30d']}</p>`
                            bd.className = "fstime";
                            // bd.style.display = "flex";
                            // bd.style.justifyContent = "center";
                            // bd.style.alignItems = "center";
                            card.style.color = "white";
                            card.style.backgroundColor = "black";
                            document.getElementsByClassName('stockname')[0].style.color = "aqua";
                            if(res['body']['data'][i]['change'] < 0){
                                var ch = document.getElementsByClassName('change')[0];
                                ch.style.color = "red";
                            }
                            else{
                                var ch = document.getElementsByClassName('change')[0];
                                ch.style.color = "greenyellow";  
                            }

                            if(res['body']['data'][i]['pChange'] < 0){
                                var ch = document.getElementsByClassName('pchange')[0];
                                ch.style.color = "red";
                            }
                            else{
                                var ch = document.getElementsByClassName('pchange')[0];
                                ch.style.color = "greenyellow";  
                            }

                            if(res['body']['data'][i]['perChange365d'] < 0){
                                var ch = document.getElementsByClassName('pchangeyear')[0];
                                ch.style.color = "red";
                            }
                            else{
                                var ch = document.getElementsByClassName('pchangeyear')[0];
                                ch.style.color = "greenyellow";  
                            }

                            if(res['body']['data'][i]['perChange30d'] < 0){
                                var ch = document.getElementsByClassName('pchangemonth')[0];
                                ch.style.color = "red";
                            }
                            else{
                                var ch = document.getElementsByClassName('pchangemonth')[0];
                                ch.style.color = "greenyellow";
                            }
                            
                            
                            cnt++;
                        }
                        else{
                            bd.classList.remove('fstime');
                            var temp = [];
                            var color = [];
                            const doc = document.querySelector("body");
                            const card_2 = document.createElement("div")
                            card_2.className = "card";
                            let p = document.createElement("p");
                            p.className = "stockname";
                            p.style.color = "aqua";
                            let text = document.createTextNode(`Stock name: ${res['body']['data'][i]['symbol']}`);
                            p.appendChild(text);
                            card_2.appendChild(p);
                            p = document.createElement("p");
                            let lnbk = document.createElement('br');
                            text = document.createTextNode(`Open price: ${res['body']['data'][i]['open']}`);
                            p.className = "open"
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`Today's Highest: ${res['body']['data'][i]['dayHigh']}`);
                            p.className = "todayhigh";
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`Today's lowest: ${res['body']['data'][i]['dayLow']}`);
                            p.className = "todaylow";
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`Last traded price: ${res['body']['data'][i]['lastPrice']}`);
                            p.className = "currentprice";
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`Prev Close: ${res['body']['data'][i]['previousClose']}`);
                            p.className = "previousclose";
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`Change: ${res['body']['data'][i]['change']}`);
                            p.className = "change";
                            p.id = `${++cnt}`;
                            temp.push(`${cnt}`);
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            if(res['body']['data'][i]['change'] < 0){

                                color.push("red");
                            }
                            else if(res['body']['data'][i]['change'] > 0){
                                
                                color.push("greenyellow");  
                            }
                            else{
                                
                                color.push("grey"); 
                            }
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`% change: ${res['body']['data'][i]['pChange']}`);
                            p.className = "pchange"
                            p.id = `${++cnt}`;
                            temp.push(`${cnt}`);
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            if(res['body']['data'][i]['pChange'] < 0){
                                
                                color.push("red");
                            }
                            else if(res['body']['data'][i]['pChange'] > 0){
                                
                                color.push("greenyellow");  
                            }
                            else{
                                
                                color.push("grey");
                            }
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`Year High: ${res['body']['data'][i]['yearHigh']}`);
                            p.className = "yearhigh";
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`Year Low: ${res['body']['data'][i]['yearLow']}`);
                            p.className = "yearlow";
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`%Change in year: ${res['body']['data'][i]['perChange365d']}`);
                            p.className = "pchangeyear";
                            p.id = `${++cnt}`
                            temp.push(`${cnt}`);
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            if(res['body']['data'][i]['perChange365d'] < 0){
                                
                                color.push("red");
                            }
                            else if(res['body']['data'][i]['perChange365d'] > 0){
                                 
                                color.push("greenyellow");
                            }
                            else{
                                 
                                color.push("grey");
                            }
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`%Change in month: ${res['body']['data'][i]['perChange30d']}`);
                            p.className = "pchangemonth";
                            p.id = `${++cnt}`;
                            temp.push(`${cnt}`);
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            if(res['body']['data'][i]['perChange30d'] < 0){
                                
                                color.push("red");
                            }
                            else if(res['body']['data'][i]['perChange30d'] > 0){
                                  
                                color.push("greenyellow");
                            }
                            else{
         
                                color.push("grey");
                            }

                            card_2.style.backgroundColor = "black";
                            card_2.style.color = "white";
                            doc.appendChild(card_2);

                            for(let h = 0;h < temp.length;h++){
                                var ch = document.getElementById(temp[h])
                                ch.style.color = color[h];
                            }
                            
                            bd.style.backgroundImage = "none";
                            bd.className = "bd";

                            // bd.style.setProperty("display","grid");
                            // bd.style.setProperty("grid-template-columns","1fr 1fr")
                            // bd.style.setProperty("column-gap","3px");
                            // bd.style.setProperty("row-gap","6px");
                            // bd.style.setProperty("height","fit-content")
                            bd.style.backgroundColor = "grey";
                            cnt++;

                        }   
                    }
                }
            })
            .catch(err => {
                console.error(err);
            });

        }
    }
    else if(query === "losers" || query === "gainers"){
        if(query === "losers"){
            var k = "top_loosers";
        }
        else if(query === "gainers"){
            var k = "top_gainers";
        }

        fetch(`https://nse-data1.p.rapidapi.com/${k}`, {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-host": "nse-data1.p.rapidapi.com",
		"x-rapidapi-key": "de03804f4emsh60707878b7a7e67p111343jsndbb81b8769f9"
	    }
        })
        .then(response => {
           return response.json();
        })
        .then(res => {
            console.log(res);
            if(res["body"][drp_val]["data"].length == 0){
                let f = document.createElement("h5");
                f.className = "addr";
                let form_ = document.querySelector(".form");
                let t = document.createTextNode(`No data found`);
                f.appendChild(t);
                form_.appendChild(f);
            }
            else{
                var cnt = 0;
                for(let i=0;i<res["body"][drp_val]["data"].length;i++){
                        if(cnt === 0){
                            var bd = document.getElementsByTagName('body')[0];
                            bd.innerHTML = '<div class="card"></div>';
                            const card = document.getElementsByClassName('card')[0];
                            card.innerHTML = `<p class="stockname"><i>Stock name - ${res['body'][drp_val]['data'][i]['symbol']}</i></p>
                            <br><p class="open">Open Price at ${res['body'][drp_val]['data'][i]['open_price']}</p>
                            <br><p class="todayhigh">High price: ${res['body'][drp_val]['data'][i]['high_price']}</p>
                            <br><p class="todaylow">Low price: ${res['body'][drp_val]['data'][i]['low_price']}</p>
                            <br><p class="currentprice">Last traded price: ${res['body'][drp_val]['data'][i]['ltp']}</p>
                            <br><p class="prevprice">Prev close price: ${res['body'][drp_val]['data'][i]['prev_price']}</p>
                            <br><p class="change">Net Price: ${res['body'][drp_val]['data'][i]['net_price']}</p>
                            <br><p class="pchange">% change: ${res['body'][drp_val]['data'][i]['perChange']}</p>`
                            bd.className = "fstime";
                            // bd.style.display = "flex";
                            // bd.style.justifyContent = "center";
                            // bd.style.alignItems = "center";
                            card.style.color = "white";
                            card.style.backgroundColor = "black";
                            document.getElementsByClassName('stockname')[0].style.color = "aqua";
                            if(res['body'][drp_val]['data'][i]['net_price'] < 0){
                                var ch = document.getElementsByClassName('change')[0];
                                ch.style.color = "red";
                            }
                            else{
                                var ch = document.getElementsByClassName('change')[0];
                                ch.style.color = "greenyellow";  
                            }

                            if(res['body'][drp_val]['data'][i]['perChange'] < 0){
                                var ch = document.getElementsByClassName('pchange')[0];
                                ch.style.color = "red";
                            }
                            else{
                                var ch = document.getElementsByClassName('pchange')[0];
                                ch.style.color = "greenyellow";  
                            }               
                            
                            cnt++;
                        }
                        else{
                            var temp = [];
                            var color = [];
                            const doc = document.querySelector("body");
                            const card_2 = document.createElement("div")
                            card_2.className = "card";
                            let p = document.createElement("p");
                            p.className = "stockname";
                            let text = document.createTextNode(`Stock name - ${res['body'][drp_val]['data'][i]['symbol']}`);
                            p.appendChild(text);
                            p.style.color = "aqua";
                            card_2.appendChild(p);
                            p = document.createElement("p");
                            let lnbk = document.createElement('br');
                            text = document.createTextNode(`Open price: ${res['body'][drp_val]['data'][i]['open_price']}`);
                            p.className = "open";
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`High price: ${res['body'][drp_val]['data'][i]['high_price']}`);
                            p.className = "todayhigh";
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`Low price: ${res['body'][drp_val]['data'][i]['low_price']}`);
                            p.className = "todaylow";
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`Last traded price: ${res['body'][drp_val]['data'][i]['ltp']}`);
                            p.className = "currentprice";
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///-----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`Prev close price: ${res['body'][drp_val]['data'][i]['prev_price']}`);
                            p.className = "prevprice";
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`Net Price: ${res['body'][drp_val]['data'][i]['net_price']}`);
                            p.className = "change";
                            p.id = `${++cnt}`;
                            temp.push(`${cnt}`);
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            if(res['body'][drp_val]['data'][i]['net_price'] < 0){

                                color.push("red");
                            }
                            else if(res['body'][drp_val]['data'][i]['net_price'] > 0){
                                
                                color.push("greenyellow");  
                            }
                            else{
                                
                                color.push("grey"); 
                            }
                            ///----------------
                            p = document.createElement("p");
                            lnbk = document.createElement('br');
                            text = document.createTextNode(`% change: ${res['body'][drp_val]['data'][i]['perChange']}`);
                            p.className = "pchange"
                            p.id = `${++cnt}`;
                            temp.push(`${cnt}`);
                            p.appendChild(text);
                            card_2.appendChild(lnbk);
                            card_2.appendChild(p);
                            if(res['body'][drp_val]['data'][i]['perChange'] < 0){
                                
                                color.push("red");
                            }
                            else if(res['body'][drp_val]['data'][i]['perChange'] > 0){
                                
                                color.push("greenyellow");  
                            }
                            else{
                                
                                color.push("grey");
                            }
                            ///----------------
                            card_2.style.backgroundColor = "black";
                            card_2.style.color = "white";
                            doc.appendChild(card_2);

                            for(let h = 0;h < temp.length;h++){
                                var ch = document.getElementById(temp[h])
                                ch.style.color = color[h];
                            }
                            
                            bd.style.backgroundImage = "none";
                            bd.className = "bd";
                            // bd.style.setProperty("display","grid");
                            // bd.style.setProperty("grid-template-columns","1fr 1fr")
                            // bd.style.setProperty("column-gap","3px");
                            // bd.style.setProperty("row-gap","6px");
                            // bd.style.setProperty("height","fit-content")
                            bd.style.backgroundColor = "grey";

                            cnt++;

                        }
                }
            }
        })
        .catch(err => {
            console.error(err);
        });
    }
    })