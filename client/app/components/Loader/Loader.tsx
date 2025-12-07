import React from 'react'
import "./Loader.css"

type Props = {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loader = ({ size = 'medium', color = '#3b82f6' }: Props) => {
  return (
    <div className="loader-container">
      <div className={`dual-ring-loader ${size}`} style={{ '--loader-color': color } as React.CSSProperties}></div>
    </div>
  )
}

export default Loader