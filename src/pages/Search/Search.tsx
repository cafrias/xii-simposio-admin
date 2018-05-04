import * as React from 'react'
import './Search.css'

import * as Subscripcion from '../../entities/Subscripcion'
import withSubscripcion, * as SubsHOC from '../../components/Subscripcion/withSubscripcion'

import withSnackBar, * as SnackT from '../../components/Snackbar/withSnackbar'
import Layout from '../../components/Layout/Layout'

import Form from './components/Form'
import Result from './components/Result'

type PropsWithServ = SubsHOC.IWithService

type Props = PropsWithServ & SnackT.IWithSnack

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
          result ? (
            <Result result={result} subsServ={this.props.subsServ} />
          ) : null
        }
      </section>
    )
  }

  private handleInput(e: React.SyntheticEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value
    const newState = Object.assign({}, this.state, {
      query: newValue,
    })
    this.setState(newState)
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
}

export default withSubscripcion<PropsWithServ>(
  withSnackBar(
    (props: Props) => <Layout render={<Search {...props} />} />
  )
)
