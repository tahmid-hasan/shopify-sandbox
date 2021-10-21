import React from 'react'
import { NextPage } from 'next'
import ErrorPage from 'next/error'

const Error: NextPage = (props) => {
  console.log(props)
  return <ErrorPage statusCode={400}></ErrorPage>
}

Error.getInitialProps = (res) => {
  const { query } = res
  return { ...query }
}

export default Error
