import React from 'react'
import styled from 'styled-components'

const LabelContainer = styled.div`
  margin: 0.25em 1em;
`
const StyledInput = styled.input`
  border: 1px solid MediumSlateBlue;
  border-radius: 2px;
  margin: 0.25em 1em;
`

const Input = ({ id, value, onChange }) => {
  return (
    <div>
      <LabelContainer>{id}</LabelContainer>
      <StyledInput id={id} value={value} onChange={onChange} />
    </div>
  )
}

export default Input
