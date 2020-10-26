/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  while(1){

    let action = prompt("Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða");
    if(!action){
      break;
    }else if(action !== "kóða" && action !== "afkóða"){
      alert(`Veit ekki hvaða aðgerð „${action}“ er. Reyndu aftur.`);
      continue
    }

    let n = prompt("Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]");
    if(!n){
      break;
    }else{
      n = Number.parseInt(n)
      if(!Number.isInteger(n) || (n > 31 || n < 1)){
        alert(`${n} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`)
        continue
      }
    }

    let str = prompt(`Gefðu upp strenginn sem á að ${action} með hliðrun ${n}:`);
    if(!str){
      break;
    }else if(typeof str !== 'string'){
      alert(`Þú gafst ekki upp streng. Reyndu aftur.`)
      continue;
    }else{
      str = str.toLocaleUpperCase();
      let invalid = [];
      for(let i = 0; i < str.length; i++){
        if(!LETTERS.includes(str.charAt(i))){
          invalid.push(str.charAt(i));
        }
      }
      if(invalid.length){
        alert(`Þú gafst upp stafi sem ekki er hægt að ${action}: ${invalid.join(', ')}.`)
        continue;
      }
    }

    if(action === "kóða"){
      lausn = encode(str, n);
    }else{
      lausn = decode(str, n);
    }

    alert(`${str} ${action}st sem: ${lausn}.`)

    if(confirm(`Viltu byrja upp á nýtt?`)){
      continue;
    }

    break;
  }
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

/**
 * Hliðrar streng um n stök.
 *
 * @param {number} n Hliðrun, heiltala stærri en 0
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function shift(n){
  // Tekur módulus til að virki líka á n > 31 (væri því hægt
  // að sleppa kröfu um að talan sé á bilinu [1, 31]).
  let shift = n%32;
  return LETTERS.substring(shift) + LETTERS.substring(0, shift);
}

/**
 * Afkóðar streng með því víxla stöfum útfrá tveimur dulkóðslyklum.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {string} keyOne Strengur með fyrri dulmálslykli, þarf að vera jafn langur og keyTwo
 * @param {string} keyTwo Strengur með fyrri dulmálslykli, þarf að vera jafn langur og keyOne
 * @returns {string} Upprunalegi strengurinn str dulkóðaður úr kóða keyOne í kóða keyTwo
 */
function codeSolver(str, keyOne, keyTwo){
  let solvedStr = "";
  for(let i = 0; i < str.length; i++){
    for(let n = 0; n < keyOne.length; n++){
      if(str.charAt(i) === keyOne.charAt(n)){
        solvedStr += keyTwo.charAt(n);
      }
    }
  }
  return solvedStr;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
