
// アイスクリームの種類
var icecream = [
    {id: "t1", name: "バニラ"},
    {id: "t2", name: "チョコレート"},
    {id: "t3", name: "オレンジ"},
];

// 選択されたアイスクリーム
var selectedIcecream = [];


function findById(obj, id) {
    var ret = null;

    if (obj) {
        $.each(obj, function(index, value) {
            if (value.id === id) {
                ret = value;
                return false; // 中断
            }
        });
    }
    
    return ret;
}


function updateViewIcecreamList() {
    var list = $("#icecream-list");

    list.empty(); // 一度空っぽへ
    
    $.each( selectedIcecream, function(index, value) {
        list.append( $("<p>").text( index + ': ' + value.name ) );
    });
}


// entry point
$(function() {

  // 最初のビューを作成する
  var base = $("#icecream");
  
  $.each( icecream, function(index, element) {
  
      // checkbox の click event
      var clickevent = function(event) {
          var name = event.currentTarget.name;
          
          // 検索
          var ice = findById( icecream, name );
          
          
          selectedIcecream.push( ice );
          
          // 多すぎる場合は selectedIcecream を整理する
          if (selectedIcecream.length > 2) {
              selectedIcecream.shift();
          }
          
          // ビューの更新
          updateViewIcecreamList()
      };
  
      // 要素作成
      base.append(
          $("<li>")
              .append( $("<input type='checkbox'>").attr("name", element.id).click( clickevent ) )
              .append( $("<span>").text(element.name) )
      );
  });

});
// EOF