import React from 'react'

export default function LoadSidebar() {
  // this is for calling the loader when in a component that has the sidebar
  return (
    <div className="loader-sidebar">
        <div className="loader"></div>
    </div>
  )
}
