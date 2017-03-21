var _string = '?characteristics%5B%5D=14360270&characteristics%5B%5D=14360271&characteristics%5B%5D=14655381&tets[asd]=wqe&tets[asd]=q1wqe'
function getToObject(string) {
  if (string == "") {
    return {};
  }
  var _data = {};
  var decodeString = decodeURI(string);
  var search = decodeString.replace( '?', '' ).split( '&' );
  var VRegExp = new RegExp(/(([A-Za-z0-9])+)+/g);
  $.each( search, function( index, part ){
    if( part !== '' ){
      part = part.split( '=' );
      if (part[0].indexOf('[]') > -1) {
        var VResult = part[0].match(VRegExp); 
        var _key = VResult[0];
        if (!_data[ _key ]) {
          _data[ _key ] = [];
        }
        _data[ _key ].push(part[ 1 ]);
      }else{
        if (part[0].indexOf('[') > -1) {
          var _key = part[0];
          var VResult = part[0].match(VRegExp); 
          if (!_data[ VResult[0] ]) {
            _data[ VResult[0] ] = [];
          }
          if (!_data[ VResult[0] ][VResult[1]]) {
            _data[ VResult[0] ][VResult[1]] = [];
          }
          _data[ VResult[0] ][VResult[1]].push(part[ 1 ]);
        }else{
          _data[ part[ 0 ] ] = part[ 1 ];
        }
      }
      
    }
  });
  return _data;
}
getToObject(_string )
