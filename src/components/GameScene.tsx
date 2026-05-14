import React from 'react'
import { Link } from 'react-router-dom'

export default function GameScene() {
  return (
    <main className="game-scene" aria-label="Game scene">
      <aside className="game-icon-rail" aria-label="Quick icons">
        <Link className="icon-btn game-scene-home" to="/" aria-label="Bumalik sa main menu">
          <img src="/background/Icon/home.png" alt="" aria-hidden="true" />
        </Link>
        <button className="icon-btn" type="button" aria-label="Settings">
          <img src="/background/Icon/setting.png" alt="" aria-hidden="true" />
        </button>
        <button className="icon-btn" type="button" aria-label="Audio">
          <img src="/background/Icon/audio.png" alt="" aria-hidden="true" />
        </button>
        <button className="icon-btn" type="button" aria-label="Menu">
          <img src="/background/Icon/menu.png" alt="" aria-hidden="true" />
        </button>
        <button className="icon-btn" type="button" aria-label="Impormasyon">
          <img src="/background/Icon/info.png" alt="" aria-hidden="true" />
        </button>
      </aside>

      <section className="game-dialog" aria-label="Dialogue">
        <img className="game-dialog-image" src="/background/iw-clean.png" alt="" aria-hidden="true" />
      </section>
    </main>
  )
}
