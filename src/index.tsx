import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'
import custom_api from './aws-api-exports'

Amplify.configure(Object.assign(aws_exports, custom_api))

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
