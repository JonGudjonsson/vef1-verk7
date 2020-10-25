/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  //alert('Halló!')
  console.log(encode('A', 3));
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();
/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  return codeSolver(str, LETTERS, shift(n));
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  return codeSolver(str, shift(n), LETTERS);
}

function shift(n){
  // Tekur módulus til að virki líka á n > 31.
  let shift = n%32;
  return LETTERS.substring(shift) + LETTERS.substring(0, shift);
}

function codeSolver(str, keyOne, keyTwo){
  let solvedStr = "";
  str = str.toLocaleUpperCase();
  for(let i = 0; i < str.length; i++){
    for(let n = 0; n < keyOne.length; n++){
      if(str.charAt(i) === keyOne.charAt(n)){
        solvedStr += keyTwo.charAt(n);
      }
    }
  }
  return solvedStr;
 /*

  while(str.length){
    let keyOneTemp = keyOne;
    while(keyOneTemp.length){
      if(str.charAt(0) == keyOneTemp.charAt(0)){
        solvedStr += keyTwo.charAt(0);
      }
      keyOneTemp = keyOneTemp.substring(1);
    }
    str = str.substring(1);
  }
  return solvedStr;
  */
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
