window.addEventListener('load', loadPage)

let nombre = document.getElementById('nombre')
let header = document.getElementById('header')
let puntaje = document.getElementById('puntuacion')

function loadPage () {

  swal({
  title: "Bienvenido a Simon Dice: ",
  text: "Este es un juego con el fin de entrenar tu memoria, estas listo! Ingresa tu Nombre:",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  animation: "slide-from-top",
  inputPlaceholder: "Ingresa tu Nombre"
  },
  function infoPage (inputValue){
    if (inputValue === false) return false;
    
    if (inputValue === "") {
      swal.showInputError("Debes de Ingresar tu Nombre!");
      return false
    }
    
    swal("Bien!", "Empecemos con el juego: " + inputValue, "success");

    setTimeout(function message () {

      nombre.innerHTML = `Nombre : ${inputValue}`
      addClassHeader()
      nextLevel(0)

    },1000);
  });

  window.removeEventListener('load',loadPage)

}

function addClassHeader () {
  header.classList.add('header')
  nombre.classList.add('nombre')
  puntaje.classList.add('puntuacion')
  puntaje.innerHTML = 'Puntuación : 0000 pts'
}

function removeClassHeader () {
  header.classList.remove('header')
  nombre.classList.remove('nombre')
  puntaje.classList.remove('puntuacion')
}

let puntajeActual = 0
const levels = 15
let teclas = generateTeclas(levels)

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
      puntajeActual += 5
      puntaje.innerHTML = `Puntuación : ${puntajeActual} pts `
    
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
      removeClassHeader()

      swal ({
        title: 'Perdiste :(',
        text: `Tu puntuación es " ${puntajeActual} " pts ¿Quieres volver a intentarlo?`,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No,',
        closeOnConfirm: true
      }, function (ok) {

        if (ok) {
          
          teclas = generateTeclas(levels)
          puntajeActual = 0
          addClassHeader()
          nextLevel(0)

        } else {
          
          puntajeActual = 0
          teclas = generateTeclas(levels)
          setTimeout(function (){ loadPage() },500)
          
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

