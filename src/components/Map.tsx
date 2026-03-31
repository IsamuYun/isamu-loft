import React, { useEffect, useRef } from 'react';
import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { PathLayer } from '@deck.gl/layers';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
// 注意：确保 trip-builder 也有对应的 .d.ts 或者使用 @ts-ignore
import TripBuilder from '../utils/trip-builder';

import tripsJson from '../data/trips.json';

interface MapOptions {
  tracking?: boolean;
  showPaths?: boolean;
}

interface MapProps {
  options?: MapOptions;
  className?: string;
}

// 定义 TripBuilder 返回的帧数据类型
interface TripFrame {
  point: [number, number];
  heading: number;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || '';

//const DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/google-3d/trips.json';

const MODEL_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/google-3d/truck.gltf';

const Map: React.FC<MapProps> = ({ options = { tracking: true, showPaths: true }, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  // Stabilize options in a ref so useEffect only runs once on mount
  const optionsRef = useRef(options);

  useEffect(() => {
    if (!containerRef.current) return;

    let overlay: DeckOverlay;
    const { tracking, showPaths } = optionsRef.current;

    const init = async () => {
      try {
        setOptions({ apiKey: GOOGLE_MAPS_API_KEY });
        const googlemaps = await importLibrary('maps') as google.maps.MapsLibrary;

        const data = tripsJson;

        const map = new googlemaps.Map(containerRef.current!, {
          center: { lng: -118.190165, lat: 33.751889 },
          zoom: 19,
          heading: 0,
          tilt: 45,
          isFractionalZoomEnabled: true,
          mapId: GOOGLE_MAP_ID,
          streetViewControl: false
        });

        overlay = new DeckOverlay({});
        overlay.setMap(map);

        const trips = data.map((waypoints: any) => new TripBuilder({ waypoints, loop: true }));
        let timestamp = 0;

        const onAnimationFrame = () => {
          timestamp += 0.02;
          const frame: TripFrame[] = trips.map((trip: any) => trip.getFrame(timestamp));

          if (tracking && frame[0]) {
            map.moveCamera({
              center: { lat: frame[0].point[1], lng: frame[0].point[0] },
              heading: frame[0].heading
            });
          }

          const layers = [
            showPaths && new PathLayer({
              id: 'trip-lines',
              data: trips,
              getPath: (d: any) => d.keyframes.map((f: any) => f.point),
              getColor: () => [128 * Math.random(), 255 * Math.random(), 255],
              jointRounded: true,
              opacity: 0.5,
              getWidth: 0.5
            }),
            new ScenegraphLayer({
              id: 'truck',
              data: frame,
              scenegraph: MODEL_URL,
              sizeScale: 2,
              getPosition: (d: TripFrame) => d.point,
              getTranslation: [0, 0, 1],
              getOrientation: (d: TripFrame) => [0, 180 - d.heading, 90],
              _lighting: 'pbr'
            })
          ];

          overlay.setProps({ layers: layers.filter(Boolean) as any[] });
          animationRef.current = requestAnimationFrame(onAnimationFrame);
        };

        onAnimationFrame();
      } catch (err) {
        console.error('[Map] initialization failed:', err);
      }
    };

    init();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (overlay) overlay.finalize();
    };
  }, []); // run once on mount

  return <div ref={containerRef} className={className} style={{ width: '100%' }} />;
};

export default Map;