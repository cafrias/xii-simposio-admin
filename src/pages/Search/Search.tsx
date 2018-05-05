import * as React from 'react'
import './Search.css'

import * as Subscripcion from '../../entities/Subscripcion'
import withSubscripcion, * as SubsHOC from '../../components/Subscripcion/withSubscripcion'

import * as Snack from '../../components/Snackbar/Snackbar'
import withSnackbar from '../../components/Snackbar/withSnackbar'

import Layout from '../../components/Layout/Layout'

import Form from './components/Form'
import Result from './components/Result'

type PropsWithServ = SubsHOC.IWithService

type Props = PropsWithServ & Snack.IWithSnack

interface IState {
  result: Subscripcion.ISubscripcion | undefined,
  query: string,
  error: boolean,
  loading: boolean,
}

class Search extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      result: undefined,
      query: '',
      error: false,
      loading: false,
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  public render() {
    const {
      query,
      error,
      loading,
      result
    } = this.state

    return (
      <section className="container search-container">
        <Form
          query={query}
          error={error}
          loading={loading}
          onChange={this.handleInput}
          onSubmit={this.handleSubmit}
        />
        {
          result
            ? <Result result={result} actions={{
              confirm: this.handleConfirm,
              delete: this.handleDelete
            }} />
            : null
        }
      </section>
    )
  }

  private handleInput(e: React.SyntheticEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value
    this.setState({
      ...this.state,
      query: newValue,
    })
  }

  private async handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    this.setState({
      ...this.state,
      loading: true,
    })

    const [subs, err] = await this.props.subsServ.get(Number.parseInt(this.state.query, 10))
    if (err) {
      const msg = err.message ? err.message : err.toString()
      this.props.commitMessage(msg)

      this.setState({
        ...this.state,
        loading: false,
      })
      return
    }

    this.setState({
      ...this.state,
      loading: false,
      result: subs,
    })
  }

  private async handleConfirm(s: Subscripcion.ISubscripcion, conf: boolean): Promise<void> {
    const [nSubs, err] = await this.props.subsServ.confirmar(s, conf)

    if (err) {
      this.props.commitMessage(err.message)
      return
    }

    this.setState({
      ...this.state,
      result: nSubs,
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
      result: undefined,
    })

    this.props.commitMessage('Subscripción eliminada con éxito')
  }
}


export default withSubscripcion<PropsWithServ>(
  withSnackbar(
    (props: Props) => <Layout render={<Search {...props} />} />
  )
)
