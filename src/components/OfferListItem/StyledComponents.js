import styled from 'styled-components'

export const Row = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  background-color: ${props =>
    props.contentEditable === true ? '#D3D3D3' : '#ffff'};
`

export const TableValue = styled.td`
  padding: 8px;
  text-align: left;
  background-color: ${props =>
    props.contentEditable === true ? '#827e7e' : '#fff'};
  width: 90px;
`
export const Button = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  background: none;
`
