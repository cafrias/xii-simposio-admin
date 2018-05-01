import * as React from 'react'
import './Home.css'

import Layout from '../../components/Layout/Layout'
import Card from './components/Card'
import items from './items'

import { withRouter } from 'react-router'
import * as H from 'history'

import { push } from '../../lib/router'

interface IHomeProps {
  history: H.History,
}

const Home: React.SFC<IHomeProps> = ({ history, }) => (
  <section className="container home-container">
    {
      items.map((item, key) => <Card item={item} key={key} action={push(item.link, history)} />)
    }
  </section>
)

export default withRouter((props: IHomeProps) => <Layout render={<Home {...props} />} />)
