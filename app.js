// Base de datos limpia (solo nombre y estados de temporalidad)
let marketData = [
    { id: "EURUSD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "USDCAD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "GBPUSD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "AUDUSD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "EURAUD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "EURCAD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "EURJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "EURGBP", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "EURNZD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "AUDJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "USDJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "CADJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "CADCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "GBPAUD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "AUDNZD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "GBPCAD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "GBPJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "GBPNZD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "NZDCAD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "NZDJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "NZDUSD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "AUDCAD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "AUDCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "USDCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "CHFJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "EURCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "GBPCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" },
    { id: "NZDCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral" }
];

let currentFilter = "all";

function calculateTrafficLight(asset) {
    if (asset.h1 === "up") return "verde";
    if (asset.h1 === "down") return "rojo";
    if (asset.h4 === "up") return "verde";
    if (asset.h4 === "down") return "rojo";
    if (asset.daily === "up") return "verde";
    if (asset.daily === "down") return "rojo";
    return "amarillo"; 
}

function renderTable(filterText = "", filterType = "all") {
    const container = document.getElementById("marketBody");
    container.innerHTML = "";

    let filteredData = marketData.filter(a => a.id.toLowerCase().includes(filterText.toLowerCase()));

    if (filterType !== "all") {
        filteredData = filteredData.filter(a => calculateTrafficLight(a) === filterType);
    }

    filteredData.forEach((asset) => {
        const trafficLight = calculateTrafficLight(asset);

        const renderTfButton = (key, label) => {
            const state = asset[key];
            let btnClass = `tf-btn`;
            
            if (state === "up") btnClass += " active-up";
            else if (state === "down") btnClass += " active-down";
            else btnClass += " active-neutral";

            return `<button class="${btnClass}" data-tf="${key}" onclick="rotateState('${asset.id}', '${key}')">${label}</button>`;
        };

        const renderDirButton = (stateType, label) => {
            const isActive = asset.h1 === stateType;
            let btnClass = `dir-btn`;
            if (isActive) btnClass += ` active-${stateType}`;
            return `<button class="${btnClass}" onclick="setState('${asset.id}', 'h1', '${stateType}')">${label}</button>`;
        };

        const row = document.createElement("div");
        row.className = "asset-row";
        
        row.innerHTML = `
            <div class="col-asset">
                <span class="semaforo ${trafficLight}"></span> ${asset.id}
            </div>
            
            <div class="col-timeframes">
                ${renderTfButton('monthly', 'M')}
                ${renderTfButton('weekly', 'W')}
                ${renderTfButton('daily', 'D')}
                ${renderTfButton('h4', '4H')}
                ${renderTfButton('h1', '1H')}
            </div>

            <div class="col-direction">
                ${renderDirButton('up', 'ALZA')}
                ${renderDirButton('neutral', 'NEUTRO')}
                ${renderDirButton('down', 'BAJA')}
            </div>
        `;

        container.appendChild(row);
    });
}

function rotateState(assetId, timeframe) {
    const asset = marketData.find(a => a.id === assetId);
    if (asset) {
        if (asset[timeframe] === "up") asset[timeframe] = "neutral";
        else if (asset[timeframe] === "neutral") asset[timeframe] = "down";
        else asset[timeframe] = "up";

        const searchText = document.getElementById("searchInput").value;
        renderTable(searchText, currentFilter);
    }
}

function setState(assetId, timeframe, state) {
    const asset = marketData.find(a => a.id === assetId);
    if (asset) {
        asset[timeframe] = state;
        const searchText = document.getElementById("searchInput").value;
        renderTable(searchText, currentFilter);
    }
}

function filterAssets(type, event) {
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    if(event) event.target.classList.add('active');
    currentFilter = type;
    const searchText = document.getElementById("searchInput").value;
    renderTable(searchText, currentFilter);
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    renderTable(e.target.value, currentFilter);
});

renderTable();