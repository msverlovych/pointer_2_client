import { useMutation, useQueryClient, useInfiniteQuery, useQuery, Register } from '@tanstack/react-query'
import { ICreatePostDto, IGenerateImageDto } from '../types/api-types'
import { postApi } from '../api'
import { QUERY_KEYS } from './query-keys'
import { AxiosError } from 'axios'

declare module '@tanstack/react-query' {
    interface Register {
      defaultError: AxiosError<any>
    }
}

class Queries {
    useGenerateImage() {
        return useMutation({
            mutationFn: (dto: IGenerateImageDto) => postApi.generateImage(dto)
        })
    }

    useCreatePost() {
        const queryClient = useQueryClient()

        return useMutation({
            mutationFn: (dto: Omit<ICreatePostDto, 'size'>) => postApi.createPost(dto),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_ALL_POSTS_KEY]
                }).catch((error: Register) => error.defaultError)
            }
        })
    }

    useGetAllPosts() {
        return useInfiniteQuery({
            queryKey: [QUERY_KEYS.GET_ALL_POSTS_KEY],
            queryFn: postApi.getAllPosts,
            initialPageParam: 1,
            getNextPageParam: (lastPage, pages) => lastPage.data.length === 10 ? pages.length + 1 : null,
        })
    }

    useGetSearchedPosts(searchQuery: string) {
        return useQuery({
            queryKey: [QUERY_KEYS.GET_SEARCHED_POSTS_KEY, searchQuery],
            queryFn: () => postApi.getPostsBySearch({ searchQuery }),
            enabled: !!searchQuery
        })
    }
}

export const queries = new Queries()