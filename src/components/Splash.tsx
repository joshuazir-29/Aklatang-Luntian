import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type MenuPage = 'home' | 'start' | 'poems' | 'settings'
type IntroStep = 'none' | 'intro' | 'intro-next'

const mainActions = [
  { action: 'start', label: 'Simulan ang Laro' },
  { action: 'poems', label: 'Koleksyon ng Tula' },
  { action: 'settings', label: 'Mga Setting' }
]

const creditsLeft = [
  'Juliana Acosta',
  'Precious Antonio',
  'Zelina Cruz',
  'Jhuliana De Guzman',
  'Charity Espina'
]

const creditsRight = [
  'Aldred Gallon',
  'Jerald Magpoot',
  'Jhon Wayer Ribo',
  'Michael Joseph Salazar',
  'Kiara Santilices',
  'Mizchel Villena'
]

const quickIcons = [
  { action: 'settings', label: 'Settings', icon: '/background/Icon/setting.png' },
  { action: 'audio', label: 'Audio', icon: '/background/Icon/audio.png' },
  { action: 'menu', label: 'Menu list', icon: '/background/Icon/menu.png' },
  { action: 'info', label: 'Info', icon: '/background/Icon/info.png' },
  { action: 'home', label: 'Home', icon: '/background/Icon/home.png' }
]

const pageMeta: Record<Exclude<MenuPage, 'home'>, { title: string; description: string }> = {
  start: {
    title: 'Simulan ang Laro',
    description:
      'Handa na ang pahina para sa game scene. Maaari mo nang ilagay dito ang unang level o intro ng laro.'
  },
  poems: {
    title: 'Koleksyon ng Tula',
    description:
      'Ito ang placeholder ng koleksyon ng tula. Maaari mong ilagay dito ang listahan ng mga tula at detalye ng bawat isa.'
  },
  settings: {
    title: 'Mga Setting',
    description:
      'Ito ang placeholder ng settings page. Maaari mong idagdag dito ang audio, controls, at iba pang game preferences.'
  }
}

const actionLabels: Record<string, string> = {
  start: 'Simulan ang Laro',
  poems: 'Koleksyon ng Tula',
  settings: 'Mga Setting',
  audio: 'Audio',
  menu: 'Menu',
  info: 'Impormasyon',
  home: 'Home',
  'next-level-continue': 'Susunod'
}

export default function Splash() {
  const navigate = useNavigate()
  const [page, setPage] = useState<MenuPage>('home')
  const [introStep, setIntroStep] = useState<IntroStep>('none')
  const [menuOpen, setMenuOpen] = useState(false)
  const titleImageRef = useRef<HTMLImageElement | null>(null)

  const menuClassName = useMemo(() => {
    if (introStep === 'intro') {
      return 'menu-screen show-intro'
    }
    if (introStep === 'intro-next') {
      return 'menu-screen show-intro-next'
    }
    return 'menu-screen'
  }, [introStep])

  useEffect(() => {
    if (page !== 'home') {
      return
    }

    const titleImage = titleImageRef.current
    if (!titleImage || titleImage.dataset.processed === 'true') {
      return
    }

    const processImage = () => {
      if (titleImage.dataset.processed === 'true') {
        return
      }

      const canvas = document.createElement('canvas')
      canvas.width = titleImage.naturalWidth
      canvas.height = titleImage.naturalHeight

      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) {
        return
      }

      context.drawImage(titleImage, 0, 0)

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i]
        const g = pixels[i + 1]
        const b = pixels[i + 2]

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const brightness = (r + g + b) / 3
        const nearWhite = r > 200 && g > 200 && b > 200
        const lowSaturation = max - min < 20
        const isLightMatte = nearWhite || (brightness > 210 && lowSaturation)

        if (isLightMatte) {
          pixels[i + 3] = 0
        }
      }

      context.putImageData(imageData, 0, 0)
      titleImage.src = canvas.toDataURL('image/png')
      titleImage.dataset.processed = 'true'
    }

    if (titleImage.complete) {
      processImage()
      return
    }

    titleImage.addEventListener('load', processImage, { once: true })
    return () => titleImage.removeEventListener('load', processImage)
  }, [page])

  const resetToMenu = () => {
    setPage('home')
    setIntroStep('none')
    setMenuOpen(false)
  }

  const closeMenuOverlay = () => {
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenuOverlay()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const handleAction = (action: string) => {
    if (action === 'start') {
      navigate('/game')
      return
    }

    if (action === 'poems' || action === 'settings') {
      setPage(action)
      setMenuOpen(false)
      return
    }

    if (action === 'home') {
      resetToMenu()
      return
    }

    if (action === 'info') {
      setPage('home')
      setIntroStep('intro')
      setMenuOpen(false)
      return
    }

    if (action === 'next-level') {
      setIntroStep('intro-next')
      setMenuOpen(false)
      return
    }

    if (action === 'menu') {
      setMenuOpen(true)
      return
    }

    const label = actionLabels[action] || action
    alert(`${label} clicked`)
  }

  if (page !== 'home') {
    const meta = pageMeta[page]
    return (
      <main className="route-page" aria-label={meta.title}>
        <section className="route-card">
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
          <button className="route-back" onClick={resetToMenu} aria-label="Bumalik sa main menu">
            Bumalik sa Main Menu
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className={menuClassName}>
      <div className="bg-blur"></div>
      <img className="vines-overlay" src="/background/vines.png" alt="Vines overlay" />

      <section className="menu-content">
        <img
          ref={titleImageRef}
          className="title-image"
          src="/background/First.png"
          alt="Aklatang Luntian: Ang Hardin ng mga Taludtod"
        />

        <nav className="primary-actions" aria-label="Main menu actions">
          {mainActions.map((action) => (
            <button
              key={action.action}
              className="menu-btn"
              onClick={() => handleAction(action.action)}
              type="button"
            >
              {action.label}
            </button>
          ))}
        </nav>
      </section>

      <section className="intro-panel" aria-label="Punong Tagapaglikha" hidden={introStep !== 'intro'}>
        <img className="intro-title-image" src="/background/Puno.png" alt="Punong Tagapaglikha" />

        <p>
          Mula sa isang pamantasan na humuhubog sa kakayahan ng mga mag-aaral upang maging
          mahuhusay na guro sa hinaharap, kami ang Pangkat 1 - mga mag-aaral na
          nagpapakadalubhasa sa wika at panitikan at tagapagtaguyod ng wikang Filipino.
        </p>

        <p>
          Layunin naming makabuo ng isang larong hindi lamang nagbibigay saya at aliw, kundi
          naghahatid din ng makabuluhan at malalim na pagkatuto hinggil sa Panitikang Pilipino. Sa
          patuloy na pag-unlad ng teknolohiya, kinikilala namin ang mahalagang papel nito sa
          pagpapabuti at pagpapaunlad ng pagtuturo at pagkatuto.
        </p>

        <p>
          Sa pamamagitan ng larong ito, hangad naming gawing mas interaktibo at makabuluhan ang
          karanasan sa pagkatuto.
        </p>

        <button
          className="next-btn"
          data-action="next-level"
          type="button"
          aria-label="Susunod"
          onClick={() => handleAction('next-level')}
        >
          Susunod <span aria-hidden="true">&rarr;</span>
        </button>
      </section>

      <section
        className="intro-panel intro-panel-next"
        aria-label="Punong Tagapaglikha Ikalawang Pahina"
        hidden={introStep !== 'intro-next'}
      >
        <img className="intro-title-image" src="/background/Puno.png" alt="Punong Tagapaglikha" />

        <p className="credits-lead">
          Nawa&apos;y maging kasiya-siya ang inyong paglalaro at higit pang mapalalim ang inyong pag-unawa
          sa Panitikang Pilipino, lalo na sa larangan ng tula.
        </p>

        <h3 className="credits-heading">Mga Bumuo ng Laro:</h3>

        <div className="credits-columns" aria-label="Listahan ng mga bumuo ng laro">
          <ul>
            {creditsLeft.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <ul>
            {creditsRight.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>

        <p className="credits-adviser">
          Punong Tagpayo:<br />
          Prof. Gerry Areta
        </p>
      </section>

      <aside className="icon-rail" aria-label="Quick menu icons">
        {quickIcons.map((icon) => (
          <button
            key={icon.action}
            className="icon-btn"
            onClick={() => handleAction(icon.action)}
            aria-label={icon.label}
            type="button"
          >
            <img src={icon.icon} alt={icon.label} />
          </button>
        ))}
      </aside>

      {menuOpen && (
        <div
          className="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu list"
          onClick={closeMenuOverlay}
        >
          <div className="menu-overlay-card" onClick={(event) => event.stopPropagation()}>
            <img className="menu-overlay-image" src="/background/into.png" alt="Menu list" />
            <button
              className="menu-overlay-close"
              type="button"
              aria-label="Isara"
              onClick={closeMenuOverlay}
            >
              <span aria-hidden="true">X</span>
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
