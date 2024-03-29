import { FC, useEffect, useState, Fragment, ReactElement, ChangeEvent } from "react"
import { FormField, Htag, Paragraph, RenderCards, Loader, ButtonOutline, MetaData } from "../../components"
import { NETWORK_CONNECTION_ERROR, NO_POSTS_FOUND_ERROR, NO_SEARCH_RESULTS_ERROR } from '../../constants'
import { TSearchFormDto, IPost } from "../../types/api-types"
import { useForm } from "react-hook-form"
import { SearchSvg } from "../../lib/utils/svg-exports"
import toast from 'react-hot-toast'
import { queries } from "../../lib/react-queries"
import { useDebounce } from "../../hooks/useDebounce.ts"

const HomePage: FC = (): ReactElement => {
    const {
        register,
        watch,
        setValue,
        formState: {errors }
    } = useForm<TSearchFormDto>({
        defaultValues: { searchedText: '' },
        mode: 'onChange'
    })

    const [ searchedPosts, setSearchedPosts ] = useState<IPost[] | []>([])

    const searchedText = watch("searchedText")
    const debouncedValue = useDebounce(searchedText, 500)

    const {
        data: posts,
        hasNextPage,
        fetchNextPage,
        isPending: isPostsPending,
        isFetchingNextPage,
        isError: isPostsError,
        error: postsError
    } = queries.useGetAllPosts()

    const {
        data: searchResults,
        isSuccess: isSearchedPostsSuccess,
        isPending: isSearchedPostsPending
    } = queries.useGetSearchedPosts(debouncedValue)

    const shouldShowSearchResults = searchedText !== ''
    const shouldShowPosts = !shouldShowSearchResults

    useEffect(() => {
        if (isSearchedPostsSuccess) {
            setSearchedPosts(searchResults?.data)
        }
    }, [searchResults])

    useEffect(() => {
        if (isPostsError) {
            toast.error(postsError.code === 'ERR_NETWORK' ? NETWORK_CONNECTION_ERROR : postsError?.response?.data?.message)
        }
    }, [isPostsError])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setValue('searchedText', event.target.value)    

    return (
        <Fragment>
            <MetaData
                title="Home Page"
                description="Explore new interesting posts with beautiful images from Open AI"
                ogTitle="The Community Showcase"
                ogDescription="Discover through a collection of imaginative and visually stunning images generated by Pointer"
                ogUrl="https://pointer-2-client.vercel.app"
                ogImage="https://res.cloudinary.com/bandmsociety/image/upload/v1701705252/pointer/store/p4qlq9czsxmefgq0cyup.webp"
            />
            <section className="search">
                <div className='flex flex-center items-center'>
                    <div className="container">
                        <div className="search-promo">
                            <Htag level={1} color='primary' className='main-title'>
                                THE COMMUNITY SHOWCASE
                            </Htag>
                            <Paragraph size='large' className="main-subtitle">
                                Discover through a collection of imaginative and visually stunning images generated by
                                Pointer
                            </Paragraph>
                            <form className="search-field">
                                <FormField
                                    type="text"
                                    register={register}
                                    handleChange={handleInputChange}
                                    label="Searched text"
                                    errorMessage={errors?.searchedText?.message}
                                    name="searchedText"
                                    placeholder="Search something..."
                                    icon={SearchSvg}
                                    inputMode="search"
                                    maxLength={201}
                                    ariaInvalid={!!errors.searchedText}
                                    required
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="posts">
                <div className="flex flex-center items-center">
                    <div className="container posts-block">
                        {isPostsPending && isSearchedPostsPending ? (
                            <div className="flex flex-center items-center">
                                <Loader/>
                            </div>
                        ) : (
                            <div className="grid-wrapper">
                                {shouldShowPosts && (
                                    <>
                                        {posts?.pages.map((group, index) => (
                                            <Fragment key={index}>
                                                <RenderCards data={group.data} title={NO_POSTS_FOUND_ERROR} />
                                            </Fragment>
                                        ))}
                                    </>
                                )}
                                {shouldShowSearchResults && (
                                    <RenderCards data={searchedPosts} title={NO_SEARCH_RESULTS_ERROR}/>
                                )}
                            </div>
                        )}
                        {hasNextPage && !shouldShowSearchResults && (
                            <div className="flex flex-center items-center load-more">
                                <ButtonOutline
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage || !hasNextPage}
                                >
                                    {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                                </ButtonOutline>
                            </div>
                        )}
                        {isFetchingNextPage && (
                            <div className="flex flex-center items-center">
                                <Loader/>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default HomePage