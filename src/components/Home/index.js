import {Component} from 'react'
import Loader from 'react-loader-spinner'

import ApiFailureView from '../ApiFailureView'

import OfferListItem from '../OfferListItem'

import {
  LoadingViewContainer,
  AppContainer,
  SuccessViewContainer,
  ColumnTitles,
  TitleHeading,
  Row,
  Table,
  TableHeading,
  TableBody,
  AddNewRowButton,
  DataEntryInstructions,
  Instruction,
  ReadInstructions,
} from './StyledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    offersList: [],
    apiStatus: apiStatusConstants.initial,
    lastId: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    try {
      this.setState({
        apiStatus: apiStatusConstants.inProgress,
      })
      const apiUrl = 'https://ant-stack-node.herokuapp.com/offers'

      const dataFetched = await fetch(apiUrl)
      if (dataFetched.ok) {
        const dataResolved = await dataFetched.json()
        const dataFormatted = dataResolved.offers.map(eachOffer => ({
          id: eachOffer.id,
          couponCode: eachOffer.coupon_code,
          startDate: eachOffer.start_date,
          endDate: eachOffer.end_date,
          couponType: eachOffer.coupon_type,
          maxDiscount: eachOffer.max_discount,
          minAmount: eachOffer.min_amount,
        }))

        this.setState({
          offersList: dataFormatted,
          apiStatus: apiStatusConstants.success,
          lastId: dataResolved.max_id,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (err) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <LoadingViewContainer>
      <Loader type="ThreeDots" color="#000" height="50" width="50" />
    </LoadingViewContainer>
  )

  retryApiCall = () => {
    this.getData()
  }

  renderAdminuiFailureView = () => (
    <ApiFailureView retryApiCall={this.retryApiCall} />
  )

  updateTable = data => {
    const {offersList} = this.state
    const updatedData = offersList.map(offer => {
      if (offer.id === data.id) {
        return data
      }
      return offer
    })
    this.setState({offersList: updatedData})
  }

  deleteOffer = async id => {
    const {offersList} = this.state
    const updatedList = offersList.filter(offer => offer.id !== id)
    const options = {
      method: 'DELETE',
    }
    const url = `https://ant-stack-node.herokuapp.com/offers/${id}`
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(url, options)
    if (response.status === 200) {
      this.setState({
        offersList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  insertNewRow = async () => {
    const {lastId, offersList} = this.state
    const newOffer = {
      id: lastId + 1,
      couponCode: '',
      startDate: '',
      endDate: '',
      couponType: '',
      maxDiscount: '',
      minAmount: '',
      newOffer: true,
    }
    this.setState({offersList: [...offersList, newOffer], lastId: newOffer.id})
  }

  renderAdminuiSuccessView = () => {
    const {offersList} = this.state
    return (
      <SuccessViewContainer>
        <TableHeading>Admin coupons table</TableHeading>
        <AddNewRowButton type="button" onClick={this.insertNewRow}>
          Add Row
        </AddNewRowButton>
        <ReadInstructions>
          Read Instructions below before entering or editing data
        </ReadInstructions>
        <Table>
          <ColumnTitles>
            <Row>
              <TitleHeading>Id</TitleHeading>
              <TitleHeading>coupon code</TitleHeading>
              <TitleHeading>start date</TitleHeading>
              <TitleHeading>end date</TitleHeading>
              <TitleHeading>coupon type</TitleHeading>
              <TitleHeading>max discount</TitleHeading>
              <TitleHeading>min amount</TitleHeading>
              <TitleHeading>Actions</TitleHeading>
            </Row>
          </ColumnTitles>
          <TableBody>
            {offersList.map(eachOffer => (
              <OfferListItem
                offer={eachOffer}
                key={eachOffer.id}
                deleteOffer={this.deleteOffer}
                updateTable={this.updateTable}
                newOffer={eachOffer.newOffer === true}
              />
            ))}
          </TableBody>
        </Table>
        <DataEntryInstructions>
          <Instruction>
            Data entered should match the previous format.
          </Instruction>
          <Instruction>
            PERCENT type must have it's discount percentage at the beginning.
          </Instruction>
          <Instruction>Don't leave any columns empty.</Instruction>
          <Instruction>
            once you click edit button save button appears make sure you save
            data after it's entered.
          </Instruction>
          <Instruction>
            Page won't relaoad while you save data for your convenience.
          </Instruction>
        </DataEntryInstructions>
      </SuccessViewContainer>
    )
  }

  renderAdminuiView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAdminuiSuccessView()
      case apiStatusConstants.failure:
        return this.renderAdminuiFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <AppContainer>{this.renderAdminuiView()}</AppContainer>
  }
}
export default Home
