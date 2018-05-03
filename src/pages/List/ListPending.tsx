import * as React from 'react'

import * as SubsServ from '../../components/Subscripcion/Service'

import Layout from '../../components/Layout/Layout'
import * as List from './List'

export default SubsServ.withSubscripcion<List.Props>((props: List.Props) => <Layout render={<List.default type="pending" {...props} />} />)
