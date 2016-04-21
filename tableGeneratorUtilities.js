function arrayCounter(array){
  var arrayData = {}
  arrayData.rows = array.length
  arrayData.cols = array.slice().sort()[array.length-1].length
  return arrayData
}

function formatString(str){
  return str.trim().replace(/[ |\t]+/g," ").replace(/\r/g,"")
}
// string_To_StringArray( "1 2.1; 23.5 4 5 1; 2" )
// -> [["1","2.1"],["23.5","4","5","1"],["2"]]
function string_To_StringArray(str, separator){
  var str = formatString(str)
  var separator = separator || ";"
  var strArr = str.split(separator)
  strArr.forEach(
    function(els, idx, arr){
      arr[idx] = els.trim().split(" ")
    }
  )
  return strArr
}

// stringArray_To_FloatArray ( [["1","2.1"],["23.5","4","5","1"],["2"]] )
// -> [[1,2.1],[23.5,4,5,1],[2]]
function stringArray_To_FloatArray(strArr){
  var array = strArr
  for (var i in array){
    for (var j in array[i]){
      array[i][j] = parseFloat(array[i][j])
    }
  }
  return array
}

function generateTable(a, b){
  var $table = $("<table>")

  if(typeof a === "number" && typeof b === "number"){
  // generateTable(rows, cols) function signature
    var rows = a
    var cols = b
    for (var i=0; i<rows; i++){
      $table.append("<tr>")
      var $lastRow = $table.children().last()
      for (var j=0; j<cols; j++){
        var cell = $("<td>").attr({
          row: i, col: j
        })
        $lastRow.append(cell)
      }
    }
  }else{
    throw new TypeError('False arguments for generateTable()');
  }
  
  return $table
}
