import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const Coverage = () => {
    const position = [23.8103, 90.4125];


    return (
        <div className='border w-[400px] h-[400px]'>
            <MapContainer
                center={position}
                zoom={8}
                scrollWheelZoom={false}
                className='h-[400px] w-[400px]'
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    );
};

export default Coverage;
