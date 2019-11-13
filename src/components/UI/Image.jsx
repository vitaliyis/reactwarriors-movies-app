import React from 'react'

// React.memo - аналог pureComponent, если придут теже пропсы то перерендеринга не будет
const Image = React.memo(props => {
  const { path, defaultAvatar = null, ...rest} = props
  return(
    <img
      src={path ? `https://image.tmdb.org/t/p/w500${path}` : defaultAvatar}
      {...rest}
    />
  )
})

export default Image