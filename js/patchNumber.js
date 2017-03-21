function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}
function patchNumber (num){
  var thisNums = (isNaN(+num)) ? 1 : +num;
  return (isFloat(thisNums)) ? thisNums.toFixed(2) : thisNums;
}
