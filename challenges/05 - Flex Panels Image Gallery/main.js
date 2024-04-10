const loading = document.querySelector('.loading')
const panelContainer = document.querySelector('.panels')
panelContainer.style.opacity = '0'

window.addEventListener('load', () => {
  const panels = Array.from(panelContainer.children)
  loading.style.display = 'none'
  panelContainer.style.opacity = '1'

  panels.forEach((panel) => {
    panel.addEventListener('click', () => {
      const activePanel = document.querySelector('.active-panel')
      panel.classList.add('active-panel')

      if (activePanel || activePanel == panel) {
        activePanel.classList.remove('active-panel')
      }
    })
  })
})
