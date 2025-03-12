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
            font: '14px "Open Sans", "Arial Unicode MS", sans-serif',
            fill: new ol.style.Fill({ color: '#000' }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 4
            }),
            overflow: true,
            offsetY: -15,
            padding: [5, 5, 5, 5],

            textAlign: 'center',
            textBaseline: 'middle'
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
    shops: createStyle('rgba(255, 140, 0, 0.2)', 'rgba(255, 140, 0, 1)'),
    temple: createStyle('rgba(139, 69, 19, 0.2)', 'rgba(139, 69, 19, 1)'),
    walkways: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#8B4513',
            width: 2
        }),
        text: new ol.style.Text({
            font: '14px "Open Sans", "Arial Unicode MS", sans-serif',
            fill: new ol.style.Fill({ color: '#000' }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 4
            }),
            overflow: true,
            offsetY: -10,
            padding: [5, 5, 5, 5],
            textAlign: 'center',
            textBaseline: 'middle',
            placement: 'line'
        })
    }),
    circles: createStyle('rgba(169, 169, 169, 0.2)', 'rgba(169, 169, 169, 1)'),
    roads_main: new ol.style.Style
    ({
        stroke: new ol.style.Stroke({
            color: '#333333',
            width: 3,
            lineCap: 'round',
            lineJoin: 'round'
        }),
        text: new ol.style.Text({
            font: '14px "Open Sans", "Arial Unicode MS", sans-serif',
            fill: new ol.style.Fill({ color: '#000' }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 4
            }),
            overflow: true,
            offsetY: -10,
            padding: [5, 5, 5, 5],
            textAlign: 'center',
            textBaseline: 'middle',
            placement: 'line'
        })
    }),
    roads_second: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#666666',
            width: 2,
            lineCap: 'round',
            lineJoin: 'round'
        }),

    }),
    under_construction: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#FFD700',
            width: 2,
            lineDash: [10, 10]
        }),
        text: new ol.style.Text({
            font: '14px "Open Sans", "Arial Unicode MS", sans-serif',
            fill: new ol.style.Fill({ color: '#000' }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 4
            }),
            overflow: true,
            offsetY: -10,
            padding: [5, 5, 5, 5],
            textAlign: 'center',
            textBaseline: 'middle'
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
    const shops = feature.get('Shops');
    const sports = feature.get('Sports');
    const nameNum = feature.get('Name/Num');
    const name = feature.get('Name');

    const style = baseStyle.clone();
    
    // Create text style if it doesn't exist
    let text = style.getText();
    if (!text) {
        text = new ol.style.Text({
            font: '14px "Open Sans", "Arial Unicode MS", sans-serif',
            textAlign: 'center',
            textBaseline: 'middle'
        });
        style.setText(text);
    }
    
    // Prioritize Shops and Sports properties, then Name/Num
    if (shops) {
        text.setText(shops);
    } else if (sports) {
        text.setText(sports);
    } else if (nameNum) {
        text.setText(nameNum);
    } else if (name) {
        text.setText(name);

    } else {
        return baseStyle;
    }
    
    // Preserve line placement for roads, use point placement for others
    const featureType = feature.get('type') || '';
    if (!featureType.includes('road') && !featureType.includes('walkway')) {
        text.setPlacement('point');
    }
    text.setOverflow(true);
    
    return style;
}

// Initialize Map with Scale Bar
const map = new ol.Map({
    target: 'map',
    layers: [],
    view: new ol.View({
        center: [0, 0],
        zoom: 17,
        minZoom: 16,
        maxZoom: 19,
        constrainRotation: false // Allow map rotation
    }),
    controls: [
        new ol.control.ScaleLine({
            units: 'metric' // Use meters/kilometers
        })
    ]
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
        },
        declutter: true // Enable label collision detection
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
    academic: { url: 'data/Academic_Blocks.geojson', style: styles.academic },
    grass: { url: 'data/Grasscover.geojson', style: styles.grass },
    hostel: { url: 'data/Hostels.geojson', style: styles.hostel },
    mess: { url: 'data/Mess.geojson', style: styles.mess },
    parking: { url: 'data/Parking.geojson', style: styles.parking },
    sports: { url: 'data/Sports.geojson', style: styles.sports },
    shops: { url: 'data/Shops.geojson', style: styles.shops },
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

// User Position Tracking
let userPositionSource = new ol.source.Vector();
let userPositionLayer = new ol.layer.Vector({
    source: userPositionSource,
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 8,
            fill: new ol.style.Fill({
                color: 'rgb(188,20,20)'
            }),
            stroke: new ol.style.Stroke({
                color: '#322d2d',
                width: 5
            })
        })
    }),
    zIndex: 1000 // Make sure user position is on top of other layers
});

// Add user position layer to map
map.addLayer(userPositionLayer);

// User position tracking feature
let userPositionFeature = new ol.Feature();
userPositionSource.addFeature(userPositionFeature);

// Position accuracy feature (circle around the position point)
let accuracyFeature = new ol.Feature();
userPositionSource.addFeature(accuracyFeature);

// Store the map extent for reference
let mapExtent = null;

// Geolocation API setup
const geolocation = new ol.Geolocation({
    trackingOptions: {
        enableHighAccuracy: true
    },
    projection: map.getView().getProjection()
});

// Check if a position is within or near the map extent
function isPositionNearMapExtent(coordinates) {
    if (!mapExtent) return true; // If we don't have map extent yet, assume it's fine
    
    // Create a buffered extent (much larger than the actual map extent)
    const buffer = 5000; // Increased buffer in meters (was 1000)
    const bufferedExtent = [
        mapExtent[0] - buffer,
        mapExtent[1] - buffer,
        mapExtent[2] + buffer,
        mapExtent[3] + buffer
    ];
    
    // Check if the position is within the buffered extent
    return ol.extent.containsCoordinate(bufferedExtent, coordinates);
}

// Start tracking position
function startPositionTracking() {
    geolocation.setTracking(true);
    
    // Handle position change
    geolocation.on('change:position', function() {
        const coordinates = geolocation.getPosition();
        if (coordinates) {
            userPositionFeature.setGeometry(coordinates ? 
                new ol.geom.Point(coordinates) : null);
            
            // Center map on user position if tracking is active
            if (followUserPosition) {
                if (isPositionNearMapExtent(coordinates)) {
                    map.getView().animate({
                        center: coordinates,
                        duration: 500
                    });
                } else {
                    // If user is far from map extent, show notification and disable following
                    // but still keep the map visible
                    showLocationWarning();
                    followUserPosition = false;
                    trackingButton.classList.remove('active');
                    
                    // Ensure map is still visible by fitting to features
                    fitMapToFeatures();
                }
            }
        }
    });
    
    // Handle accuracy change
    geolocation.on('change:accuracyGeometry', function() {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });
    
    // Handle error
    geolocation.on('error', function(error) {
        console.error('Geolocation error:', error);
        // Don't show alert, just make sure map is visible
        fitMapToFeatures();
    });
}


document.addEventListener("DOMContentLoaded", function () {
    // Your existing code here
    startPositionTracking();  // Ensure this runs only after user interaction
});

// Show warning when user is far from the mapped area
function showLocationWarning() {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('location-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'location-notification';
        notification.className = 'location-notification';
        document.querySelector('.game-container').appendChild(notification);
        
        // Add styles for the notification if not already in CSS
        const style = document.createElement('style');
        style.textContent = `
            .location-notification {
                position: absolute;
                top: 70px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 1001;
                text-align: center;
                max-width: 80%;
                animation: fadeInOut 5s forwards;
            }
            @keyframes fadeInOut {
                0% { opacity: 0; }
                10% { opacity: 1; }
                80% { opacity: 1; }
                100% { opacity: 0; display: none; }
            }
        `;
        document.head.appendChild(style);
    }
    
    notification.textContent = 'You are far from the mapped area. Map view has been centered on the campus.';
    notification.style.animation = 'none';
    notification.offsetHeight; // Trigger reflow
    notification.style.animation = 'fadeInOut 5s forwards';
    
    // Remove notification after animation completes
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Flag to determine if map should follow user position
let followUserPosition = true;

// Get the tracking and simulate location buttons
const trackingButton = document.getElementById('toggleTracking');

// Toggle position tracking
trackingButton.addEventListener('click', () => {
    followUserPosition = !followUserPosition;
    trackingButton.classList.toggle('active');
    
    if (followUserPosition && geolocation.getPosition()) {
        const coordinates = geolocation.getPosition();
        if (isPositionNearMapExtent(coordinates)) {
            map.getView().animate({
                center: coordinates,
                duration: 500
            });
        } else {
            showLocationWarning();
            followUserPosition = false;
            trackingButton.classList.remove('active');
            
            // Ensure map is still visible by fitting to features
            fitMapToFeatures();
        }
    } else {
        // If tracking is disabled, ensure map is centered on features
        fitMapToFeatures();
    }
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
                    // Store the map extent for reference
                    mapExtent = extent;
                    
                    const view = map.getView();
                    view.fit(extent, {
                        padding: [50, 50, 50, 50],
                        maxZoom: 19,
                        duration: 0 // Instant fit
                    });
                    map.render(); // Force render after fit
                }
            }
        });
    });

    // Fallback: render after a short delay if sources don't load
    setTimeout(() => {
        if (loadedSources === 0) {
            map.render();
        }
    }, 500);
}

// Function to initialize rotation controls
function initRotationControls() {
    // Get the north arrow element
    const northArrow = document.getElementById('northArrow');
    
    // Update north arrow based on map rotation
    function updateNorthArrow() {
        const rotation = map.getView().getRotation();
        const rotationDegrees = +rotation * 180 / Math.PI;
        northArrow.style.transform = `rotate(${rotationDegrees}deg)`;
    }

    // Update arrow on map render
    map.on('postrender', updateNorthArrow);

    // Direct event listeners for rotation buttons
    document.getElementById('rotateLeft').onclick = function() {
        const view = map.getView();
        view.animate({
            rotation: view.getRotation() - Math.PI / 6,
            duration: 250
        });
    };

    document.getElementById('rotateRight').onclick = function() {
        const view = map.getView();
        view.animate({
            rotation: view.getRotation() + Math.PI / 6,
            duration: 250
        });
    };

    document.getElementById('resetRotation').onclick = function() {
        const view = map.getView();
        view.animate({
            rotation: 0,
            duration: 250
        });
    };
}

// Initialize rotation controls after map is fully loaded
map.once('postrender', initRotationControls);

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



// Zoom Controls
document.getElementById('zoomIn').addEventListener('click', (event) => {
    event.stopPropagation();
    const view = map.getView();
    const currentZoom = view.getZoom();
    if (currentZoom < 19) {
        view.animate({ zoom: currentZoom + 1, duration: 150 });
    }
});

document.getElementById('zoomOut').addEventListener('click', (event) => {
    event.stopPropagation();
    const view = map.getView();
    const currentZoom = view.getZoom();
    if (currentZoom > 16) {
        view.animate({ zoom: currentZoom - 1, duration: 150 });
    }
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

// Show Feature Popup (Updated to use sidebar)
function showFeaturePopup(feature) {
    const name = feature.get('Name') || 'Unnamed Location';
    const description = feature.get('description') || 'No description available';

    popupTitle.textContent = name;
    popupDescription.textContent = description;
    popupTimestamp.textContent = new Date().toLocaleTimeString();

    locationPopup.classList.add('active');
}

// Map Click Handler (Updated)
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
