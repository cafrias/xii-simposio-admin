import * as React from 'react'
import './List.css'

import * as SubsEnt from '../../entities/Subscripcion'
import * as SubsServHOC from '../../components/Subscripcion/withSubscripcion'

import withSnackbar from '../../components/Snackbar/withSnackbar'
import * as Snack from '../../components/Snackbar/Snackbar'

import ListSubs from '../../components/Subscripcion/List/List'

import SubsModal from './components/SubsModal'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Sync from '@material-ui/icons/Sync'
import { CircularProgress } from 'material-ui/Progress'

type ListType = 'all' | 'confirmed' | 'pending'

interface IProps {
  type: ListType
}

type PropsWithServ = IProps & SubsServHOC.IWithService

export type Props = PropsWithServ & Snack.IWithSnack

interface IState {
  results: SubsEnt.ISubscripcion[],
  loading: boolean,
  modalOpen: boolean,
  modalData: SubsEnt.ISubscripcion,
}

class List extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      results: [],
      modalOpen: false,
      modalData: SubsEnt.EmptySubscripcion,
      loading: true,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
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
        <div className="list__controls">
          <Button variant="raised" color="primary" onClick={this.handleRefresh}>
            Actualizar
            <Sync />
          </Button>
        </div>
        {
          this.state.loading
            ? <CircularProgress />
            : <ListSubs results={results} rowClickHandler={this.openModal} />
        }
        <SubsModal
          subscripcion={modalData}
          open={modalOpen}
          onClose={this.closeModal}
          actions={{
            confirm: this.handleConfirm,
            delete: this.handleDelete
          }}
        />
      </section>
    )
  }

  public componentDidMount() {
    this.refresh()
  }

  private handleRefresh() {
    this.setState({
      ...this.state,
      loading: true,
    })

    this.refresh()
  }

  private async refresh() {
    const [results, err] = await this.props.subsServ.listar(this.props.type)
    if (err) {
      this.props.commitMessage(err.message)
      this.setState({
        ...this.state,
        loading: false,
      })
      return
    }

    if (results.length === 0) {
      this.props.commitMessage('No hay subscripciones!')
    }

    this.setState({
      ...this.state,
      loading: false,
      results,
    })
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

  private openModal(doc: number) {
    return (e: React.MouseEvent<HTMLTableRowElement>) => {
      const idx = this.findSubsIdx(doc)
      if (idx === -1) {
        this.props.commitMessage('Error inesperado, actualice e intente nuevamente.')
        return
      }

      this.setState(Object.assign({}, this.state, {
        modalOpen: true,
        modalData: this.state.results[idx],
      }))
    }
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

    const idx = this.findSubsIdx(nSubs.documento)
    if (idx === -1) {
      this.props.commitMessage('Error inesperado, actualice e intente nuevamente.')
      return
    }

    this.setState({
      ...this.state,
      modalData: nSubs,
      results: [
        ...this.state.results.slice(0, idx),
        nSubs,
        ...this.state.results.slice(idx + 1),
      ],
    })

    this.props.commitMessage('Subscripción modificada con éxito')
  }

  private async handleDelete(doc: number): Promise<void> {
    const err = await this.props.subsServ.delete(doc)
    if (err) {
      this.props.commitMessage(err.message)
      return
    }

    const idx = this.findSubsIdx(doc)
    if (idx === -1) {
      this.props.commitMessage('Error inesperado, actualice e intente nuevamente.')
      return
    }

    this.setState({
      ...this.state,
      modalData: SubsEnt.EmptySubscripcion,
      modalOpen: false,
      results: [
        ...this.state.results.slice(0, idx),
        ...this.state.results.slice(idx + 1),
      ],
    })

    this.props.commitMessage('Subscripción eliminada con éxito')
  }

  private findSubsIdx(doc: number): number {
    let idx = -1
    this.state.results.forEach((res, i) => {
      if (res.documento === doc) {
        idx = i
        return
      }
    })

    return idx
  }
}

export default withSnackbar(List)
