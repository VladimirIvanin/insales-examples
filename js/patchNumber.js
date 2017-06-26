function patchNumber (num){
  var thisNums = (isNaN(+num)) ? 1 : +num;
  function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }
  return Number( (isFloat(thisNums)) ? thisNums.toFixed(2) : thisNums );
}
