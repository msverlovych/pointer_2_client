export interface IOpenAImageResponse {
    image: string,
    message: string
}

export interface IPost {
    _id: string,
    userName: string,
    prompt: string,
    image: {
        url: string,
        height: number,
        width: number
    },
    createdAt: string
}

export interface IPostResponse {
    data: IPost[]
}

export interface TSearchFormDto { 
    searchedText: string 
}

export interface IGenerateImageDto {
    prompt: string,
    size: string
}

export interface ICreatePostDto { 
    userName: string, 
    prompt: string,
    image: string,
    size: string
}