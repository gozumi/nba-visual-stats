/* tslint:disable:no-unused-variable */
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import Spinner from './spinner.componnent'

it ('should render correctly', () => {
  const tree = renderer.create(
    <Spinner />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
