import React, {Component} from "react";
import {
  Map,
  TileLayer,
  ZoomControl,
  Pane,
  LayersControl,
  FeatureGroup,
  ScaleControl,
  Rectangle,
  CircleMarker,
} from "react-leaflet";
import {latLng} from "leaflet";
import get from "lodash/get";
import MapillaryViewer from "./MapillaryViewer";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import MapillaryGeoJSONLayer from "./MapillaryGeoJSONLayer";
import {setUrlValue, getUrlValue} from "../../stores/UrlManager";
import {observer, inject} from "mobx-react";
import {app} from "mobx-app";
import {observable, action} from "mobx";

const MapContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  > .leaflet-container {
    width: 100%;
    height: 100%;
    z-index: 0;
    flex: 1 1 50%;
  }
`;

const MapillaryView = styled(MapillaryViewer)`
  width: 100%;
  height: 100%;
  flex: 1 1 50%;
  position: relative;
`;

const visualLog = observable(
  {bounds: [], points: []},
  {bounds: observable.ref, points: observable.ref}
);

// Call this to visualize bounds anywhere in the app. Dev tool.
export const visualizeBounds = action((boundsOrPoint) => {
  if (boundsOrPoint.lat) {
    visualLog.points.push(boundsOrPoint);
  } else {
    visualLog.bounds.push(boundsOrPoint);
  }
});

@inject(app("UI"))
@observer
class LeafletMap extends Component {
  state = {
    currentBaseLayer: getUrlValue("mapBaseLayer", "Digitransit"),
    currentMapillaryMapLocation: false,
  };

  onChangeBaseLayer = ({name}) => {
    setUrlValue("mapBaseLayer", name);

    this.setState({
      currentBaseLayer: name,
    });
  };

  onMapillaryNavigation = ({latLon: {lat, lon}}) => {
    const location = latLng({lat, lng: lon});

    this.setState({
      currentMapillaryMapLocation: location,
    });
  };

  render() {
    const {
      state: {mapOverlays},
      UI: {changeOverlay},
      mapRef,
      children,
      className,
      currentMapillaryViewerLocation,
      setMapillaryViewerLocation,
      onZoom = () => {},
      onMapChanged = () => {},
    } = this.props;

    let mapView = null;

    if (mapRef.current) {
      mapView = mapRef.current.leafletElement.getBounds();
    }

    const {currentBaseLayer, currentMapillaryMapLocation} = this.state;

    return (
      <MapContainer className={className}>
        <Map
          key="the-map"
          ref={mapRef}
          maxZoom={18}
          zoomSnap={1}
          wheelPxPerZoomLevel={50}
          selectArea={true}
          zoomControl={false}
          onBaselayerchange={this.onChangeBaseLayer}
          onOverlayadd={changeOverlay("add")}
          onOverlayremove={changeOverlay("remove")}
          onZoomend={onZoom}
          onMoveend={onMapChanged}>
          <LayersControl position="topright">
            <LayersControl.BaseLayer
              name="Digitransit"
              checked={currentBaseLayer === "Digitransit"}>
              <TileLayer
                attribution={
                  'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors '
                }
                url="https://digitransit-prod-cdn-origin.azureedge.net/map/v1/hsl-map/{z}/{x}/{y}@2x.png"
                tileSize={512}
                zoomOffset={-1}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer
              name="Aerial"
              checked={currentBaseLayer === "Aerial"}>
              <TileLayer
                tileSize={256}
                attribution="© Espoon, Helsingin ja Vantaan kauupungit, Kirkkonummen ja Nurmijärven kunnat sekä HSL ja HSY"
                url="https://ortophotos.blob.core.windows.net/hsy-map/hsy_tiles2/{z}/{x}/{y}.jpg"
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay
              name="Mapillary"
              checked={mapOverlays.includes("Mapillary")}>
              <MapillaryGeoJSONLayer
                map={get(mapRef, "current.leafletElement", null)}
                viewBbox={mapView}
                location={currentMapillaryMapLocation}
                layerIsActive={mapOverlays.includes("Mapillary")}
                onSelectLocation={setMapillaryViewerLocation}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay
              name="Stop radius"
              checked={mapOverlays.includes("Stop radius")}>
              <FeatureGroup>
                {/*
                  The stop radius is rendered in the StopMarker component. This featuregroup
                  is just a dummy so that the option will show in the layer control.
                */}
              </FeatureGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay
              name="Weather"
              checked={mapOverlays.includes("Weather")}>
              <FeatureGroup>
                {/*
                  The weather display is rendered in MapContent. This featuregroup
                  is just a dummy so that the option will show in the layer control.
                */}
              </FeatureGroup>
            </LayersControl.Overlay>
          </LayersControl>
          <Pane name="mapillary-lines" style={{zIndex: 390}} />
          <Pane name="mapillary-location" style={{zIndex: 400}} />
          <Pane name="route-lines" style={{zIndex: 410}} />
          <Pane name="event-lines" style={{zIndex: 420}} />
          <Pane name="stop-radius" style={{zIndex: 440}} />
          <Pane name="selected-stop-radius" style={{zIndex: 445}} />
          <Pane name="stops" style={{zIndex: 450}} />
          <Pane name="event-hover" style={{zIndex: 475}} />
          <Pane name="hfp-markers" style={{zIndex: 500}} />
          <Pane name="hfp-markers-primary" style={{zIndex: 550}} />
          <Pane name="popups" style={{zIndex: 600}} />
          <ZoomControl position="topright" />
          <ScaleControl position="bottomleft" imperial={false} />
          {visualLog.bounds.length !== 0 &&
            visualLog.bounds.map((bounds, index) => (
              <Rectangle key={`bounds_${index}`} bounds={bounds} />
            ))}
          {visualLog.points.length !== 0 &&
            visualLog.points.map((point, index) => (
              <CircleMarker key={`points_${index}`} center={point} radius={10} />
            ))}
          {children}
        </Map>
        {currentMapillaryViewerLocation && (
          <MapillaryView
            onCloseViewer={() => setMapillaryViewerLocation(false)}
            elementId="mapillary-viewer"
            onNavigation={this.onMapillaryNavigation}
            location={currentMapillaryViewerLocation}
          />
        )}
      </MapContainer>
    );
  }
}

export default LeafletMap;
