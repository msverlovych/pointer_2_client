import { ReactElement } from "react"
import { IFormField } from '../../types/component-types'
import { DeepPartial, FieldValues } from 'react-hook-form'
import { cn } from '../../lib/utils'

const FormField = <T extends DeepPartial<FieldValues>>({ 
  type, 
  name, 
  placeholder, 
  ariaInvalid,
  required,
  register,
  handleChange,
  label,
  icon,
  errorMessage,
  className,
  ...rest
}: IFormField<T>): ReactElement => {
    return (
        <div className="form-field">
            {icon && <img className='input-svg' src={icon} alt="Search" width={30} height={30} />}
            {!errorMessage && <label htmlFor={name} className='label'>{label}</label>}
            <input
                { ...rest }
                { ...register(name, { required: required, onChange: handleChange }) }
                type={type}
                id={name}
                className={cn('form-input', className)}
                placeholder={placeholder}
                aria-invalid={ariaInvalid}
                required={required}
                autoComplete='true'
            />
            {errorMessage && <small className='label label__error'>{errorMessage}</small>}
        </div>
    )
};

export default FormField