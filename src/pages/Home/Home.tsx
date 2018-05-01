import * as React from 'react'
import './Home.css'

import Layout from '../../components/Layout/Layout'
import Card from './components/Card'
import items from './items'

const Home: React.SFC<{}> = ({ }) => (
  <section className="container home-container">
    {
      items.map((item, key) => <Card item={item} key={key} />)
    }
  </section>
)

export default (props: {}) => <Layout render={<Home {...props} />} />
