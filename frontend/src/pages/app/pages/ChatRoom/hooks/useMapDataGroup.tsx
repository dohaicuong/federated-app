import React from 'react'

const useMapDataGroup = (data: any) => {
  const stringifyData = JSON.stringify(data)

  return React.useMemo(() => data?.reduce((total: any, current: any) => {
    const authorId = current.author.id
    const currentGroup = total[total.length - 1]

    if (currentGroup?.authorId !== authorId) {
      total.push({ author: current.author, messages: [current.content] })
    }
    else {
      currentGroup.messages = [
        ...currentGroup.messages,
        current.content
      ]
    }

    return total
    // eslint-disable-next-line
  }, []), [stringifyData])
}
export default useMapDataGroup