var convertProperties = function (_product) {
  _product.parameters = {};
  _product.sale = null;

  // Пермалинк параметра: массив характеристик
  $.each( _product.properties, function( index, property ){

    $.each( _product.characteristics, function( index, characteristic ){
      if (property.id === characteristic.property_id) {
        var _characteristic = characteristic;
        _characteristic.property_name = property.title;
        _characteristic.property = {
          backoffice: property.backoffice,
          id: property.id,
          is_hidden: property.is_hidden,
          is_navigational: property.is_navigational,
          permalink: property.permalink,
          position: property.position,
          title: property.title
        };
        (_product.parameters[ property.permalink ] || (_product.parameters[ property.permalink ] = [])).push(_characteristic);
      }
    });

  });
  
  var cashIds = {};
  $.each(_product.option_names, function (option_name, index) {
    _product.options[index].push(option_name);
    $.each(_product.variants, function (variant) {
      $.each(variant.option_values, function (option_value) {
        var uniqId = option_value.option_name_id + ':' + option_value.id;

        if (!_product.options[index]) {
          _product.options[index].values = []
        }

        if (!cashIds[uniqId]) {
          _product.options[index].values.push(option_value)
        }

        cashIds[uniqId] = true;
      });
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
