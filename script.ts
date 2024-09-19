const BASE_URL = "https://nbaserver-q21u.onrender.com"
//three div of input type range
const pointsInputDiv = document.querySelector("#pointsInputDiv") as HTMLDivElement
const FGInputDiv = document.querySelector("#FGInputDiv") as HTMLDivElement
const PInputDiv = document.querySelector("#PInputDiv") as HTMLDivElement
//button of search
const SearchButton = document.querySelector("#SearchButton") as HTMLButtonElement
// 5 dives of the players details
const PG = document.querySelector("#PG") as HTMLDivElement
const SG = document.querySelector("#SG") as HTMLDivElement
const SF = document.querySelector("#SF") as HTMLDivElement
const PF = document.querySelector("#PF") as HTMLDivElement
const C = document.querySelector("#C") as HTMLDivElement
// object with 5 types of players
let players: { [key: string]: string } = {
    PGPlayer:"didn't choose yet",
    SGPlayer:"didn't choose yet",
    SFPlayer:"didn't choose yet",
    PFPlayer:"didn't choose yet",
    CPlayer:"didn't choose yet"
}
interface Player {
    position: string,
    threePercent: number,
    twoPercent: number,
    points: number,
    playerName:string
}
interface Send {
    position: string,
    threePercent: number,
    twoPercent: number,
    points: number
}

const addRow = (player:Player) =>{
    const nameTd = document.createElement("td") as HTMLElement
    nameTD.innerText = player.playerName 
    const positionTD = document.createElement("td") as HTMLElement
    name.innerText = player.playerName 
    const FGTableTD = document.createElement("td") as HTMLElement
    name.innerText = player.playerName 
    const name = document.createElement("td") as HTMLElement
    name.innerText = player.playerName 
    
}
const fillPlayers = ()=>{
    [PG, SG, SF, PF, C].forEach(element => {
        element.innerText = players[element.id + "Player"]
    });
}

const post = async <T, S>(arg2:S):Promise<T> =>{
    try{
        const res = await fetch(BASE_URL + "/api/filter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(arg2)          
        })

        const obj:T = await res.json() 
        return obj
    }
    catch(err){
        console.log(err)
        throw err
    }
}









fillPlayers();

[pointsInputDiv, FGInputDiv, PInputDiv].forEach((div)=>{
    const input = div.querySelector("input") as HTMLInputElement
    const label = div.querySelector("label") as HTMLLabelElement
    input.addEventListener("input", ()=>{
        label.innerText = input.value
    })
})
SearchButton.addEventListener("click", async ()=>{
    const pointsSend =  (pointsInputDiv.querySelector("input") as HTMLInputElement).value;
    const FGSend =  (FGInputDiv.querySelector("input") as HTMLInputElement).value;
    const PSend =  (PInputDiv.querySelector("input") as HTMLInputElement).value;
    const positionSend = (document.querySelector("#selectPosition") as HTMLSelectElement).value;
    const send:Send = {
        position: positionSend,
        threePercent: parseInt(PSend),
        twoPercent:parseInt(FGSend),
        points:parseInt(pointsSend)
    }
    const playersToDisplay:Player[] = await post<Player[], Send>(send)
})
