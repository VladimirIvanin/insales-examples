var convertProperties = function (_product) {
  _product.parameters = {};
  _product.sale = null;

  // Имя параметра: массив характеристик
  $.each( _product.properties, function( index, property ){

    $.each( _product.characteristics, function( index, characteristic ){
      if (property.id === characteristic.property_id) {
        (_product.parameters[ property.title ] || (_product.parameters[ property.title ] = [])).push(characteristic);
      }
    });

  });

  // Скидка в процентах
  if (_product.variants) {
    $.each( _product.variants, function( index, variant ){
      if (variant.old_price) {
        var _merge = Math.round( ((parseInt(variant.old_price) - parseInt(variant.price)) / parseInt(variant.old_price) * 100), 0 )
        if (_merge < 100) {
          _product.sale = _merge;
        }
      }
    });
  }

  return _product;
}
