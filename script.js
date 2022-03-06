window.addEventListener("load" , function (){

    //テキストボックスに何か入力される度、検索を実行する。
    $("#search").on("input", function(){ search(this.value); });

    //検索結果からクリックされた値をテキストボックスに代入
    $(document).on("click",".search_result_content", function(){ $("#search").val(this.innerText); });

});

function search(raw_word){

    //未入力の場合は検索結果を初期化してreturn 
    if (raw_word.length === 0){
        $("#search_result").html("");
        return false;
    }

    //全角スペースを半角スペースに変換(replace)、スペース区切りで配列化(split)、空文字列は除外(filter)
    let words   = raw_word.replace(/　/g," ").split(" ").filter(w => w !== "" );
    console.log(words)


    let old_list    = SEARCH_LIST;

    //検索キーワードのリストから1つずつ取り出し、検索をする。(AND検索)
    for ( let word of words ){

        let new_list    = [];

        //old_listを1つずつ取り出し、検索された単語とヒットするかチェックする。
        for (let old of old_list){

            //文字列を小文字化、検索された文字列も小文字化させ、含む場合はnew_listに追加
            if ( old.toLowerCase().indexOf(word.toLowerCase()) !== -1 ){
                new_list.push(old);
            }

        }

        //new_listをold_listに代入する。
        old_list        = new_list;
    }


    //検索結果を表示させる
    let result  = "";
    for (let old of old_list){
        result += '<li class="search_result_content">' + old + '</li>'
    }
    $("#search_result").html(result);
}

