import { ChangeEvent, useState, useId, useCallback, ReactElement } from "react"
import { DeepPartial, FieldValues } from "react-hook-form"
import { IRadioField } from "../../types/component-types"
import { cn } from "../../lib/utils"

const RadioField = <T extends DeepPartial<FieldValues>>({
    name: radioName,
    defaultValue,
    options, 
    register, 
    required, 
    className, 
    ...rest 
}: IRadioField<T>): ReactElement => {
    const [ radioValue, setRadioValue ] = useState(defaultValue)

    const id = useId()

    const _handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setRadioValue(event.target.value)
    }, [])

    return (
        <div className='radio-field'>
            {options?.map(({ name, value }, index: number) => {
                const isChecked = value === radioValue
                return (
                    <div key={index}>
                        <label 
                            className={cn('radio-field__input', isChecked && 'checked', className)} 
                            htmlFor={`inline-radio-${id}-${value}`} 
                        >
                        <input
                            { ...rest }
                            { ...register(radioName, { required: required, onChange: _handleOnChange }) }
                            type="radio"
                            id={`inline-radio-${id}-${value}`}
                            key={index}
                            value={value}                                                                              
                            checked={isChecked}
                            required={required}
                            aria-label="radio-button"
                        />
                            {name}
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default RadioField