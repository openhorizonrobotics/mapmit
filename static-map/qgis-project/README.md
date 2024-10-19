# Usage and Installation Instructions  
This Directory includes a zip file which contains all the data needed to work on the project using QGIS.  
## Explanation of QGIS Project Files  
When you create a QGIS project, the zip file will contain several components.  
1. ``.qgs`` File is the **Main QGIS Project XML file** which contains all the map layers, styles and configurations. (Note that you still need separate layer files within the same folder, otherwise you will get empty layers if you only install the project file)  
2. Every Layer on QGIS comes with several files called **Shapefiles** having format - ``.shp, .shx, .qix, .dbf, .prj``  
- ``.shp``: The actual geometry data (points, lines, polygons).
- ``.shx``: The shape index format. (Shape Index)
- ``qix``: The index file used to speed up spatial queries and rendering for shapefiles. (Spatial Index)
- ``.dbf``: The attribute data associated with each shape. (Spreadsheet)
- ``.prj``: The projection format, defining the coordinate system of the map. (Coordinate System)
3. **Georeferencing**: We have also Georeferenced some existing maps on QGIS to better design our map.  
In Georeferencing be basically align a raster image (such as a scanned map, satellite image, or aerial photograph) to a specific location on the earth’s surface on a specified coordinate system. It assigns real-world coordinates (latitude and longitude or projected coordinates) to the pixels in the image, enabling it to be accurately overlay with other spatial data layers like roads, buildings, or elevation models.  
- ``.tif``: These are satellite or other raster images used as basemaps. They provide background imagery.
- ``.points``: contains the ground control points (GCPs) used for georeferencing. GCPs are specific points on the raster image matched with real-world coordinates, helping the software align the image correctly.
- ``.tif.aux.xml``: An auxiliary metadata file associated with the georeferenced TIFF.
4. **WebMapping**
- ``.geojson``: GeoJSON files contain the geographic data used in the project in a JSON format, which is compatible with web mapping libraries and easy to manipulate.
-----------------------------------------------------------------------------------------------------------------
## How to Install the QGIS Project
If someone wants to work on the project or view the map in QGIS, they can follow these steps:  
#### Download QGIS:  
1. Download the latest version from [QGIS Download](https://qgis.org/download/) .  
2. Extract the Project Files:  
- Download the ``QGIS.zip`` file.  
- Extract the zip file to a local directory of your choice.  
3. Open the QGIS Project:  
- Open QGIS and go to Project > Open...  
![image](https://github.com/user-attachments/assets/b3cc31bf-59e7-4c7b-ac3c-e17f4c943622)  
- Navigate to the directory where you extracted the files and select the .qgs file to open the project.  
  ![image](https://github.com/user-attachments/assets/8596b2a3-281d-4e71-9234-6d43b6ae9db9)  
4. Check Layer Dependencies:  
Ensure that all the associated files (shapefiles, rasters, etc.) are in the correct paths (They should all be in the same directory as the main ``.qgs`` project file. If QGIS prompts for missing files, relink them by pointing QGIS to the correct location.  
5. View and Edit the Map:  
The map should now load with all its layers and styles. You can start exploring the campus map, edit features, or update the styles as needed.  

-------------------------------------------------------------
#### Contributions
We welcome contributions to enhance and detail the campus map further. Whether you want to add new features, update information, or improve existing layers, your contributions are highly appreciated!  

1. Fork the Repository
2. Clone Your Fork
3. Make Changes
4. Commit and Push
5. Create a Pull Request (PR) on original repository and describe what changes you’ve made and how they improve the project.
6. The project maintainers will review your PR. If it meets the standards, it will be merged into the main branch.  

Feel free to collaborate and contribute to making the campus map more comprehensive and user-friendly!  
