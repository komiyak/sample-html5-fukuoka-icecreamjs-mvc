// モデル：アイスクリームオブジェクト
var icecream = {
    list: [
        {id: "t1", name: "バニラ"},
        {id: "t2", name: "チョコレート"},
        {id: "t3", name: "オレンジ"},
    ],
    
    // 任意のIDをもつアイスクリームを探す
    findById: function(id) {
        ret = null;
        
        $.each(this.list, function(index, value) {
            if (value.id === id) {
                ret = value;
                return false; // 中断
            }
        });
        
        return ret;
    }
};

// モデル：選択されたアイスクリームオブジェクト
var selectedIcecream = {
    list: [],
    
    // 任意のIDをもつアイスクリームを探す
    findById: function(id) {
        ret = null;
        
        $.each(this.list, function(index, value) {
            if (value.id === id) {
                ret = value;
                return false; // 中断
            }
        });
        
        return ret;
    },
    
    // アイスクリームを追加する
    push: function( ice ) {
        this.list.push( ice );
        
        // 多すぎる場合は selectedIcecream を整理する
        if (this.list.length > 2) {
            this.list.shift();
        }        
    }
    
};


// ビュー：選択済みのアイスクリームを HTML へ反映する
function renderSelectedIcecreamList() {
    var list = $("#icecream-list");

    list.empty(); // 一度空っぽへ
    
    $.each( selectedIcecream.list, function(index, value) {
        list.append( $("<p>").text( index + ': ' + value.name ) );
    });
}

// ビュー：すべてのアイスクリームを表示する
function renderIcecreamList( clickevent ) {
    var base = $("#icecream");

    $.each( icecream.list, function(index, element) {
         base.append(
             $("<li>")
                 .append( $("<input type='checkbox'>").attr("name", element.id).click( clickevent ) )
                 .append( $("<span>").text(element.name) )
         );
    });
}

// ビュー：アイスクリームの選択リスト（チェックボックス）を、最新の状態に更新する
function renderIcecreamCheckbox() {
    var list = $("#icecream");

    $("#icecream input[type='checkbox']").each( function(index, element) {  
        var obj = selectedIcecream.findById(element.name);
        
        if (obj) {
            element.checked = true;
        } else {
            element.checked = false;
        }
    });
}


// entry point
$(function() {

  
    // checkbox の click event
    var clickevent = function(event) {
        var name = event.currentTarget.name;
      
        // 検索
        var ice = icecream.findById( name );
        selectedIcecream.push( ice );
      
        // ビューの更新
        renderSelectedIcecreamList();
        renderIcecreamCheckbox();
    };
  
    renderIcecreamList( clickevent );
});
// EOF