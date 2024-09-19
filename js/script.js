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
// object with 5 types of players
let players = {
    PGPlayer: "didn't choose yet",
    SGPlayer: "didn't choose yet",
    SFPlayer: "didn't choose yet",
    PFPlayer: "didn't choose yet",
    CPlayer: "didn't choose yet"
};
const addRow = (player) => {
    const nameTd = document.createElement("td");
    nameTD.innerText = player.playerName;
    const positionTD = document.createElement("td");
    name.innerText = player.playerName;
    const FGTableTD = document.createElement("td");
    name.innerText = player.playerName;
    const name = document.createElement("td");
    name.innerText = player.playerName;
};
const fillPlayers = () => {
    [PG, SG, SF, PF, C].forEach(element => {
        element.innerText = players[element.id + "Player"];
    });
};
const post = (arg2) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(BASE_URL + "/api/filter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(arg2)
        });
        const obj = yield res.json();
        return obj;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
fillPlayers();
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
    const playersToDisplay = yield post(send);
}));
