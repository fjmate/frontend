window.onload = function () {
  /**
   * 1. Obtén todos los elementos li como una HTMLCollection dinámica en la
   * constante "oElementosLi". [0,5 puntos]
   */

  const oElementosLi = document.getElementsByTagName("li");

  /**
   * 2. Obtén una NodeList estática con todas las flechas (elementos span que
   * contienen la clase "flechaArriba" y "flechaAbajo") en la constante
   * "oFlechas". [0,75 puntos]
   */

  const oFlechas = document.querySelectorAll(
    "span.flechaArriba, span.flechaAbajo"
  );

  /**
   * 3. Añade un manejador del evento click a cada flecha usando la NodeList
   * "oFlechas", un bucle "forEach" y la notación flecha. Al hacer click en
   * una flecha se debe llamar a la función "actualizarLista". [1,75 puntos]
   */

  oFlechas.forEach((oFlecha) => {
    oFlecha.addEventListener("click", actualizarLista);
  });

  /**
   * 4. Implementa la función "actualizarLista" para que:
   *
   *  -Intercambie el elemento li sobre el que se ha hecho click con su hermano
   *  anterior o posterior dependiendo si se ha pulsado la flecha arriba o
   *  abajo. Pulsar la flecha arriba en el primer elemento o la flecha abajo en
   *  el último no realizará ninguna operación. Utiliza la función
   *  "insertAdjacentElement" y las referencias "parentNode", previousElementSibling"
   *  y "nextElementSibling". [4 puntos]
   *
   *  -Elimine la clase "flechaDeshabilitada" de los elementos que la contengan
   *  y la añada a la flecha arriba del primer elemento y a la flecha abajo del
   *  último elemento. [3 puntos]
   */
  
  function actualizarLista(event) {
    const oFlecha = event.target;
    const oFlechaActual = oFlecha.parentNode;
    const oFlechaAnterior = oFlechaActual.previousElementSibling;
    const oFlechaSiguiente = oFlechaActual.nextElementSibling;

    if (oFlecha.className == "flechaArriba") {
      oFlechaAnterior.insertAdjacentElement("beforebegin", oFlechaActual);
    } else if (oFlecha.className == "flechaAbajo") {
      oFlechaSiguiente.insertAdjacentElement("afterend", oFlechaActual);
    }

    oFlechas.forEach((oFlecha) => {
      if (oFlecha.classList.contains("flechaDeshabilitada")) {
        oFlecha.classList.remove("flechaDeshabilitada");
      }
    });

    //Obtenemos una nueva nodelist para incluir la clase fechaDeshabilitada al primer y ultimo elemento
    const oFlechasNueva = document.querySelectorAll(
      "span.flechaArriba, span.flechaAbajo"
    );
    oFlechasNueva[0].classList.add("flechaDeshabilitada");
    oFlechasNueva[oFlechasNueva.length - 1].classList.add("flechaDeshabilitada");
  }
};
