# jqKeyCodeBinder

キータッチイベントのバインドを楽にするjQueryプラグイン → [demo site](http://prog.re-d.net/demo/jqKeyCodeBinder/)

アルファベットおよび cursol(up, left, down, right)、return/space 単一キーのイベントバインドが可能
また、上記単一キー + ( ALT or SHIFT or CTRL )付きのキーバインドが可能


## Usage

### loading

#### script

	var binder = $.jqKeyCodeBinder();


## Method

### on

* 単一キーバインド

#### script

	binder.on( "a", function(){ alert("a")} );

* 複数キーバインド

#### script
	binder.on( "shift+ctrl+c", function(){ alert( "shift+ctrl+c" )} );
	binder.on( "alt+shift+ctrl+down", function(){ alert( "alt+shift+ctrl+down" )} );
	binder.on( "shift+alt+ctrl+return", function(){ alert( "shift+alt+ctrl+return" )} );

* 同一キーバインド（設定した順に実行）

#### script
binder.on( "shift+f ctrl+alt+g", function(){ alert( "shift+f or ctrl+alt+g 1" )} );
binder.on( "shift+f ctrl+alt+g", function(){ alert( "shift+f or ctrl+alt+g 2" )} );

* 複数イベント
#### script
	binder.on( "shift+d ctrl+e", function(){ alert( "shift+d or ctrl+e" )} );


### off
* キーバインド解除

#### script

	binder.off( "b" );
	binder.off( "alt+shift+ctrl+c" );


並び順の違うキーバインド（文字ベース）は別のイベントとして扱う

#### script
	binder.on( "alt+shift+ctrl+c" );
	binder.on( "alt+shift+c+ctrl" );	//←キーバインド解除されない
	
	binder.off( "alt+shift+ctrl+c" );


* 複数キーバインド 単一キーバインド解除

#### script
	binder.on( "shift+z alt+z", function(){ alert( "shift+z or alt+z" )} );
	binder.off( "shift+z" );	//「shift+z」のみ解除


### undind
すべてのキーバインドを解除する

#### script
	binder.unbind();
	
