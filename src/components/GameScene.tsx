import React from 'react'
import { Link } from 'react-router-dom'

export default function GameScene() {
  return (
    <main className="game-scene" aria-label="Game scene">
      <Link className="game-scene-home" to="/">
        Bumalik
      </Link>

      <section className="game-dialog" aria-label="Dialogue">
        <img className="game-dialog-image" src="/background/iw.png" alt="Dialogue box" />
        <p className="game-dialog-text">
          May takdang-aralin si Liwayway, gumawa ng tula tungkol sa kanyang sarili.
        </p>
      </section>
    </main>
  )
}
