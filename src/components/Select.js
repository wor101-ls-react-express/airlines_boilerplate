import React from 'react'

const Select = ({options, valueKey, titleKey, onSelect, allTitle}) => {

  return (
    <select onChange={onSelect}>
      <option key="all" value='all'>{allTitle}</option>
      {options.map(option => {
        return (
          <option key={option[valueKey]} value={option[valueKey]} disabled={option.disabled}>{option[titleKey]}</option>
        )
      })}
    </select>
  )
}

export default Select

