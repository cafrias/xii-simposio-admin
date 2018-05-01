import * as React from 'react'
import './Layout.css'

import TopNav from '../TopNav/TopNav'

interface ILayoutProps {
  render: React.ReactElement<any>
}

const Layout = ({ render, }: ILayoutProps) => (
  <>
    <TopNav />
    <article className="page-content">
      {render}
    </article>
  </>
)

export default Layout
