import React from "react";
import { Marker } from "react-leaflet";
import { IconLocation } from './IconLocation';
import {places} from '../assets/data.json';
const Markers = () => {
    return (
        
        <Marker position={{lat: "19.2491977030456", lng: "-103.69737828607505"}} icon={IconLocation} />
    );
};


export default Markers;