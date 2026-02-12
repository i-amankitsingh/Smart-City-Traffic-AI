import axiosInstance from "@/api/axiosInstance";
import type { VideoRequestData } from "@/schema/videoSchema";



export const processVideo = async (data: VideoRequestData) => {
    try {
        const formData = new FormData();

        formData.append("file", data.file);

        const response = await axiosInstance.post(`/api/v1/video/process-video`, formData);

        return response.data;

    } catch (error) {
        throw error;
    }
}