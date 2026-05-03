<?php
$validPages = ['home', 'start', 'poems', 'settings'];
$page = $_GET['page'] ?? 'home';

if (!in_array($page, $validPages, true)) {
  $page = 'home';
}

$mainActions = [
    ['action' => 'start', 'label' => 'Simulan ang Laro'],
    ['action' => 'poems', 'label' => 'Koleksyon ng Tula'],
    ['action' => 'settings', 'label' => 'Mga Setting'],
];

$creditsLeft = [
    'Juliana Acosta',
    'Precious Antonio',
    'Zelina Cruz',
    'Jhuliana De Guzman',
    'Charity Espina',
];

$creditsRight = [
    'Aldred Gallon',
    'Jerald Magpoot',
    'Jhon Wayer Ribo',
    'Michael Joseph Salazar',
    'Kiara Santilices',
    'Mizchel Villena',
];

$quickIcons = [
    ['action' => 'settings', 'label' => 'Settings', 'icon' => 'background/Icon/setting.png'],
    ['action' => 'audio', 'label' => 'Audio', 'icon' => 'background/Icon/audio.png'],
    ['action' => 'menu', 'label' => 'Menu list', 'icon' => 'background/Icon/menu.png'],
    ['action' => 'info', 'label' => 'Info', 'icon' => 'background/Icon/info.png'],
    ['action' => 'home', 'label' => 'Home', 'icon' => 'background/Icon/home.png'],
];

function esc(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$pageMeta = [
  'start' => [
    'title' => 'Simulan ang Laro',
    'description' => 'Handa na ang pahina para sa game scene. Maaari mo nang ilagay dito ang unang level o intro ng laro.',
  ],
  'poems' => [
    'title' => 'Koleksyon ng Tula',
    'description' => 'Ito ang placeholder ng koleksyon ng tula. Maaari mong ilagay dito ang listahan ng mga tula at detalye ng bawat isa.',
  ],
  'settings' => [
    'title' => 'Mga Setting',
    'description' => 'Ito ang placeholder ng settings page. Maaari mong idagdag dito ang audio, controls, at iba pang game preferences.',
  ],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Luntian - Main Menu</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <?php if ($page !== 'home'): ?>
    <main class="route-page" aria-label="<?= esc($pageMeta[$page]['title']) ?>">
      <section class="route-card">
        <h1><?= esc($pageMeta[$page]['title']) ?></h1>
        <p><?= esc($pageMeta[$page]['description']) ?></p>
        <a class="route-back" href="index.php?page=home" aria-label="Bumalik sa main menu">Bumalik sa Main Menu</a>
      </section>
    </main>
  <?php else: ?>
  <main class="menu-screen">
    <div class="bg-blur"></div>
    <img class="vines-overlay" src="background/vines.png" alt="Vines overlay">

    <section class="menu-content">
      <img class="title-image" src="background/First.png" alt="Aklatang Luntian: Ang Hardin ng mga Taludtod">

      <nav class="primary-actions" aria-label="Main menu actions">
        <?php foreach ($mainActions as $action): ?>
          <button class="menu-btn" data-action="<?= esc($action['action']) ?>"><?= esc($action['label']) ?></button>
        <?php endforeach; ?>
      </nav>
    </section>

    <section class="intro-panel" aria-label="Punong Tagapaglikha" hidden>
      <img class="intro-title-image" src="background/Puno.png" alt="Punong Tagapaglikha">

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

      <button class="next-btn" data-action="next-level" type="button" aria-label="Susunod">
        Susunod <span aria-hidden="true">&rarr;</span>
      </button>
    </section>

    <section class="intro-panel intro-panel-next" aria-label="Punong Tagapaglikha Ikalawang Pahina" hidden>
      <img class="intro-title-image" src="background/Puno.png" alt="Punong Tagapaglikha">

      <p class="credits-lead">
        Nawa'y maging kasiya-siya ang inyong paglalaro at higit pang mapalalim ang inyong pag-unawa
        sa Panitikang Pilipino, lalo na sa larangan ng tula.
      </p>

      <h3 class="credits-heading">Mga Bumuo ng Laro:</h3>

      <div class="credits-columns" aria-label="Listahan ng mga bumuo ng laro">
        <ul>
          <?php foreach ($creditsLeft as $name): ?>
            <li><?= esc($name) ?></li>
          <?php endforeach; ?>
        </ul>
        <ul>
          <?php foreach ($creditsRight as $name): ?>
            <li><?= esc($name) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>

      <p class="credits-adviser">
        Punong Tagpayo:<br>
        Prof. Gerry Areta
      </p>
    </section>

    <aside class="icon-rail" aria-label="Quick menu icons">
      <?php foreach ($quickIcons as $icon): ?>
        <button class="icon-btn" data-action="<?= esc($icon['action']) ?>" aria-label="<?= esc($icon['label']) ?>">
          <img src="<?= esc($icon['icon']) ?>" alt="<?= esc($icon['label']) ?>">
        </button>
      <?php endforeach; ?>
    </aside>
  </main>
  <?php endif; ?>

  <script src="main.js"></script>
</body>
</html>
