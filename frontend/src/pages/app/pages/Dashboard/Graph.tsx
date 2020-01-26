import React from 'react'
import { Group } from '@vx/group'
import { GradientDarkgreenGreen } from '@vx/gradient'
import { LinePath } from '@vx/shape'
import { curveMonotoneX } from '@vx/curve'
import { scaleTime, scaleLinear } from '@vx/scale'
import { extent, max } from 'd3-array'

interface GraphProps {
  loading?: Boolean

  data: Item[]
  x: any
  y: any

  width?: number
  height?: number
  margin?: Margin
}
interface Item {
  date: Date
  close: number
}
interface Margin {
  top: number
  bottom: number
  left: number
  right: number
}
const Graph: React.FC<GraphProps> = ({
  loading = false,

  data,
  x, y,
  width = 750, height = 400,
  margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80,
  }
}) => {
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const xScale = scaleTime({
    range: [0, xMax],
    // @ts-ignore
    domain: extent(data, x)
  })

  const yScale = scaleLinear({
    range: [yMax, 0],
    // @ts-ignore
    domain: [0, max(data, y)],
  })

  if(loading) return <>Loading...</>

  return (
    <svg width={width} height={height}>
      <GradientDarkgreenGreen id='gradient' />
      <rect x={0} y={0} width={width} height={height} fill="url('#gradient')" rx={14} />
      <Group top={margin.top} left={margin.left}>
        <LinePath
          data={data}
          x={(d: any) => xScale(x(d))}
          y={(d: any) => yScale(y(d))}
          stroke={`#fff`}
          strokeWidth={1}
          curve={curveMonotoneX}
        />
      </Group>
    </svg>
  )
}

export default Graph