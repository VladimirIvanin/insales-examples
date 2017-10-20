/*
* 2.39 * 5
* => 11.950000000000001
* patchNumber(2.39 * 5)
* => 11.95
* patchNumber('5,0')
* => 5
* patchNumber('5,1')
* => 5.1
* patchNumber('5,11')
* => 5.11
* patchNumber('5,111')
* => 5.11
* patchNumber(undefined)
* => 0
* patchNumber([])
* => 0
* patchNumber({})
* => 0
* patchNumber(null)
* => 0
* patchNumber(`asd`)
* => 1
*/

function patchNumber (num) {
  var isString = typeof num == 'string';
  var isNumber = typeof num == 'number';
  
  if (!isNumber && !isString) {
    return 0;
  }

  if(isString){
    num = num.replace(/,/g, '.');
    num = num.replace(/px/g, '');
    num = (isNaN(+num)) ? 1 : +num;
  }

  function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }
  
  return Number( (isFloat(num)) ? num.toFixed(2) : num );
}
