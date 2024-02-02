import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

export const CustomMap = ({ zoom = 15, style = containerStyle, content = <></>, latitudCenter = 0, longitudCenter = 0 }) => {
    const [ center , setCenter ] = useState({
        lat: latitudCenter,
        lng: longitudCenter
    });

    const [ map, setMap ] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC1wdZv-4Y09fSIV7E-729dwzGFzI5Dq6A"
    });

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={ style }
            center={ center }
            zoom={ zoom }
            onUnmount={ onUnmount }
        >
            { content }
        </GoogleMap>
    ) : null;
};

const containerStyle = {
    width: '100%',
    height: '400px'
};
