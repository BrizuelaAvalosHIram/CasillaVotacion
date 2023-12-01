import React from "react";
import { Marker } from "react-leaflet";
import { IconLocation } from './IconLocation';
import {places} from '../assets/data.json';
const Markers = () => {
    return (
        
        <Marker position={{lat: "19.245947239237", lng: "-103.7529832426577"}} icon={IconLocation} />
    );
};


export default Markers;