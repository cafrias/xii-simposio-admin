import * as React from 'react'

import * as SubsEnt from '../../entities/Subscripcion'

import ListSubs from '../../components/Subscripcion/List/List'
import Layout from '../../components/Layout/Layout'

interface IState {
  results: SubsEnt.ISubscripcion[],
  modalOpen: boolean,
  modalData: SubsEnt.ISubscripcion | undefined,
}

class List extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      results: [
        SubsEnt.FixSubscripcion,
        Object.assign({}, SubsEnt.FixSubscripcion, { documento: 123456789 }),
      ],
      modalOpen: false,
      modalData: undefined,
    }

    this.openModal = this.openModal.bind(this)
  }

  public render() {
    return (
      <section className="container list-container">
        <ListSubs results={this.state.results} rowClickHandler={this.openModal} />
        {

        }
      </section>
    )
  }

  private openModal(e: React.MouseEvent<HTMLTableRowElement>) {
    this.setState(Object.assign({}, this.state, {
      modalOpen: true,
      modalData: SubsEnt.FixSubscripcion,
    }))
  }
}

export default (props: {}) => <Layout render={<List {...props} />} />
