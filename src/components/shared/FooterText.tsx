import React from 'react'

type FooterTextType = {
  title: string;
}

const FooterText = ({ title }: FooterTextType) => {
  return (
    <span className='text-white text-md my-1 font-light'>{title} </span>
  )
}

export default FooterText