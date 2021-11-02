import styled from 'styled-components'

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;
`

export const LoadingViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const SuccessViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
`
export const TableHeading = styled.h1`
  font-size: 32px;
  font-weight: 700;
  font-family: 'Roboto';
  margin-bottom: 30px;
`
export const Table = styled.table`
  border: solid thin;
  border-collapse: collapse;
  width: 80%;
  margin-bottom: 50px;
  margin-top: 30px;
`
export const ColumnTitles = styled.thead`
  width: 100%;
`
export const Row = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;
`
export const TitleHeading = styled.th`
  padding: 8px;
  text-align: left;
  width: 90px;
`
export const TableBody = styled.tbody``

export const AddNewRowButton = styled.button`
  height: 30px;
  background-color: #465e99;
  padding: 8px 16px 8px 16px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
`
export const DataEntryInstructions = styled.ul`
  list-style-type: circle;
  margin-bottom: 50px;
`
export const Instruction = styled.li``

export const ReadInstructions = styled.p`
  margin-bottom: 20px;
`
