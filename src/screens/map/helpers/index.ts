export const convertKmToPixels = (km: number, zoomLevel: number, latitude: number) => {
    const metersPerPixel = (Math.cos(latitude * Math.PI / 180) * 156543.03392) / Math.pow(2, zoomLevel);
    const radiusInMeters = km * 1000;
    return radiusInMeters / metersPerPixel;
};
