import React from 'react'

export interface useScrollToProps {
  elementRef: any
  when: any
  options?: any
}
const useScrollTo = ({
  elementRef, when,
  options = { behavior: 'smooth' }
}: useScrollToProps) => {
  React.useEffect(() => {
    if (when) {
      const node = elementRef.current as any
      if (node) {
        setTimeout(() => node.scrollIntoView(options), 100)
      }
    }
  }, [when, elementRef, options])
}

export default useScrollTo