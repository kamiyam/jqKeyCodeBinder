# jqKeyCodeBinder

キータッチイベントのバインドを楽にするjQueryプラグイン → [demo site](http://nantokaworks.com/demo/jqKeyCodeBinder/)

アルファベットおよび cursol(up, left, down, right)、return/space 単一キーのイベントバインドが可能

また、上記単一キー + ( ALT or SHIFT or CTRL )付きのキーバインドが可能


## loading
	var binder = $.jqKeyCodeBinder();


## on
### 単一キーバインド

	binder.on( "a", function(){ alert("a")} );

### 複数キーバインド
	binder.on( "shift+ctrl+c", function(){ alert( "shift+ctrl+c" )} );
	binder.on( "alt+shift+ctrl+down", function(){ alert( "alt+shift+ctrl+down" )} );
	binder.on( "shift+alt+ctrl+return", function(){ alert( "shift+alt+ctrl+return" )} );


### 同一キーバインド
#### 設定した順に実行する
	binder.on( "shift+f", function(){ alert( "shift+f 1" )} );
	binder.on( "shift+f", function(){ alert( "shift+f 2" )} );


### 複数イベント
#### スペースで区切る
	binder.on( "shift+d ctrl+e", function(){ alert( "shift+d or ctrl+e" )} );


## off
### キーバインド解除
#### 基本
	binder.on( "b", hogehoge );
 	binder.off( "b" );

	binder.on( "alt+shift+ctrl+c", fugafuga );
	binder.off( "alt+shift+ctrl+c" );


#### 並び順の違うキーバインド（文字ベース）は別のイベントバインドとして扱う
	binder.on( "alt+shift+ctrl+c", hogefuga );
	binder.on( "alt+shift+c+ctrl", hogefuga );	//←次のoff("alt+shift+ctrl+c")では解除されない
	
	binder.off( "alt+shift+ctrl+c" );


#### 複数キーバインド 単一キーバインド解除
	binder.on( "shift+z alt+z", fugahoge );
	binder.off( "shift+z" );	//「shift+z」のみ解除


## undind
### すべてのキーバインドを解除する
	binder.unbind();