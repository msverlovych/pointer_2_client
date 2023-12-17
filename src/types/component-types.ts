import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, HtmlHTMLAttributes, InputHTMLAttributes, ReactNode, MouseEvent } from "react"
import { UseFormRegister, FieldValues, Path } from "react-hook-form"
import { IPost } from "./api-types"

export enum ERoutes {
  HOME = '/',
  POST_PAGE = '/create-post',
  UNKNOWN_PATH = '*'
}

export enum ESizes {
  SMALL = '1024x1024',
  MEDIUM = '1024x1792',
  LARGE = '1792x1024'
}

export interface IButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode
} 

export interface ILinkButtonProps {
  className?: string,
  onClick?: (event: MouseEvent<HTMLImageElement>) => void,
  icon: string,
  path: string,
  alt: string,
  ariaLabel?: string
}

export interface PrimaryButtonProps extends IButton {} 
export interface SecondaryButtonProps extends IButton {}
export interface OutlineButtonProps extends IButton {}

export interface MainLogoProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type ColorVariantsType = {[key: string]: string}
export type ParagraphSizesType = {[key: string]: string}
export type LogoSizeType = {[key: string]: string}


export interface HtagProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6,
  color?: 'primary' | 'secondary' | 'ghost',
  className?: string,
  children: ReactNode
}

export interface ParagraphProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  size?: 'small' | 'medium' | 'large',
  color?: 'primary' | 'secondary' | 'ghost',
  children: ReactNode
}

export interface IFormField<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>, 
  placeholder: string,
  ariaInvalid?: boolean,
  register: UseFormRegister<T>,
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  required?: boolean,
  errorMessage?: string, 
  icon?: string,
  label?: string
}

export interface IRadioField<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>, 
  label?: string,
  defaultValue?: string,
  options: TRadioOptions,
  register : UseFormRegister<T>,
  required?: boolean
}

export type TRadioOptions = Array<{ name: string, value?: string }>

export interface IRenderCards {
  data: IPost[],
  title: string
}

export type TMetaData = {
  title: string,
  description: string,
  ogTitle: string,
  ogDescription: string,
  ogUrl: string,
  ogImage: string,
  canonicalLink?: string
}