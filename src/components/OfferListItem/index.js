import {Component} from 'react'

import {AiOutlineDelete, AiFillSave} from 'react-icons/ai'
import {FcCancel} from 'react-icons/fc'
import {BiEdit} from 'react-icons/bi'
import {Row, TableValue, Button} from './StyledComponents'

class OfferListItem extends Component {
  state = {editMode: false}

  componentDidMount() {
    const {newOffer} = this.props
    if (newOffer) {
      this.setState({editMode: true})
    }
  }

  onClickPassId = () => {
    const {offer} = this.props
    console.log(offer.id)
  }

  onClickEditTable = () => {
    this.setState({editMode: true})
  }

  onClickUpdateTableValues = async () => {
    const {updateTable} = this.props
    const {offer, newOffer} = this.props
    const cell = document.getElementsByName(`${offer.id}`)

    const data = {
      id: offer.id,
      couponCode: cell[1].innerHTML,
      startDate: cell[2].innerHTML,
      endDate: cell[3].innerHTML,
      couponType: cell[4].innerHTML,
      maxDiscount: cell[5].innerHTML,
      minAmount: cell[6].innerHTML,
    }
    console.log(data)
    if (
      data.couponCode !== '' &&
      data.startDate !== '' &&
      data.endDate !== '' &&
      data.couponType !== '' &&
      data.maxDiscount !== '' &&
      data.minAmount !== ''
    ) {
      if (!newOffer) {
        const options = {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
        try {
          const response = await fetch(
            'https://ant-stack-node.herokuapp.com/offers/edit/',
            options,
          )
          if (response.status === 200) {
            updateTable(data)
          }
          this.setState({editMode: false})
        } catch (err) {
          console.log(err)
        }
      } else {
        console.log(JSON.stringify(data))
        const options = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
        try {
          const response = await fetch(
            'https://ant-stack-node.herokuapp.com/offers/new/',
            options,
          )
          if (response.status === 200) {
            updateTable(data)
          }
          this.setState({editMode: false})
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  cancelEdit = () => {
    this.setState({editMode: false})
  }

  onClickPassId = () => {
    const {deleteOffer, offer} = this.props
    deleteOffer(offer.id)
  }

  render() {
    const {offer} = this.props
    const {editMode} = this.state
    return (
      <Row contentEditable={editMode} id={offer.id}>
        <TableValue name={offer.id} contentEditable={false}>
          {offer.id}
        </TableValue>
        <TableValue name={offer.id} contentEditable={editMode}>
          {offer.couponCode}
        </TableValue>
        <TableValue name={offer.id} contentEditable={editMode}>
          {offer.startDate}
        </TableValue>
        <TableValue name={offer.id} contentEditable={editMode}>
          {offer.endDate}
        </TableValue>
        <TableValue name={offer.id} contentEditable={editMode}>
          {offer.couponType}
        </TableValue>
        <TableValue name={offer.id} contentEditable={editMode}>
          {offer.maxDiscount}
        </TableValue>
        <TableValue name={offer.id} contentEditable={editMode}>
          {offer.minAmount}
        </TableValue>
        <TableValue>
          {editMode ? (
            <>
              <Button type="button" onClick={this.onClickUpdateTableValues}>
                <AiFillSave />
              </Button>
              <Button type="button" onClick={this.cancelEdit}>
                <FcCancel />
              </Button>
            </>
          ) : (
            <>
              <Button type="button" onClick={this.onClickEditTable}>
                <BiEdit />
              </Button>
              <Button type="button" onClick={this.onClickPassId}>
                <AiOutlineDelete />
              </Button>
            </>
          )}
        </TableValue>
      </Row>
    )
  }
}
export default OfferListItem
