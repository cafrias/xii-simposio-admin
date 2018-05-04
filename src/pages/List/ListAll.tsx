import * as React from 'react'

import withSubscripcion from '../../components/Subscripcion/withSubscripcion'

import Layout from '../../components/Layout/Layout'
import * as List from './List'

export default withSubscripcion<List.Props>((props: List.Props) => <Layout render={<List.default type="all" {...props} />} />)
