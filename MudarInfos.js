const NovaCapa = '/images/amanha F.png'

function mudarCapa() {
  const capa = NovaCapa

  document.getElementById('mudarCapa').src = capa
}

// Seleciona os elementos que precisam ser atualizados
const timerDataElement = document.querySelector('.countdown')
const timerHoraElement = document.getElementById('TimerHora')
const horasElement = document.querySelector('#Horas')
const minutosElement = document.querySelector('#Minutos')
const segundosElement = document.querySelector('#Segundos')

// Define a função que calcula os dias até a data
function getDaysUntilDate(data) {
  const date = new Date(data)
  const hoje = new Date()

  const diffTime = Math.abs(date - hoje)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

// Define a função que calcula a data da próxima sexta-feira às 20h
function getProximaSexta() {
  const agora = new Date()
  const proximaSexta = new Date(agora)
  proximaSexta.setDate(
    proximaSexta.getDate() + ((5 - proximaSexta.getDay() + 7) % 7)
  )
  proximaSexta.setHours(20, 0, 0, 0)

  if (proximaSexta < agora) {
    proximaSexta.setDate(proximaSexta.getDate() + 7)
  }

  return proximaSexta.toISOString()
}

// Define a função que atualiza o horário
function updateHorario(data) {
  const agora = new Date()
  const sorteio = new Date(data)
  const diffTime = sorteio.getTime() - agora.getTime()
  const diffHoras = Math.floor(diffTime / (1000 * 60 * 60))
  const diffMinutos = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
  const diffSegundos = Math.floor((diffTime % (1000 * 60)) / 1000)

  horasElement.textContent = diffHoras.toString().padStart(2, '0')
  minutosElement.textContent = diffMinutos.toString().padStart(2, '0')
  segundosElement.textContent = diffSegundos.toString().padStart(2, '0')

  if (diffHoras > 24) {
    timerDataElement.classList.remove('hidden')
    timerHoraElement.style.display = 'none'
  } else if (diffHoras === 24) {
    timerDataElement.classList.add('hidden')
    timerHoraElement.style.display = 'block'

    const horasRestantes = 24 - agora.getHours()
    const minutosRestantes = 60 - agora.getMinutes()
    const segundosRestantes = 60 - agora.getSeconds()

    horasElement.textContent = horasRestantes.toString().padStart(2, '0')
    minutosElement.textContent = minutosRestantes.toString().padStart(2, '0')
    segundosElement.textContent = segundosRestantes.toString().padStart(2, '0')
  } else if (diffHoras < 24) {
    timerDataElement.classList.add('hidden')
    timerHoraElement.style.display = 'block'

    const horasRestantes = 20 - agora.getHours() - 1
    const minutosRestantes = 60 - agora.getMinutes() + 14
    const segundosRestantes = 60 - agora.getSeconds()

    horasElement.textContent = horasRestantes.toString().padStart(2, '0')
    minutosElement.textContent = minutosRestantes.toString().padStart(2, '0')
    segundosElement.textContent = segundosRestantes.toString().padStart(2, '0')
  }

  // Atualiza os elementos com os novos valores
  updateCountdown(data)
}

// Define a função que atualiza o contador de dias
function updateCountdown(data) {
  const days = getDaysUntilDate(data)
  document.getElementById('days').textContent = (days < 10 ? '0' + days : days) - 1
}

// Chama a função que atualiza o horário a cada segundo
setInterval(() => updateHorario(getProximaSexta()), 1000)
