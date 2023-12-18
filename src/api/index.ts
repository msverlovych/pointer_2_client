import axios from "axios"
import { IOpenAImageResponse, IPostResponse, ICreatePostDto, IGenerateImageDto } from "../types/api-types"

const _instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_PROD,
    headers: {
        'Content-Type': 'application/json'
    }
})

class PostAPI {
    async generateImage(dto: IGenerateImageDto): Promise<IOpenAImageResponse> {
        const { data } = await _instance.post<IGenerateImageDto, { data: IOpenAImageResponse }>('/ai/create', dto)
        return data
    }

    async createPost(dto: Omit<ICreatePostDto, 'size'>) {
        await _instance.post<Omit<ICreatePostDto, 'size'>>('/post/create', dto)
    }

    async getAllPosts({ pageParam }: { pageParam: number }): Promise<IPostResponse> {
        const { data } = await _instance.get<IPostResponse, { data: IPostResponse }>(`/post/posts?cursor=${pageParam.toString()}`)        
        return data
    }

    async getPostsBySearch({ searchQuery }: { searchQuery: string }): Promise<IPostResponse> {
        const { data } = await _instance.get<IPostResponse, { data: IPostResponse }>(`/post/posts/search?searchQuery=${searchQuery}`)
        return data
    }
}

export const postApi = new PostAPI()