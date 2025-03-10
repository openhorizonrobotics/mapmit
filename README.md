# MapMIT
An integrated campus mapping and event management platform for MIT Manipal, combining interactive digital maps with real-time event visualization and automated drone mapping.
## Table of Contents
- [Introduction](https://github.com/openhorizonrobotics/mapmit/blob/documentation-update/README.md#introduction)
- [Project Components](https://github.com/openhorizonrobotics/mapmit/blob/documentation-update/README.md#project-components)
- [Development Phases](https://github.com/openhorizonrobotics/mapmit/blob/documentation-update/README.md#development-phases)
- [Technology Stack](https://github.com/openhorizonrobotics/mapmit/blob/documentation-update/README.md#technology-stack)
- [Getting Started](https://github.com/openhorizonrobotics/mapmit/blob/documentation-update/README.md#getting-started)
- [Usage](https://github.com/openhorizonrobotics/mapmit/blob/documentation-update/README.md#usage)
- [Contributing](https://github.com/openhorizonrobotics/mapmit/blob/documentation-update/README.md#contributions)
- [License](https://github.com/openhorizonrobotics/mapmit/blob/documentation-update/README.md#license)
- [Acknowledgements](https://github.com/openhorizonrobotics/mapmit/blob/documentation-update/README.md#acknowledgements)

## Introduction
MapMIT aims to improve campus navigation and event discovery through a comprehensive platform that integrates:

- Interactive campus maps
- Real-time event visualization and management
- Automated drone-based mapping updates
- Historical event tracking and analytics

This project was inspired by the need for an updated and user-friendly campus map to assist students, staff, and visitors in navigating the MIT campus effectively. (And also because it was a cool thing to work on : )
Overtime it grew to become a full scale FOSS project that it is presently with an automation component.

## Project Components
1. Interactive WebMap (GIS)

- Real-time visualization of campus events on an interactive map
- Historical event tracking database
- Intuitive interface for navigation and event discovery & creation
- One-click event details and registration forms
- Layer-based visualization of campus facilities

2. Automated Drone Mapping

- Open-Source drone for campus surveying
- Photogrammetry workflow for 3D reconstruction
- GPS-guided navigation system (within drone)
- Automated data processing pipeline
  
## Development Phases
### Phase 1: Base Mapping (Completed)
Objective:-  
- QGIS-based static campus map
- Basic building and pathway mapping
- Terrain visualization
- PDF exports for static use

### Phase 2: Web Platform (In Progress)
Objective:-  
- Interactive web interface using OpenLayers
- Basic building information display
- Event management system integration
- User authentication and roles

### Phase 3: Drone and Photogrammetry Integration (In Development)
Objective:-  
- Initial drone test flights
- Automated flight path planning
- Photogrammetry pipeline setup
- Map update automation

### Phase 4: Full Platform Integration (Planned)
Objective:-  
- Real-time event updates
- Automated map maintenance
- 3D layers made using photogrammetry
- Event Analytics dashboard
- Event History log and viewer
- User Login and Event Registration with admin approval pipeline
and more in planning phase...

## Technology Stack
### Software
1. GIS Software: QGIS for map creation and data management.
2. Web Mapping Library: OpenLayers for web map development.
3. Languages: HTML, CSS, JavaScript for web development.
4. Data Formats: Shapefiles, GeoJSON for data handling. (refer static map readme)
5. Database: PostgreSQL with PostGIS
### Hardware
1. Drone: F4 Flight Controller, BLDC Motor, M8 GPS 
2. Photogrammetry: Meshroom for 3D model reconstruction, Cleanup in Blender
3. Data Acquisition: FireHawk 4K Camera

## Getting Started  
### Prerequisites:-  
1. QGIS installed (3.x or higher)  
2. Basic knowledge of HTML, CSS, JavaScript  
3. Familiarity with web mapping libraries (Leaflet/Mapbox/OpenLayers).

### Installation:-  
Clone the repository:
```
git clone https://github.com/openhorizonrobotics/mapmit   
cd mapmit  
```
### Set up QGIS:  
Open QGIS and import the Geopackage along with all attached files from the `qgis project` directory.  

# Setting Up Local Development Environment


If you are facing CORS issues when loading .geojson files directly from your file system, it is because modern browsers block file:// protocol requests due to security restrictions. This guide provides solutions to run a local server and fix the issue.

## 1. Running a Local Server

Instead of opening index.html directly, you need to serve your project through a local web server. Below are different ways to set up a local server.

Using Python HTTP Server

If you have Python installed, you can start a simple HTTP server.

### For Python 3:
```
python -m http.server 8000
```
### For Python 2:
```
python -m SimpleHTTPServer 8000
```
Open http://localhost:8000 in your browser.

## Using Node.js HTTP Server

If you have Node.js installed, you can use http-server to serve files.

Install http-server globally:
```
npm install -g http-server
```
Start the server in your project directory:
```
http-server .
```
Open http://localhost:8080 in your browser.

## Using Live Server in VS Code

If you are using VS Code, the Live Server extension provides an easy way to run a local server.
Install Live Server from the VS Code extensions marketplace.
Right-click index.html → Open with Live Server.
Your browser should open automatically at http://127.0.0.1:5500.

Open your project in the browser using http://localhost:8000 (or the respective port based on the method used).
Check if .geojson files load correctly without CORS errors.

## 3. Troubleshooting

If the server doesn't start, ensure Python/Node.js is installed correctly.
Try a different port if 8000 or 8080 is occupied (python -m http.server 9000).
Clear your browser cache or use an incognito window if issues persist.

## Usage
(Instructions to be added as the project progresses.)

## Contributions
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch 
3. Commit your changes 
4. Push to the branch 
5. Open a pull request.
## License
This project is licensed under GNU Affero General Public License v3.0 - refer the [License file](https://github.com/openhorizonrobotics/mapmit/blob/main/LICENSE)
## Acknowledgements  
Thanks to the QGIS community for their excellent GIS software.  
Special thanks to the Department of Instrumentation and Control Engineering (ICE) and Innovation Centre, MIT Manipal for supporting the project.  
Inspired by interactive maps from other universities.
