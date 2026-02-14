
export interface VideoRequestData {
    file: File;
    onProgress: (val: number) => void;
}


export interface MLResponseData {
    avg_car_count: number;
    avg_bike_count: number;
    avg_heavy_vehicles: number;
    vehicle_density: number;
    avg_speed: number;
    motion_score: number;
    weather_code: number;
    wrong_movement_ratio: number;
    total_frames: number;
    congestion_level: string;
}