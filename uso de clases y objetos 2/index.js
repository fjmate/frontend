/**
 * Clase Usuario
 */
class Usuario {
  constructor(sNombreUsuario, sPassword, sFechaNacimiento) {
    this._sNombreUsuario = sNombreUsuario;
    this._sPassword = sPassword;
    this._dFechaNacimiento = sFechaNacimiento;
    this._dFechaCreacion = new Date().toLocaleDateString();
  }

  get sNombreUsuario() {
    return this._sNombreUsuario;
  }
  set sNombreUsuario(sNombreUsuario) {
    this._sNombreUsuario = sNombreUsuario;
  }

  get sPassword() {
    return this._sPassword;
  }
  set sPassword(sPassword) {
    this._sPassword = sPassword;
  }

  get sFechaNacimiento(){
    return this._dFechaNacimiento.toDateString();
  }

  set dFechaNacimiento(sFechaNacimiento){
    sFechaNacimiento.split('/');
    let dFechaNacimiento = new Date(sFechaNacimiento[2], sFechaNacimiento[1] - 1, sFechaNacimiento[0]);

    this._dFechaNacimiento = dFechaNacimiento;
  }

  get dFechaCreacion(){
    return this._dFechaCreacion;
  }
  
  esPasswordSeguro(){
    const S_MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
    const S_NUMEROS = "0123456789";
    let sPassword = this._sPassword;
    let iContadorMinus = 0;
    let iContadorMayus = 0;
    let iContadorNumeros = 0;
    let iContadorCarateres = 0;

    
    for(let i = 0;i<sPassword.length;i++)
    {
      if(S_MINUSCULAS.includes(sPassword[i]))
      {
        iContadorMinus++;
      }
      else if(S_MINUSCULAS.toUpperCase().includes(sPassword[i]))
      {
        iContadorMayus++;
      }
      else if(S_NUMEROS.includes(sPassword[i]))
      {
        iContadorNumeros++;
      }
      else
      {
        iContadorCarateres++;
      }
    }
  
    if(iContadorMinus >= 1 && iContadorMayus >= 2 && iContadorNumeros >= 2 && iContadorCarateres >= 2){
      return true;
    }else{
      return false;
    }
  
    }
  
}
 /**
  * Prueba de la clase Usuario.
  */
const oUsuario1 = new Usuario("Pepe", "peloDeGato!15", "10/12/1980");
console.log(`El usuario ${oUsuario1._sNombreUsuario} nació el ${oUsuario1._dFechaNacimiento} y se creó
el ${oUsuario1._dFechaCreacion}`);
console.log(`El password "${oUsuario1.sPassword}" ${(oUsuario1.esPasswordSeguro())? ``:`no `}es seguro.`)

const oUsuario2 = new Usuario("Paco", "!peloDeGato!15", "1/7/1986");
console.log(`El usuario ${oUsuario2.sNombreUsuario} nació el ${oUsuario2._dFechaNacimiento} y se creó
el ${oUsuario2._dFechaCreacion}`);
console.log(`El password "${oUsuario2.sPassword}" ${(oUsuario2.esPasswordSeguro())? ``:`no `}es seguro.`)