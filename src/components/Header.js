import React from 'react'

const Header = () => {
  return (
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" className="mw5 center db" alt="Rick and Morty" />
      <p data-testid="headline" className="pt3 f4 b lh-title mt0 mb4 mb5-ns word-wrap tc">Search episodes by character</p>
    </div>
  )
}

export default Header