/**
 * jqKeyCodeBinder.js
 *
 * @version      v0.1
 * @author       kamiyam (http://twitter.com/kamiyam)
 * @copyright    (c) 2012 キータッチイベントのバインドを楽にするjQueryプラグイン jqKeyCodeBinder
 * @license      The MIT License
 * @link         
 *
 */

if( window.jQuery == null )	alert( "must be loading jQuery..." );
if( window.console == null )	window.console = { log: function(str){ alert(str); }};

(function($, undefined ){
	var name = "jqKeyCodeBinder";
	
	var bindData = new Array(255);
	
	//keyup判定用 keypress初期タイムアウト時間（押しっぱなし初期はkeypressのスパンが長い）
	var firstDuring = 2000;
	var normalDuring = 100;

//start
$[name] = function( options )
{
	if (!(this instanceof $[name])) return new $[name]( options );
	var o = this;
	var c = o.config = $.extend( {}, $[name].defaults, options );
	var fn = o.fn = $[name].fn;

	var p = $( "body" ).data( name );
	if (p) return p;

	$( "body" ).data( name, o );

	return ( function init(){
		
		$( document ).on( "keyup." + name + " keydown." + name + " keypress." + name, function( e ){
			
			var keyCode = e.keyCode;
			var keyType = e.type; 
			if( keyType === "keypress" )
			{
				keyCode = p_fn.getKeyCode( String.fromCharCode( e.charCode ).toUpperCase() );	
			}

			//同一キーにぶら下がるバインドを取る
			var binds = bindData[keyCode];
			if ( binds == null ) return ;

			//キュー
			var queue = new Array();
			for( var i = 0; i < binds.length; i++ )
			{
				//入力したキーに対するバインド
				var b = binds[i];
				if ( b != null && e.altKey === b.altKey 
						&& e.shiftKey === b.shiftKey && e.ctrlKey === b.ctrlKey )
				{
						
					if( keyType === "keydown" )
					{	
						if( ! b.invalid && ! b.completed ){
							//処理が終了してkeyを離すまで無効にする
							b.invalid = true;
							b.completed = true;
							queue.push( b.func );
						}
					}
                    else if( keyType === "keypress" )
					{
						//押している間はclearTimeoutでキャンセルがかかる
						(function( target ){

							//処理が終了してkeyを離すまで無効にする							
							clearTimeout( target.timer );
							target.timer = setTimeout( function(){	
								//無効時間終了		
								if ( target.completed )		p_fn.complete( target );

							}, target.during );

							//keypress安定
							target.during = normalDuring;
						})( b );
					}
                    else if( keyType === "keyup" )
					{
						//無効時間終了
						if ( b.completed )	p_fn.complete( b );
					}
				}
			}

			//queue実行
			for( var i = 0; i < queue.length; i++ ) queue[i]();
			
		});
		
		return o;
	})();
};

var p_fn = {
	complete:function( target ){
		target.invalid = false;
		target.completed = false;
		target.during = firstDuring;
	},
	
	isFunction : function( func )
	{
		return ( func != null && ( typeof( func ) == "function" ) );
	},
	
	getKeyCode: function(key){
		return ($[name].defaults.keycode[key]);
	},

	getBindObject: function( binds ){
		var o = { completed: false, invalid: false, during: firstDuring, timer: new Object(), command: binds, keyCode: -1,
					 altKey: false, shiftKey: false, ctrlKey: false, func: function(){} }
		
		var keys = binds.split( "+" );
		for( var j = 0; j < keys.length; j++ ){
			var key = keys[j];
			var keyCode = p_fn.getKeyCode( key );
			if( keyCode > -1 && o.keyCode === -1 )
			{				
				o.keyCode = keyCode;
			}

			switch ( key )
			{
				case "SHIFT":
					o.shiftKey = true;
					continue;
				case "CTRL":
					o.ctrlKey = true;
					continue;
				case "ALT":
					o.altKey = true;
					continue;
			}
		}
		return o;
	}
}

$[name].prototype = {
	on : function( keyBind, delegade ){
		var binds = keyBind.toUpperCase().split( " " );
		for( var i = 0; i < binds.length; i++ ){
			var o = p_fn.getBindObject( binds[i] );
			if( o.keyCode > -1 )
			{
				//
				if ( bindData[o.keyCode] == null ) bindData[o.keyCode] = new Array();
				
				if( p_fn.isFunction( delegade ) ){
					o.func = delegade;
					bindData[o.keyCode].push(o);
				}
			}
		}
	},
	off : function ( keyBind ){
		var binds = keyBind.toUpperCase().split( " " );
		for( var i = 0; i < binds.length; i++ ){
			
			var o = p_fn.getBindObject( binds[i] );
			var binds = bindData[o.keyCode];
			if ( binds != null )
			{ 
				for ( var i = 0; i < binds.length; i++ )
				{
					var keys = binds[i]
					if ( keys != null && o.command === keys.command )	binds[i] = undefined ;
				}
			}
		}
	},
	unbind : function (){
		$( document ).off( "." + name );
	} 
};

$[name].defaults = {
	debug: false,
	keycode: {
		"RETURN":13,
		"SPACE":32,
		"LEFT":37,
		"UP":38,
		"RIGHT":39,
		"DOWN":40,
		"0":48,
		"1":49,
		"2":50,
		"3":51,
		"4":52,
		"5":53,
		"6":54,
		"7":55,
		"8":56,
		"9":57,
		"A":65,
		"B":66,
		"C":67,
		"D":68,
		"E":69,
		"F":70,
		"G":71,
		"H":72,
		"I":73,
		"J":74,
		"K":75,
		"L":76,
		"M":77,
		"N":78,
		"O":79,
		"P":80,
		"Q":81,
		"R":82,
		"S":83,
		"T":84,
		"U":85,
		"V":86,
		"W":87,
		"X":88,
		"Y":89,
		"Z":90,
		"COMMA":190,
		"PERIOD":191
	}

};

//end
})( jQuery )