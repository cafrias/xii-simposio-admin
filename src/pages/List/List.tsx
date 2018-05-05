import * as React from 'react'

import * as SubsEnt from '../../entities/Subscripcion'
import * as SubsServHOC from '../../components/Subscripcion/withSubscripcion'

import withSnackbar from '../../components/Snackbar/withSnackbar'
import * as Snack from '../../components/Snackbar/Snackbar'

import ListSubs from '../../components/Subscripcion/List/List'

import SubsModal from './components/SubsModal'

import Typography from 'material-ui/Typography'

type ListType = 'all' | 'confirmed' | 'pending'

interface IProps {
  type: ListType
}

type PropsWithServ = IProps & SubsServHOC.IWithService

export type Props = PropsWithServ & Snack.IWithSnack

interface IState {
  results: SubsEnt.ISubscripcion[],
  modalOpen: boolean,
  modalData: SubsEnt.ISubscripcion,
}

class List extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      results: [
        SubsEnt.FixSubscripcion,
        Object.assign({}, SubsEnt.FixSubscripcion, { documento: 123456789 }),
      ],
      modalOpen: false,
      modalData: SubsEnt.EmptySubscripcion,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  public render() {
    const {
      results,
      modalData,
      modalOpen,
    } = this.state
    return (
      <section className="container list-container">
        <Typography variant="display1" color="primary">Listado de Subscripciones</Typography>
        <Typography variant="headline" color="textSecondary" gutterBottom={true}>
          {this.getSubtitle(this.props.type)}
        </Typography>
        <ListSubs results={results} rowClickHandler={this.openModal} />
        {
          <SubsModal
            subscripcion={modalData}
            open={modalOpen}
            onClose={this.closeModal}
            actions={{
              confirm: this.handleConfirm,
              delete: this.handleDelete
            }}
          />
        }
      </section>
    )
  }

  private getSubtitle(type: ListType): string {
    switch (type) {
      case 'all':
        return 'Todas'
      case 'pending':
        return 'Pendientes'
      case 'confirmed':
        return 'Confirmadas'
    }
  }

  private openModal(e: React.MouseEvent<HTMLTableRowElement>) {
    this.setState(Object.assign({}, this.state, {
      modalOpen: true,
      modalData: SubsEnt.FixSubscripcion,
    }))
  }

  private closeModal() {
    this.setState(Object.assign({}, this.state, {
      modalOpen: false,
    }))
  }

  private async handleConfirm(s: SubsEnt.ISubscripcion, conf: boolean): Promise<void> {
    const [nSubs, err] = await this.props.subsServ.confirmar(s, conf)
    if (err) {
      this.props.commitMessage(err.message)
      return
    }

    this.setState({
      ...this.state,
      modalData: nSubs,
    })

    this.props.commitMessage('Subscripción modificada con éxito')
  }

  private async handleDelete(doc: number): Promise<void> {
    const err = await this.props.subsServ.delete(doc)
    if (err) {
      this.props.commitMessage(err.message)
      return
    }

    this.setState({
      ...this.state,
      modalData: SubsEnt.EmptySubscripcion,
      modalOpen: false,
    })

    this.props.commitMessage('Subscripción eliminada con éxito')
  }
}

export default withSnackbar(List)
