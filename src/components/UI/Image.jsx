import React from 'react'

const Image = (props) => {
  const { path, className, defaultAvatar = null} = props
  return(
    <img
      src={path ? `https://image.tmdb.org/t/p/w500${path}` : defaultAvatar}
      className={className}
      alt=""
    />
  )
}

export default Image