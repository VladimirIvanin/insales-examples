/*
* 2.39 * 5
* => 11.950000000000001
* patchNumber(2.39 * 5)
* => 11.95
* patchNumber ('5,0')
* => 5
* patchNumber ('5,1')
* => 5.1
* patchNumber ('5,11')
* => 5.11
* patchNumber ('5,111')
* => 5.11
*/

function patchNumber (num){
  var isString = typeof num == 'string';
  if(isString){
    num = num.replace(/,/g, '.');
  }
  var thisNums = (isNaN(+num)) ? 1 : +num;
  function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }
  return Number( (isFloat(thisNums)) ? thisNums.toFixed(2) : thisNums );
}
