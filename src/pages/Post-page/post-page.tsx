import { FC, useEffect, Fragment, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Htag, Paragraph, FormField, ButtonPrimary, Loader, ButtonSecondary, ButtonOutline, RadioField, MetaData } from '../../components'
import { GENERATED_IMAGE_SUCCESS, ENTER_PROMPT_ERROR, IMAGE_SUCCESSFULLY_CREATED, CREATE_POST_ERROR } from '../../constants'
import { ProfileSvg, TextSvg, PreviewImageSvg } from '../../lib/utils/svg-exports'
import { PostFormSchema } from '../../lib/utils/form-validation'
import { ICreatePostDto } from '../../types/api-types'
import { yupResolver } from '@hookform/resolvers/yup'
import { ImageDataSizes } from './data'
import toast from 'react-hot-toast'
import { queries } from '../../lib/react-queries'

const PostPage: FC = (): ReactElement => {
    const navigate = useNavigate()

    const { 
        register, 
        handleSubmit, 
        reset, 
        watch, 
        setValue, 
        getValues, 
        formState: { errors, isValid, isSubmitting } 
    } = useForm<ICreatePostDto>({  
        mode: 'onChange', 
        resolver: yupResolver(PostFormSchema),
        defaultValues: {
            userName: '',
            prompt: '',
            image: '',
            size: ImageDataSizes[0].value
        }
    }) 

    const watchedValues = watch()
    const { image, prompt, size } = getValues()

    const { 
        mutateAsync: createNewPost, 
        isPending: isLoadingPost,
        isError: isCreatePostError,
        error: createPostError
    } = queries.useCreatePost()

    const { 
        mutateAsync: generateImageMutation, 
        isPending: isImageLoading, 
        isError: isGenerateImageError, 
        error: generateImageError
    } = queries.useGenerateImage()
    

    const generateImage = async () => {
        if (watchedValues.prompt) {
            const data = await generateImageMutation({ prompt: watchedValues.prompt, size: watchedValues.size })
            setValue('image', `data:image/jpeg;base64,${data.image}`, { shouldValidate: true })
            toast.success(GENERATED_IMAGE_SUCCESS)
        } else {
            toast.error(ENTER_PROMPT_ERROR)
        }
    }

    const Submit: SubmitHandler<ICreatePostDto> = async data => {
        if (prompt && image) {
            const { userName, prompt, image } = data
            await createNewPost({ userName, prompt, image })
            toast.success(IMAGE_SUCCESSFULLY_CREATED)
            navigate('/')
        } else {
            toast.error(CREATE_POST_ERROR)
        }
    }

    useEffect(() => {
        if (isGenerateImageError) {
            reset({ size: size, image: generateImageError?.response?.data?.image })
            toast.error(generateImageError?.response?.data.message)
        } else if (isCreatePostError) {
            toast.error(createPostError?.response?.data.message)
        }
    }, [isGenerateImageError, isCreatePostError])
    

    return (
        <Fragment>
            <MetaData
                title="Post Page"
                description="Feel free to create a post with generated Open AI image and assigned prompt"
                ogTitle="Create"
                ogDescription="Generate an imaginative image through DALL-E AI and share it with the community"
                ogUrl="https://pointer-2-client.vercel.app/create-post"
                ogImage="https://res.cloudinary.com/bandmsociety/image/upload/v1701705252/pointer/store/p4qlq9czsxmefgq0cyup.webp"
            />
            <section className='post'>
                <div className='flex flex-center items-center'>
                    <div className="container">
                        <div className='post-promo'>
                            <Htag level={1} color='primary' className="main-title post-promo__title">CREATE</Htag>
                            <Paragraph size='large' className='main-subtitle post-promo__subtitle'>
                                Generate an imaginative image through&nbsp; 
                                <span id='accent-color'>
                                    DALL-E AI
                                </span> and share it with the community
                            </Paragraph>
                        </div>
                        <div className='post-block'>
                            <form className='form' onSubmit={handleSubmit(Submit)}>
                                <FormField
                                    type="text"
                                    register={register}
                                    name='userName'
                                    label="User Name"
                                    icon={ProfileSvg}
                                    errorMessage={errors?.userName?.message}
                                    placeholder="Ex., Max"
                                    inputMode='text'
                                    ariaInvalid={!!errors.userName}
                                    maxLength={101}
                                    autoComplete="off"
                                    required
                                />
                                <FormField
                                    type="text"
                                    register={register}
                                    name="prompt"
                                    label="Prompt"
                                    icon={TextSvg}
                                    errorMessage={errors?.prompt?.message}
                                    placeholder="A crazy cat is playing video-game..."
                                    inputMode='text'
                                    ariaInvalid={!!errors.prompt}
                                    maxLength={301}
                                    autoComplete="off"
                                    required
                                />
                                <RadioField
                                    register={register}
                                    name='size'
                                    defaultValue={size}
                                    options={ImageDataSizes}
                                />
                                <div className="preview-image mobile">
                                    <Fragment>
                                        {image ? (
                                            <img
                                                src={image}
                                                alt={prompt}
                                                className="preview-image__success"
                                            />
                                        ) : (
                                            <img
                                                width={250}
                                                height={250}
                                                src={PreviewImageSvg}
                                                alt="preview"
                                                className="preview-image__unload"
                                            />
                                        )}
                                        {isImageLoading && (
                                            <div className="preview-image__loading">
                                                <Loader />
                                            </div>
                                        )}
                                    </Fragment>
                                </div>
                                <div className='post-block__submit'>
                                    {image ? (
                                        <ButtonOutline type="button" onClick={() => reset()}>
                                            Reset
                                        </ButtonOutline>
                                    ) : (
                                        <ButtonSecondary type="button" onClick={generateImage} disabled={isImageLoading}>
                                            {isImageLoading ? 'Generating...' : 'Generate image'}
                                        </ButtonSecondary>
                                    )}
                                </div>
                                <div className='post-block__submit'>
                                    <small>
                                        ** Once you have created the image you want, you can share it with others in the community **
                                    </small>
                                    <ButtonPrimary type="submit" disabled={!isValid || isSubmitting}>
                                        {isLoadingPost ? 'Creating...' : 'Create'}
                                    </ButtonPrimary>
                                </div>
                            </form>
                            <div className="preview-image desktop">
                                <Fragment>
                                    {image ? (
                                        <img
                                            src={image}
                                            alt={watchedValues.prompt}
                                            className="preview-image__success"
                                        />
                                    ) : (
                                        <img
                                            width={250}
                                            height={250}
                                            src={PreviewImageSvg}
                                            alt="preview"
                                            className="preview-image__unload"
                                        />
                                    )}
                                    {isImageLoading && (
                                        <div className="preview-image__loading">
                                            <Loader />
                                        </div>
                                    )}
                                </Fragment>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default PostPage