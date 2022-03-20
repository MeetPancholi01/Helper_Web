String.prototype.format = function () {
  // store arguments in an array
  var args = arguments;
  // use replace to iterate over the string
  // select the match and check if related argument is present
  // if yes, replace the match with the argument
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    // check if the argument is present
    return typeof args[index] == "undefined" ? match : args[index];
  });
};

const sub = document.getElementById("submit");
// const team = document.getElementById("team").value;
// const state = document.getElementById("ms");
// console.log(state.value);
// console.log(team);
const type = document.getElementById("type");
console.log(type.value);
sub.addEventListener("click", function (e) {
  e.preventDefault();
  const team = document.getElementById("team").value;
  const state = document.getElementById("ms");
  fetch(
    `https://unofficial-cricbuzz.p.rapidapi.com/matches/list?matchState=${state.value}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "unofficial-cricbuzz.p.rapidapi.com",
        "x-rapidapi-key": "de03804f4emsh60707878b7a7e67p111343jsndbb81b8769f9",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      // console.log(res);
      if (state.value === "live") {
        let arr = [];
        for (let k = 0; k < res.typeMatches.length; k++) {
          if (res.typeMatches[k].matchType === type.value) {
            arr.push(k);
          }
        }
        console.log(arr);
        if (arr.length == 0) {
          let res = document.createElement("h5");
          res.innerHTML = `<p class="res" style = "color: red";>No matches found for ${type.value}</p>`;
          let container = document.querySelector(".container");
          container.appendChild(res);
        } else {
          let wrapper =
            res.typeMatches[arr[0]].seriesAdWrapper[0].seriesMatches.matches;
          console.log(wrapper);
          let ids = [];
          let cnt = 0;
          for (let i = 0; i < wrapper.length; i++) {
            ids.push(wrapper[i].matchInfo.matchId);
            let curr_state = wrapper[i].matchInfo.state;
            let format = wrapper[i].matchInfo.matchFormat;
            let status = wrapper[i].matchInfo.status; // victoria needs 215 runs
            let team1_fullname = wrapper[i].matchInfo.team1.teamName;
            let team1_sname = wrapper[i].matchInfo.team1.teamSName;
            let team2_fullname = wrapper[i].matchInfo.team2.teamName;
            let team2_sname = wrapper[i].matchInfo.team2.teamSName;
            let venue = wrapper[i].matchInfo.venueInfo;
            let seriesName = wrapper[i].matchInfo.seriesName;
            if (
              team1_fullname.toLowerCase() === team.toLowerCase() ||
              team2_fullname.toLowerCase() === team.toLowerCase() ||
              team1_sname.toLowerCase() === team.toLowerCase() ||
              team2_sname.toLowerCase() === team.toLowerCase() || team === ""
            ) {
              if (Object.keys(wrapper[i]).length == 2) {
                if (Object.keys(wrapper[i].matchScore).length == 2) {
                  let team1_score =
                    (Object.keys(wrapper[i].matchScore.team1Score).length != 0)?wrapper[i].matchScore.team1Score.inngs1.runs:0;
                  let team1_wick =
                    (Object.keys(wrapper[i].matchScore.team1Score).length != 0)?wrapper[i].matchScore.team1Score.inngs1.wickets:0;
                  let team1_overs =
                    (Object.keys(wrapper[i].matchScore.team1Score).length != 0)?wrapper[i].matchScore.team1Score.inngs1.overs:0;

                  let team2_score =
                    (Object.keys(wrapper[i].matchScore.team2Score).length != 0)?wrapper[i].matchScore.team2Score.inngs1.runs:0;
                  let team2_wick =
                    (Object.keys(wrapper[i].matchScore.team2Score).length != 0)?wrapper[i].matchScore.team2Score.inngs1.wickets:0;
                  let team2_overs =
                    (Object.keys(wrapper[i].matchScore.team2Score).length != 0)?wrapper[i].matchScore.team2Score.inngs1.overs:0;
                  let team1_score2 = undefined;
                  let team2_score2 = undefined;
                  let team1_wick2 = undefined;
                  let team2_wick2 = undefined;
                  let team1_overs2 = undefined;
                  let team2_overs2 = undefined;
                  if(format.toLowerCase() === "test"){
                    if(Object.keys(wrapper[i].matchScore.team1Score).length == 2){
                      team1_score2 = (Object.keys(wrapper[i].matchScore.team1Score.inngs2).length != 0)?wrapper[i].matchScore.team1Score.inngs2.runs:0;
                      team1_wick2 = (Object.keys(wrapper[i].matchScore.team1Score.inngs2).length !=0)?wrapper[i].matchScore.team1Score.inngs2.wickets:0;
                      team1_overs2 = (Object.keys(wrapper[i].matchScore.team1Score.inngs2).length > 2)?wrapper[i].matchScore.team1Score.inngs2.overs:0;
                    }
                    if(Object.keys(wrapper[i].matchScore.team2Score).length == 2){
                      team2_score2 = (Object.keys(wrapper[i].matchScore.team2Score.inngs2).length != 0)?wrapper[i].matchScore.team2Score.inngs2.runs:0;
                      team2_wick2 = (Object.keys(wrapper[i].matchScore.team2Score.inngs2).length !=0)?wrapper[i].matchScore.team2Score.inngs2.wickets:0;
                      team2_overs2 = (Object.keys(wrapper[i].matchScore.team2Score.inngs2).length > 2)?wrapper[i].matchScore.team2Score.inngs2.overs:0;
                    }
                  }

                  let container = document.querySelector(".container");
                  container.innerHTML = `<div class = 'scorecard' ><div class="T1">${team1_fullname}: ${team1_score}-${
                    team1_wick != undefined ? team1_wick : 0
                  }</div></div>`;
                  
                  const card = document.querySelector(".scorecard");
                  let t2 = document.createElement("div");
                  t2.className = "T2";
                  let text = document.createTextNode(
                    `${team2_fullname}: ${team2_score}-${
                      team2_wick != undefined ? team2_wick : 0
                    }`
                  );
                  t2.appendChild(text);
                  card.appendChild(t2);
                  const linebr = document.createElement("br");
                  text = document.createTextNode(`${team1_overs} overs`);
                  let t1 = document.querySelector(".T1");
                  t1.appendChild(linebr);
                  t1.appendChild(text);
                  text = document.createTextNode(`${team2_overs} overs`);
                  const linebr2 = document.createElement("br");
                  t2.appendChild(linebr2);
                  t2.appendChild(text);
                  if(format.toLowerCase() === 'test' && (team1_score2 != undefined || team2_score2 != undefined)){
                    const lnbk = document.createElement("br");
                    t1.appendChild(lnbk);
                    const t1_2 = document.createTextNode(`${team1_score2 != undefined?team1_score2:0}-${team1_wick2 != undefined?team1_wick2:0}`);
                    t1.appendChild(t1_2);
                    const lnbk2 = document.createElement("br");
                    t1.appendChild(lnbk2);
                    const t1_2_overs = document.createTextNode(`${team1_overs2!=undefined?team1_overs2:0} overs`);
                    t1.appendChild(t1_2_overs);
                    const lnbk3 = document.createElement("br");
                    t2.appendChild(lnbk3);
                    const t2_2 = document.createTextNode(`${team2_score2 != undefined?team2_score2:0}-${team2_wick2 != undefined?team2_wick2:0}`);
                    t2.appendChild(t2_2);
                    const lnbk4 = document.createElement("br");
                    t2.appendChild(lnbk4);
                    const t2_2_overs = document.createTextNode(`${team2_overs2!=undefined?team2_overs2:0} overs`);
                    t2.appendChild(t2_2_overs);

                  }
                  let form = document.createElement("p");
                  form.className = "format";
                  text = document.createTextNode(`${format}`);
                  form.appendChild(text);
                  card.appendChild(form);
                  let st = document.createElement("p");
                  st.className = "status";
                  text = document.createTextNode(`${status}`);
                  st.appendChild(text);
                  card.appendChild(st);
                  // let series = document.createElement('p');
                  // series.className = 'series';
                  // text = document.createTextNode(`${seriesName}`);
                  // series.appendChild(text);
                  // card.appendChild(series);
                  let ven = document.createElement("p");
                  ven.className = "venue";
                  text = document.createTextNode(`City: ${venue.city}`);
                  ven.appendChild(text);
                  card.appendChild(ven);
                  if(format.toLowerCase() === 'test' && (team1_score2 != undefined || team2_score2 != undefined)){
                    document.getElementsByClassName('format')[0].style.setProperty('margin-top','100px');
                    document.getElementsByClassName('status')[0].style.setProperty('margin-top','130px');
                    document.getElementsByClassName('venue')[0].style.setProperty('margin-top','170px');
                    card.className = "testsc";
                    
                  }
                  //   if (window.matchMedia("(orientation: portrait)").matches) {
                  //     // you're in PORTRAIT mode
                  //     document.getElementsByClassName('scorecard')[0].style.setProperty('height','30%');
                  //     document.getElementsByClassName('scorecard')[0].style.setProperty('width','50vh');
                  //     window.addEventListener('orientationchange',function(){
                  //       document.getElementsByClassName('scorecard')[0].style.setProperty('height','70%');
                  //       document.getElementsByClassName('scorecard')[0].style.setProperty('width','50vw');
                  //     })
                  //  }
                  //   else{
                  //     document.getElementsByClassName('scorecard')[0].style.setProperty('height','70%');
                  //     document.getElementsByClassName('scorecard')[0].style.setProperty('width','50vw');
                  //     window.addEventListener('orientationchange',function(){
                  //       document.getElementsByClassName('scorecard')[0].style.setProperty('height','30%');
                  //       document.getElementsByClassName('scorecard')[0].style.setProperty('width','50vh');
                  //     })

                  //  }
                    
                    
                  // }
                  break;
                } else {
                  if (wrapper[i].matchScore.team1Score != undefined) {
                    let team1_score =
                      wrapper[i].matchScore.team1Score.inngs1.runs;
                    let team1_wick =
                      wrapper[i].matchScore.team1Score.inngs1.wickets;
                    let team1_overs =
                      wrapper[i].matchScore.team1Score.inngs1.overs;
                    let container = document.querySelector(".container");
                    container.innerHTML = `<div class = 'scorecard' ><div class="T1">${team1_fullname}: ${team1_score}-${
                      team1_wick != undefined ? team1_wick : 0
                    }</div></div>`;
                    const card = document.querySelector(".scorecard");
                    let t2 = document.createElement("div");
                    t2.className = "T2";
                    let text = document.createTextNode(
                      "{0}: {1}-{2}".format(team2_fullname, 0, 0)
                    );
                    t2.appendChild(text);
                    card.appendChild(t2);
                    const linebr = document.createElement("br");
                    text = document.createTextNode(`${team1_overs} overs`);
                    let t1 = document.querySelector(".T1");
                    t1.appendChild(linebr);
                    t1.appendChild(text);
                    text = document.createTextNode("{0} overs".format(0));
                    const linebr2 = document.createElement("br");
                    t2.appendChild(linebr2);
                    t2.appendChild(text);
                    let form = document.createElement("p");
                    form.className = "format";
                    text = document.createTextNode(`${format}`);
                    form.appendChild(text);
                    card.appendChild(form);
                    let st = document.createElement("p");
                    st.className = "status";
                    text = document.createTextNode(`${status}`);
                    st.appendChild(text);
                    card.appendChild(st);
                    // let series = document.createElement('p');
                    // series.className = 'series';
                    // text = document.createTextNode(`${seriesName}`);
                    // series.appendChild(text);
                    // card.appendChild(series);
                    let ven = document.createElement("p");
                    ven.className = "venue";
                    text = document.createTextNode(`City: ${venue.city}`);
                    ven.appendChild(text);
                    card.appendChild(ven);
                    break;
                  } else {
                    let team2_score =
                      wrapper[i].matchScore.team2Score.inngs1.runs;
                    let team2_wick =
                      wrapper[i].matchScore.team2Score.inngs1.wickets;
                    let team2_overs =
                      wrapper[i].matchScore.team2Score.inngs1.overs;
                    let container = document.querySelector(".container");
                    container.innerHTML = `<div class = 'scorecard' ><div class="T2">${team2_fullname}: ${team2_score}-${
                      team2_wick != undefined ? team2_wick : 0
                    }</div></div>`;
                    const card = document.querySelector(".scorecard");
                    let t1 = document.createElement("div");
                    t1.className = "T1";
                    let text = document.createTextNode(
                      "{0}: {1}-{2}".format(team1_fullname, 0, 0)
                    );
                    t1.appendChild(text);
                    card.appendChild(t1);
                    const linebr = document.createElement("br");
                    text = document.createTextNode(`${team2_overs} overs`);
                    let t2 = document.querySelector(".T2");
                    t2.appendChild(linebr);
                    t2.appendChild(text);
                    text = document.createTextNode("{0} overs".format(0));
                    const linebr2 = document.createElement("br");
                    t1.appendChild(linebr2);
                    t1.appendChild(text);
                    let form = document.createElement("p");
                    form.className = "format";
                    text = document.createTextNode(`${format}`);
                    form.appendChild(text);
                    card.appendChild(form);
                    let st = document.createElement("p");
                    st.className = "status";
                    text = document.createTextNode(`${status}`);
                    st.appendChild(text);
                    card.appendChild(st);
                    // let series = document.createElement('p');
                    // series.className = 'series';
                    // text = document.createTextNode(`${seriesName}`);
                    // series.appendChild(text);
                    // card.appendChild(series);
                    let ven = document.createElement("p");
                    ven.className = "venue";
                    text = document.createTextNode(`City: ${venue.city}`);
                    ven.appendChild(text);
                    card.appendChild(ven);
                    break;
                  }
                }
              } else {
                let container = document.querySelector(".container");
                container.innerHTML = `<div class = 'scorecard' ><div class="T1">${team1_fullname}: ${0}-${0}</div></div>`;
                const card = document.querySelector(".scorecard");
                let t2 = document.createElement("div");
                t2.className = "T2";
                let text = document.createTextNode(
                  `${team2_fullname}: ${0}-${0}`
                );
                t2.appendChild(text);
                card.appendChild(t2);
                const linebr = document.createElement("br");
                text = document.createTextNode(`${0} overs`);
                let t1 = document.querySelector(".T1");
                t1.appendChild(linebr);
                t1.appendChild(text);
                text = document.createTextNode(`${0} overs`);
                const linebr2 = document.createElement("br");
                t2.appendChild(linebr2);
                t2.appendChild(text);
                let form = document.createElement("p");
                form.className = "format";
                text = document.createTextNode(`${format}`);
                form.appendChild(text);
                card.appendChild(form);
                let st = document.createElement("p");
                st.className = "status";
                text = document.createTextNode(`${status}`);
                st.appendChild(text);
                card.appendChild(st);
                let ven = document.createElement("p");
                ven.className = "venue";
                text = document.createTextNode(`City: ${venue.city}`);
                ven.appendChild(text);
                card.appendChild(ven);
                break;
              }
            }
            if(cnt === wrapper.length-1){
              let res = document.createElement("h5");
              res.innerHTML = `<p class="res" style = "color: red";>No matches found for ${team}</p>`;
              let container = document.querySelector(".container");
              container.appendChild(res);
            }
            cnt++;
          }
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
