import React from 'react'
import ReactDOM from 'react-dom'

import AuthForm from '.'

it('renders withour crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AuthForm title='Form' form='fields' />, div)
  ReactDOM.unmountComponentAtNode(div)
})