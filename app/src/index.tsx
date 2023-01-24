import React from 'react'
import ReactDOM from 'react-dom'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import Layout from './Layout'
import PagePoolZergs from './Pages/PagePoolZergs/PagePoolZergs'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'poolzerg',
        element: <PagePoolZergs />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

// ReactDOM.render(<div>hi</div>, document.getElementById('root'))
