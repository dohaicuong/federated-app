import React from 'react'
import Graph from './Graph'
import gql from 'graphql-tag'

import { useDashboardSubscription } from 'generated/graphql'
gql`
  subscription Dashboard {
    randomNumber
  }
`

export default () => {
  const [timeData, setTimeData] = React.useState<any>([])
  const { data, loading } = useDashboardSubscription()

  React.useEffect(() => {
    if (data?.randomNumber) {
      setTimeData((previous: any) => ([
        ...previous,
        { date: new Date(), close: data.randomNumber }
      ]))
    }
  }, [data])

  return (
    <Graph
      loading={loading}
      data={timeData}
      x={(d: any) => new Date(d.date)}
      y={(d: any) => d.close}
    />
  )
}