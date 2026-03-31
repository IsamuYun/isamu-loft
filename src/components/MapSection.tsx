import { lazy, Suspense } from 'react';

const Map = lazy(() => import('./Map'));

export default function MapSection() {
  return (
    <Suspense fallback={
      <div className="h-72 bg-white flex items-center justify-center text-gray-500 text-sm">
        加载地图中...
      </div>
    }>
      <Map
        options={{ tracking: true, showPaths: true }}
        className="h-72 w-full"
      />
    </Suspense>
  );
}
