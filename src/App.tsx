import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Splash from './components/Splash'
import GameScene from './components/GameScene'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/game" element={<GameScene />} />
    </Routes>
  )
}
