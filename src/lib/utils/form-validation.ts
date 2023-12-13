import * as yup from "yup"

export const SearchFormSchema = yup.object().shape({
    searchedText: yup.string().max(200).required('Search text is required'),
})

export const PostFormSchema = yup.object().shape({
    userName: yup.string().min(1).max(100).required('Username is required'),
    prompt: yup.string().min(1).max(300).required('Prompt is required'),
    image: yup.string().required('Image is required'),
    size: yup.string().optional().defined()
})