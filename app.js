// 1. FUNCIÓN PARA CARGAR LOS DATOS GUARDADOS
function cargarDatos() {
    const datosGuardados = localStorage.getItem("monitorLiquidezData");
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    
    // Si es la primera vez que entras, carga la lista por defecto
    return [
        { id: "EURUSD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "USDCAD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "GBPUSD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "AUDUSD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "EURAUD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "EURCAD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "EURJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "EURGBP", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "EURNZD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "AUDJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "USDJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "CADJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "CADCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "GBPAUD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "AUDNZD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "GBPCAD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "GBPJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "GBPNZD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "NZDCAD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "NZDJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "NZDUSD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "AUDCAD", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "AUDCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "USDCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "CHFJPY", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "EURCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "GBPCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" },
        { id: "NZDCHF", monthly: "neutral", weekly: "neutral", daily: "neutral", h4: "neutral", h1: "neutral", direccion: "neutral" }
    ];
}

// 2. INICIALIZAMOS LOS DATOS
let marketData = cargarDatos();

// 3. FUNCIÓN PARA GUARDAR LOS DATOS
function guardarDatos() {
    localStorage.setItem("monitorLiquidezData", JSON.stringify(marketData));
}

let currentFilter = "all";

function calculateTrafficLight(asset) {
    if (asset.direccion === "up") return "verde";
    if (asset.direccion === "down") return "rojo";
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
            const isActive = asset.direccion === stateType;
            let btnClass = `dir-btn`;
            if (isActive) btnClass += ` active-${stateType}`;
            return `<button class="${btnClass}" onclick="setDireccion('${asset.id}', '${stateType}')">${label}</button>`;
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

        guardarDatos(); // GUARDA EN LOCALSTORAGE
        const searchText = document.getElementById("searchInput").value;
        renderTable(searchText, currentFilter);
    }
}

function setDireccion(assetId, state) {
    const asset = marketData.find(a => a.id === assetId);
    if (asset) {
        asset.direccion = state;
        
        guardarDatos(); // GUARDA EN LOCALSTORAGE
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