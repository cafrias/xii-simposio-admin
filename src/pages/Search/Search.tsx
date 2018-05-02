import * as React from 'react'
import './Search.css'

import * as Subscripcion from '../../entities/Subscripcion'
import SubsShow from '../../components/Subscripcion/Show/Show'

import * as SubsServ from '../../components/Subscripcion/Service'

import Layout from '../../components/Layout/Layout'
import Form from './components/Form'

type PropsWithSubs = {} & SubsServ.IService

interface IState {
  result: Subscripcion.ISubscripcion | undefined,
  query: string,
  error: boolean,
  loading: boolean,
}

class Search extends React.Component<PropsWithSubs, IState> {
  constructor(props: PropsWithSubs) {
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
      <section className="search-container">
        <Form
          query={query}
          error={error}
          loading={loading}
          onChange={this.handleInput}
          onSubmit={this.handleSubmit}
        />
        {
          result ? (
            <SubsShow
              s={result}
              confirmarSubs={this.props.subscripcion.confirmar}
              deleteSubs={this.props.subscripcion.delete}
            />
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

export default SubsServ.withSubscripcion<PropsWithSubs>(
  (props: PropsWithSubs) => <Layout render={<Search {...props} />} />
)
