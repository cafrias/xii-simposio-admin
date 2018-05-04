import * as React from 'react'
import './Search.css'

import * as Subscripcion from '../../entities/Subscripcion'
import withSubscripcion, * as SubsHOC from '../../components/Subscripcion/withSubscripcion'

import Layout from '../../components/Layout/Layout'

import Form from './components/Form'
import Result from './components/Result'

type Props = {} & SubsHOC.IWithService

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
      result: Subscripcion.FixSubscripcion,
      query: '',
      error: false,
      loading: false,
    }

    this.handleInput = this.handleInput.bind(this)
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

  private handleSubmit() {
    const newState = Object.assign({}, this.state, {
      loading: true,
    })
    this.setState(newState)
  }
}

export default withSubscripcion<Props>(
  (props: Props) => <Layout render={<Search {...props} />} />
)
