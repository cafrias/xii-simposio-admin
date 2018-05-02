import * as React from 'react'
import './Search.css'

import * as Subscripcion from '../../entities/Subscripcion'

import Layout from '../../components/Layout/Layout'
import Form from './components/Form'

interface IProps {
  some: any
}

interface IState {
  result: Subscripcion.ISubscripcion | undefined,
  query: string,
  error: boolean,
  loading: boolean,
}

class Search extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      result: undefined,
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

export default (props: IProps) => <Layout render={<Search {...props} />} />
