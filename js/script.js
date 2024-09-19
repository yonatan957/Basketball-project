"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://nbaserver-q21u.onrender.com";
//three div of input type range
const pointsInputDiv = document.querySelector("#pointsInputDiv");
const FGInputDiv = document.querySelector("#FGInputDiv");
const PInputDiv = document.querySelector("#PInputDiv");
//button of search
const SearchButton = document.querySelector("#SearchButton");
// 5 dives of the players details
const PG = document.querySelector("#PG");
const SG = document.querySelector("#SG");
const SF = document.querySelector("#SF");
const PF = document.querySelector("#PF");
const C = document.querySelector("#C");
//table
const table = document.querySelector("table");
//button of save
const saveButton = document.querySelector("#saveTeam");
const addRow = (player) => {
    const firstname = player.playerName.split(" ")[0];
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    nameTd.innerText = player.playerName;
    const positionTD = document.createElement("td");
    positionTD.innerText = player.position;
    const pointsTD = document.createElement("td");
    pointsTD.innerText = player.points.toString();
    const FGTableTD = document.createElement("td");
    FGTableTD.innerText = player.twoPercent.toString();
    const p3TableTd = document.createElement("td");
    p3TableTd.innerText = player.threePercent.toString();
    const button = document.createElement("button");
    button.innerText = `Add ${firstname} to current team`;
    button.addEventListener("click", () => {
        addToMyList(player);
    });
    const buttonTableTd = document.createElement("td");
    buttonTableTd.append(button);
    tr.append(nameTd, positionTD, pointsTD, FGTableTD, p3TableTd, buttonTableTd);
    document.querySelector("table").append(tr);
};
const post = (arg2_1, ...args_1) => __awaiter(void 0, [arg2_1, ...args_1], void 0, function* (arg2, andUrl = "filter") {
    try {
        const res = yield fetch(BASE_URL + "/api/" + andUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(arg2)
        });
        if (andUrl === "AddTeam") {
            return yield res.json();
        }
        const obj = yield res.json();
        return obj;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
const addToMyList = (player) => {
    let whereToput;
    switch (player.position) {
        case "PG":
            whereToput = PG;
            break;
        case "SG":
            whereToput = SG;
            break;
        case "SF":
            whereToput = SF;
            break;
        case "PF":
            whereToput = PF;
            break;
        case "C":
            whereToput = C;
            break;
        default:
            whereToput = PG;
    }
    whereToput.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = `name: ${player.playerName},
        position: ${player.position},
        points: ${player.points},
        FG%: ${player.twoPercent},
        3P%: ${player.threePercent}
    `;
    whereToput.dataset.playerName = player.playerName;
    whereToput.append(p);
};
const deleteallFromTable = () => {
    const tds = table.querySelectorAll("td");
    for (const td of tds) {
        td.remove();
    }
};
//if we didn't find players - we use addMassegeInTable() to show this to the user
const addMassegeInTable = (massege) => {
    const td = document.createElement("td");
    td.textContent = massege;
    table.append(td);
    for (let index = 0; index < 5; index++) {
        let newtd = document.createElement("td");
        newtd.textContent = "😭";
        table.append(newtd);
    }
};
//make sure that the label next to the input shows the current value
[pointsInputDiv, FGInputDiv, PInputDiv].forEach((div) => {
    const input = div.querySelector("input");
    const label = div.querySelector("label");
    input.addEventListener("input", () => {
        label.innerText = input.value;
    });
});
SearchButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const pointsSend = pointsInputDiv.querySelector("input").value;
    const FGSend = FGInputDiv.querySelector("input").value;
    const PSend = PInputDiv.querySelector("input").value;
    const positionSend = document.querySelector("#selectPosition").value;
    const send = {
        position: positionSend,
        threePercent: parseInt(PSend),
        twoPercent: parseInt(FGSend),
        points: parseInt(pointsSend)
    };
    const playersToDisplay = (yield post(send)).filter((player) => {
        return player.season.includes(2022) || player.season.includes(2023) || player.season.includes(2024);
    });
    deleteallFromTable();
    if (playersToDisplay.length === 0) {
        addMassegeInTable("we didn't find any player with your parameters");
    }
    for (const p of playersToDisplay) {
        addRow(p);
    }
}));
saveButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const names = [];
    for (const d of [PG, SG, SF, PF, C]) {
        if (!d.dataset.playerName) {
            alert("you don't have the whole team");
            return;
        }
        let player = (yield post({ position: d.id, points: 0, threePercent: 0, twoPercent: 0 }))
            .filter((p => p.playerName === d.dataset.playerName))[0];
        names.push(player);
    }
    let massage = yield post(names, "AddTeam");
    alert("team added succsesfully");
}));
