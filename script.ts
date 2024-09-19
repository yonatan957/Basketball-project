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

interface Player {
    position: string,
    threePercent: number,
    twoPercent: number,
    points: number,
    playerName:string,
    season:number[]

}
interface Send {
    position: string,
    threePercent: number,
    twoPercent: number,
    points: number
}

const addRow = (player:Player) =>{
    const firstname:string = player.playerName.split(" ")[0]
    const tr = document.createElement("tr") as HTMLElement

    const nameTd = document.createElement("td") as HTMLElement
    nameTd.innerText = player.playerName 

    const positionTD = document.createElement("td") as HTMLElement
    positionTD.innerText = player.position
 
    const pointsTD = document.createElement("td") as HTMLElement
    pointsTD.innerText = player.points.toString()

    const FGTableTD = document.createElement("td") as HTMLElement
    FGTableTD.innerText = player.twoPercent.toString()

    const p3TableTd = document.createElement("td") as HTMLElement
    p3TableTd.innerText = player.threePercent.toString()
    
    const button = document.createElement("button")
    button.innerText = `Add ${firstname} to current team`
    button.addEventListener("click" ,()=>{
        addToMyList(player)
    })
    const buttonTableTd = document.createElement("td") as HTMLElement
    buttonTableTd.append(button)
    tr.append(nameTd, positionTD, pointsTD, FGTableTD, p3TableTd, buttonTableTd);

    (document.querySelector("table") as HTMLTableElement).append(tr)
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

const addToMyList = (player: Player) =>{
    let whereToput:HTMLDivElement;
    switch(player.position){
        case "PG":
            whereToput = PG
            break
            
        case "SG":
            whereToput = SG
            break
            
        case "SF":
            whereToput = SF
            break
            
        case "PF":
            whereToput = PF
            break
            
        case "C":
            whereToput = C
            break
        default:
            whereToput = PG
    }
    whereToput.innerHTML =""
    const p = document.createElement("p")
    p.innerText = `name: ${player.playerName},
        position: ${player.position},
        points: ${player.points},
        FG%: ${player.twoPercent},
        3P%: ${player.threePercent}
    `
    whereToput.append(p)
}
const deleteallFromTable = ()=>{
    const table:HTMLTableElement = document.querySelector("table") as HTMLTableElement
    const tds = table.querySelectorAll("td")
    for (const td of tds) {
        td.remove()
    }
}


//make sure that the label next to the input shows the current value
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
    const playersToDisplay:Player[] = (await post<Player[], Send>(send)).filter((player:Player)=>{
        return player.season.includes(2022) || player.season.includes(2023) || player.season.includes(2024)  
    })
    deleteallFromTable()
    if (playersToDisplay.length === 0){
        const td = document.createElement("td") as HTMLElement;
        
        td.textContent = "we didn't find any player with your parameters";
        let table = document.querySelector("table") as HTMLTableElement
        table.append(td)
        for (let index = 0; index < 5; index++) {
            let newtd = document.createElement("td") as HTMLElement
            newtd.textContent = "😭"
            table.append(newtd)           
        }
    }
    for (const p of playersToDisplay) {
        addRow(p)
    }
})
