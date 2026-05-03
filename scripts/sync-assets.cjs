const fs = require('fs')
const path = require('path')

const srcRoot = path.resolve(__dirname, '..', 'background')
const destRoot = path.resolve(__dirname, '..', 'public', 'background')
const exts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.mp3', '.wav', '.ogg'])

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function shouldCopy(srcPath, destPath) {
  if (!fs.existsSync(destPath)) return true
  const srcStat = fs.statSync(srcPath)
  const destStat = fs.statSync(destPath)
  return srcStat.mtimeMs > destStat.mtimeMs
}

function copyRecursive(srcDir, destDir) {
  ensureDir(destDir)
  const entries = fs.readdirSync(srcDir, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath)
      continue
    }
    const ext = path.extname(entry.name).toLowerCase()
    if (!exts.has(ext)) continue
    if (shouldCopy(srcPath, destPath)) {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

if (!fs.existsSync(srcRoot)) {
  console.log('No background folder found; skipping sync.')
  process.exit(0)
}

copyRecursive(srcRoot, destRoot)
console.log('Synced background assets to public/background.')
