const levels = 15
let teclas = generateTeclas(levels)

nextLevel(0)

function nextLevel(nivelactual) {

  if (nivelactual == levels) {
    return swal ({
      title: 'Ganaste!',
      type: 'success'
    })

  }

  swal({
    timer: 1500,
    title: `Nivel ${nivelactual + 1}`,
    text: 'Simon Dice :',
    showConfirmButton: false
  })

  for (let i = 0; i <= nivelactual; i++) {
    
    setTimeout(function() {

      activate(teclas[i])

    }, 1000 * (i+1) + 1000);
    
  }

  let i = 0
  let teclaactual = teclas[i]

  window.addEventListener('keydown', onkeydown)

  function onkeydown (ev) {

    if (ev.keyCode == teclaactual) {

      activate(teclaactual, { success: true })
    
      i++

      if (i > nivelactual) {
        window.removeEventListener('keydown', onkeydown)
        setTimeout(function() {
          nextLevel(i)
        }, 1500);
      }

      teclaactual = teclas[i] 

    } else {

      activate(ev.keyCode, { fail: true })
      window.removeEventListener('keydown', onkeydown)
      swal ({
        title: 'Perdiste :(',
        text: '¿Quieres volver a intentarlo?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No,',
        closeOnConfirm: true
      }, function (ok) {

        if (ok) {
          teclas = generateTeclas(levels)
          nextLevel(0)
        }

      })

    }

  }

}

function generateTeclas(niveles) {
  
  return new Array(niveles).fill(0).map(generateTeclaAleatoria)

}

function generateTeclaAleatoria () {

  const min = 65
  const max = 90

  return Math.round(Math.random() * (max - min) + min)

}

function getElementByKeyCode(keycode) {
  
  return document.querySelector(`[data-key="${keycode}"]`)

}

function activate (keycode, opts = {}) {

  const element = getElementByKeyCode(keycode)

  element.classList.add('active')
  if (opts.success) {
    element.classList.add('success')
  } else if (opts.fail) {
    element.classList.add('fail')
  }

  setTimeout(function() {
    desactivate(element)
  }, 500);

}

function desactivate (element) {
  element.className = 'key'
}

