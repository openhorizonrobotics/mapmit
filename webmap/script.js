// Map Styles with Labels
const createStyle = (color, strokeColor, strokeWidth = 2) => {
    return new ol.style.Style({
        fill: new ol.style.Fill({
            color: color
        }),
        stroke: new ol.style.Stroke({
            color: strokeColor,
            width: strokeWidth
        }),
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({ color: '#000' }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 3
            }),
            overflow: true,
            offsetY: -15
        })
    });
};

// Define styles with fixed widths
const styles = {
    academic: createStyle('rgba(0, 0, 255, 0.2)', 'rgba(0, 0, 255, 1)'),
    grass: createStyle('rgba(0, 255, 0, 0.2)', 'rgba(0, 255, 0, 1)'),
    hostel: createStyle('rgba(255, 165, 0, 0.2)', 'rgba(255, 165, 0, 1)'),
    mess: createStyle('rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 1)'),
    parking: createStyle('rgba(128, 128, 128, 0.2)', 'rgba(128, 128, 128, 1)'),
    sports: createStyle('rgba(147, 112, 219, 0.2)', 'rgba(147, 112, 219, 1)'),
    temple: createStyle('rgba(139, 69, 19, 0.2)', 'rgba(139, 69, 19, 1)'),
    walkways: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#8B4513',
            width: 2
        })
    }),
    circles: createStyle('rgba(169, 169, 169, 0.2)', 'rgba(169, 169, 169, 1)'),
    roads_main: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#333333',
            width: 3,
            lineCap: 'round',
            lineJoin: 'round'
        })
    }),
    roads_second: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#666666',
            width: 2,
            lineCap: 'round',
            lineJoin: 'round'
        })
    }),
    under_construction: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#FFD700',
            width: 2,
            lineDash: [10, 10]
        })
    }),
    tree: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
                color: 'rgba(34, 139, 34, 0.8)'
            })
        })
    })
};

// Function to create style with label
function createLabeledStyle(feature, baseStyle) {
    const name = feature.get('name');
    if (!name) return baseStyle;

    const style = baseStyle.clone();
    style.getText().setText(name);
    return style;
}

// Initialize Map
const map = new ol.Map({
    target: 'map',
    layers: [],
    view: new ol.View({
        center: [0, 0],
        zoom: 17,
        minZoom: 16,
        maxZoom: 19,
        constrainRotation: true,
    })
});

// Vector Sources Array and Layers Object
const vectorSources = [];
const layers = {};

// Add GeoJSON Layer Function
function addGeoJSONLayer(url, style, id) {
    const vectorSource = new ol.source.Vector({
        url: url,
        format: new ol.format.GeoJSON()
    });

    vectorSources.push(vectorSource);

    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function(feature) {
            return createLabeledStyle(feature, style);
        }
    });

    layers[id] = vectorLayer;
    map.addLayer(vectorLayer);
    
    // Add event listener for the corresponding checkbox
    const checkbox = document.getElementById(`${id}-toggle`);
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            vectorLayer.setVisible(this.checked);
        });
    }
    
    return vectorLayer;
}

// Add Layers
const layerConfigs = {
    academic: { url: 'data/Academic Blocks.geojson', style: styles.academic },
    grass: { url: 'data/Grasscover.geojson', style: styles.grass },
    hostel: { url: 'data/Hostels.geojson', style: styles.hostel },
    mess: { url: 'data/Mess.geojson', style: styles.mess },
    parking: { url: 'data/Parking.geojson', style: styles.parking },
    sports: { url: 'data/Sports.geojson', style: styles.sports },
    temple: { url: 'data/temple.geojson', style: styles.temple },
    tree: { url: 'data/Trees.geojson', style: styles.tree },
    walkways: { url: 'data/walkways.geojson', style: styles.walkways },
    circles: { url: 'data/circles.geojson', style: styles.circles },
    roads_main: { url: 'data/roads_main.geojson', style: styles.roads_main },
    roads_second: { url: 'data/roads_second.geojson', style: styles.roads_second },
    under_construction: { url: 'data/Under_Construction.geojson', style: styles.under_construction }
};

// Initialize layers
Object.entries(layerConfigs).forEach(([id, config]) => {
    addGeoJSONLayer(config.url, config.style, id);
});

// Fit Map to Features
function fitMapToFeatures() {
    let extent = null;
    let loadedSources = 0;

    vectorSources.forEach(source => {
        source.once('change', function() {
            if (source.getState() === 'ready') {
                const sourceExtent = source.getExtent();
                if (extent === null) {
                    extent = sourceExtent;
                } else {
                    extent = ol.extent.extend(extent, sourceExtent);
                }
                
                loadedSources++;
                
                if (loadedSources === vectorSources.length) {
                    map.getView().fit(extent, {
                        padding: [50, 50, 50, 50],
                        maxZoom: 19
                    });
                }
            }
        });
    });
}

// UI Controls
const legendPanel = document.getElementById('legendPanel');
const searchPanel = document.getElementById('searchPanel');
const locationPopup = document.getElementById('locationPopup');
const popupTitle = document.getElementById('popupTitle');
const popupDescription = document.getElementById('popupDescription');
const popupTimestamp = document.getElementById('popupTimestamp');
const currentZoom = document.getElementById('currentZoom');
const currentTime = document.getElementById('currentTime');

// Toggle Controls
document.getElementById('toggleLegend').addEventListener('click', () => {
    legendPanel.classList.toggle('active');
    searchPanel.classList.remove('active');
});

document.getElementById('toggleSearch').addEventListener('click', () => {
    searchPanel.classList.toggle('active');
    legendPanel.classList.remove('active');
});

document.getElementById('closeLegend').addEventListener('click', () => {
    legendPanel.classList.remove('active');
});

document.getElementById('closePopup').addEventListener('click', () => {
    locationPopup.classList.remove('active');
});

// Center Map Button
document.getElementById('centerMap').addEventListener('click', () => {
    fitMapToFeatures();
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

function createSearchIndex() {
    const searchIndex = [];
    Object.values(layers).forEach(layer => {
        const source = layer.getSource();
        if (source) {
            source.getFeatures().forEach(feature => {
                const name = feature.get('name');
                if (name) {
                    searchIndex.push({
                        name: name,
                        feature: feature
                    });
                }
            });
        }
    });
    return searchIndex;
}

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const searchIndex = createSearchIndex();
    searchResults.innerHTML = '';

    if (query.length < 2) return;

    const matches = searchIndex.filter(item => 
        item.name.toLowerCase().includes(query)
    );

    matches.forEach(match => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.textContent = match.name;
        div.addEventListener('click', () => {
            const extent = match.feature.getGeometry().getExtent();
            map.getView().fit(extent, {
                padding: [50, 50, 50, 50],
                duration: 1000
            });
            showFeaturePopup(match.feature);
            searchPanel.classList.remove('active');
        });
        searchResults.appendChild(div);
    });
});

// Show Feature Popup
function showFeaturePopup(feature) {
    const name = feature.get('name') || 'Unnamed Location';
    const description = feature.get('description') || 'No description available';

    popupTitle.textContent = name;
    popupDescription.textContent = description;
    popupTimestamp.textContent = new Date().toLocaleTimeString();

    const extent = feature.getGeometry().getExtent();
    const center = ol.extent.getCenter(extent);
    const pixel = map.getPixelFromCoordinate(center);

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const popupHeight = locationPopup.offsetHeight;
    const popupWidth = locationPopup.offsetWidth;

    const spaceAbove = pixel[1];
    const spaceBelow = viewportHeight - pixel[1];

    let left = pixel[0] - (popupWidth / 2);
    left = Math.max(10, Math.min(left, viewportWidth - popupWidth - 10));

    let top;
    if (spaceAbove > popupHeight + 20 || spaceAbove > spaceBelow) {
        top = pixel[1] - popupHeight - 20;
    } else {
        top = pixel[1] + 20;
    }

    locationPopup.style.left = `${left}px`;
    locationPopup.style.top = `${top}px`;
    locationPopup.classList.add('active');
}

// Map Click Handler
map.on('click', function(event) {
    const feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
        return feature;
    });

    if (feature) {
        showFeaturePopup(feature);
    } else {
        locationPopup.classList.remove('active');
    }
});

// Hover Effect
map.on('pointermove', function(event) {
    const pixel = map.getEventPixel(event.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

// Update Stats
map.getView().on('change:resolution', function() {
    currentZoom.textContent = `Zoom: ${Math.round(map.getView().getZoom())}`;
});

// Update Time
function updateTime() {
    currentTime.textContent = new Date().toLocaleTimeString();
}
setInterval(updateTime, 1000);

// Initialize Map
fitMapToFeatures();
updateTime();
