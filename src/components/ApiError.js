import React from 'react'

export default function ApiError({handleReset}) {
  return (
    <div className="start-page-container">
      <h1 style={{textAlign:'center'}}>There was a problem with the provider, please try other categories.</h1>
      <button onClick={()=> handleReset()}>Try Again</button>
    </div>
  )
}
