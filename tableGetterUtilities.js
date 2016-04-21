//this = [$table] || [$td]
//-> [$td]
$.fn.row = $.fn.getByRow = function (row){
  if ( this.is("table") ){
    return $("td[row="+row+"]", this)
  }else if ( this.is("td") ){
    return this.filter("[row="+row+"]")
  }
}
//this = [$table] || [$td]
//-> [$td]
$.fn.col = $.fn.getByCol = function (col){
  if ( this.is("table") ){
    return $("td[col="+col+"]", this)
  }else if ( this.is("td") ){
    return this.filter("[col="+col+"]")
  }
}

//this = [$td]
$.fn.log = $.fn.logValue = function (){
  this.each(function(idx,el){
    var value = $(el).html()
    console.log(value)
  })
}
//this = [$table] || [$td]
//-> [""]
$.fn.strArr = $.fn.getStrArrayValue = function (){
  var array = []

  if ( this.is("table") ){
    $("tr", this).each(function(idx,el){
      array.push( $(el).children().getStrArrayValue() )
    })
  }else if ( this.is("td") ){
    this.each(function(idx,el){
      var value = $(el).html()
      array.push(value)
    })
  }
  
  return array
}
//this = [$table] || [$td]
//-> [Float]
$.fn.arr = $.fn.getFloatArrayValue = function (){
  var array = []

  if ( this.is("table") ){
    $("tr", this).each(function(idx,el){
      array.push( $(el).children().getFloatArrayValue() )
    })
  }else if ( this.is("td") ){
    this.each(function(idx,el){
      var value = $(el).html()
      if (value !== ""){
        array.push( parseFloat(value) )
      }else if (value === ""){
        array.push(0)
      }
    })
  }

  return array
}
//[Float] || [""]
//-> "1 2.1; 23.5 4 5 1; 2"
Array.prototype.str = Array.prototype.toStr = function (){
  var tempArray = []
  $(this).each(function(idx,el){
    tempArray.push( el.join(" ") )
  })
  return tempArray.join("; ").trim().replace(/\s{2,}/g," ")
}
//$table
//-> "1 2.1; 23.5 4 5 1; 2"
$.fn.str = $.fn.toStr = function (){
  if ( this.is("table") ){
    return this.getFloatArrayValue().str()
  }
}