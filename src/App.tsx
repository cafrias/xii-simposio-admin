import * as React from 'react'
import './App.css'

import CssBaseline from 'material-ui/CssBaseline'

import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Search from './pages/Search/Search'

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <main>
          <CssBaseline />
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/subscripcion/buscar" component={Search} />
        </main>
      </BrowserRouter>
    )
  }
}

export default App
