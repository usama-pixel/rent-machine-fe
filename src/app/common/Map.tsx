'use client'
import { Loader } from '@googlemaps/js-api-loader'
import React, { useEffect, useRef } from 'react'

type Props = {}

function Map({}: Props) {
    const mapRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const initMap = async () => {
            const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
            console.log('map init')
            const loader = new Loader({
                apiKey: googleMapApiKey,
                version: 'weekly'
            })
            const { Map } = await loader.importLibrary('maps')
            const position = {
                lat: 43.642693,
                lng: -79.3871189
            }
            // map options
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 17,
                mapId: 'My_Nestjs_MapId'
            }
            // Set up the map
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions)
        }
        initMap();
    }, [])
  return (
    <div className='h-[600px]' ref={mapRef} />
  )
}

export default Map