
/* repeatString() returns a string which has been repeated a set number of times */
function repeatString(str, num) {
  out = '';
  for (var i = 0; i < num; i++) {
    out += str;
  }
  return out;
}

/*
dump() displays the contents of a variable like var_dump() does in PHP. dump() is
better than typeof, because it can distinguish between array, null and object.
Parameters:
v: The variable
howDisplay: "none", "body", "alert" (default)
recursionLevel: Number of times the function has recursed when entering nested
objects or arrays. Each level of recursion adds extra space to the
output to indicate level. Set to 0 by default.
Return Value:
A string of the variable's contents
Limitations:
Can't pass an undefined variable to dump().
dump() can't distinguish between int and float.
dump() can't tell the original variable type of a member variable of an object.
These limitations can't be fixed because these are *features* of JS. However, dump()
*/
function dump(v, howDisplay, recursionLevel) {
  if (howDisplay !== 'none') {
    $targetDis = $(howDisplay)
  }
  recursionLevel = (typeof recursionLevel !== 'number') ? 0 : recursionLevel;
  
  
  var vType = typeof v;
  var out = '';
  
  switch (vType) {
    case "number":
    /* there is absolutely no way in JS to distinguish 2 from 2.0
    so 'number' is the best that you can do. The following doesn't work:
    var er = /^[0-9]+$/;
    if (!isNaN(v) && v % 1 === 0 && er.test(3.0))
    out = 'int';*/
    case "boolean":
    out += v;
    break;
    case "string":
    out += "'" + v + "'";
    break;
    case "object":
    //check if null
    if (v === null) {
      out = "null";
      
    }
    //If using jQuery: if ($.isArray(v))
    //If using IE: if (isArray(v))
    //this should work for all browsers according to the ECMAScript standard:
    else if (Object.prototype.toString.call(v) === '[object Array]') {
      out += '[';
      for (var i = 0; i < v.length; i++) {
        out += repeatString(' ', recursionLevel) + dump(v[i], "none", recursionLevel + 1);
        if (i < v.length - 1) {
          out += ',';
        }
      }
      out += repeatString(' ', recursionLevel) + "]";
    }
    else { //if object
      sContents = "{\n";
      cnt = 0;
      for (var member in v) {
        //No way to know the original data type of member, since JS
        //always converts it to a string and no other way to parse objects.
        sContents += repeatString(' ', recursionLevel) + " " + "'" + member +
        "': " + dump(v[member], "none", recursionLevel + 1) + ",\n";
        sContents = sContents.replace("object","");
        cnt++;
      }
      sContents = sContents.substring(0, sContents.length - 2);
      sContents += '\n';
      sContents += repeatString(' ', recursionLevel) + "}";
      sContents = sContents.replace("object","");
      out += sContents;
    }
    break;
  }
  
  
  if (howDisplay !== 'none') {
    $targetDis.html('<pre><code class="js hljs">'+out+'</code></pre>')
  }
  return out;
}

