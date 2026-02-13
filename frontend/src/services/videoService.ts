import axiosInstance from "@/api/axiosInstance";
import type { VideoRequestData } from "@/schema/videoSchema";



export const processVideo = async ({ file, onProgress }: VideoRequestData) => {
    try {
        const formData = new FormData();

        formData.append("file", file);

        const response = await axiosInstance.post(`/api/v1/video/process-video`, formData, {
            onUploadProgress(progressEvent) {
                if (onProgress) {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                    onProgress(percent);
                }
            },
        });

        return response.data;

    } catch (error) {
        throw error;
    }
}