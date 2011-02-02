/**
 * jQuery plugin Color Animations Ver. 2
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * LastUpdale:2010-03-18
 */

// jQuery Color Animations
// By John Resig

(function($){
$.extend({
	parseColorCode:function(rgb){
		return '#' + (((256 + rgb[0] << 8) + rgb[1] << 8) + rgb[2]).toString(16).slice(1);
		//return ((((1 << 8) + rgb[0] << 8) + rgb[1] << 8) + rgb[2]).toString(16).replace(/^1/, '#');
	},

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	getRGB:function(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && Object.prototype.toString.call(color) === "[object Array]" && color.length == 3 )
			return color;

		//old - rgb(num,num,num) => new - rgb(num,num,num) or rgba(num,num,num,num)
		//if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
		if (result = /rgba?\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d(?![0-9])|\d{1}(?![0-9]))\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d(?![0-9])|\d{1}(?![0-9]))\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d(?![0-9])|\d{1}(?![0-9]))\s*(?:,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d(?![0-9])|\d{1}(?![0-9]))\s*)?\)/.exec(color))
			return [+result[1], +result[2], +result[3]];
		
		// rgb(num%,num%,num%) num = 100 ~ 0
		//if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
		if (result = /rgb\(\s*((?:100|(?:[1-9]\d|\d)(?:\.[0-9]+)?))\%\s*,\s*((?:100|(?:[1-9]\d|\d)(?:\.[0-9]+)?))\%\s*,\s*((?:100|(?:[1-9]\d|\d)(?:\.[0-9]+)?))\%\s*\)/.exec(color))
			return [+result[1]*255/100, +result[2]*255/100, +result[3]*255/100];
			//old ↓ 100% = 254.99999999999997
			//return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return $.namedColors[ $.trim(color).toLowerCase() ];
	},
	
	getColor:function(elem, attr) {
		var color;
		do {
			color = $.curCSS(elem, attr);
			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' && !color.match(/rgba\s*\(.*,\s*0\s*\)/) || $.nodeName(elem, 'body') )
				break;

			attr = 'backgroundColor';
		} while ( elem = elem.parentNode );
		
		return color;
	},
	
	namedColors: {
		aqua: [0, 255, 255],
		azure: [240, 255, 255],
		beige: [245, 245, 220],
		black: [0, 0, 0],
		blue: [0, 0, 255],
		brown: [165, 42, 42],
		cyan: [0, 255, 255],
		darkblue: [0, 0, 139],
		darkcyan: [0, 139, 139],
		darkgray: [169, 169, 169], //darkgrey -> darkgray
		darkgreen: [0, 100, 0],
		darkkhaki: [189, 183, 107],
		darkmagenta: [139, 0, 139],
		darkolivegreen: [85, 107, 47],
		darkorange: [255, 140, 0],
		darkorchid: [153, 50, 204],
		darkred: [139, 0, 0],
		darksalmon: [233, 150, 122],
		darkviolet: [148, 0, 211],
		fuchsia: [255, 0, 255],
		gold: [255, 215, 0],
		green: [0, 128, 0],
		indigo: [75, 0, 130],
		khaki: [240, 230, 140],
		lightblue: [173, 216, 230],
		lightcyan: [224, 255, 255],
		lightgreen: [144, 238, 144],
		lightgrey: [211, 211, 211],
		lightpink: [255, 182, 193],
		lightyellow: [255, 255, 224],
		lime: [0, 255, 0],
		magenta: [255, 0, 255],
		maroon: [128, 0, 0],
		navy: [0, 0, 128],
		olive: [128, 128, 0],
		orange: [255, 165, 0],
		pink: [255, 192, 203],
		purple: [128, 0, 128],
		violet: [128, 0, 128],
		red: [255, 0, 0],
		silver: [192, 192, 192],
		white: [255, 255, 255],
		yellow: [255, 255, 0],
		
		//add color
		aliceblue: [240, 248, 255],
		antiquewhite: [250, 235, 215],
		aquamarine: [127, 255, 212],
		bisque: [255, 228, 196],
		blanchedalmond: [255, 235, 205],
		blueviolet: [138, 43, 226],
		burlywood: [222, 184, 135],
		cadetblue: [95, 158, 160],
		chartreuse: [127, 255, 0],
		chocolate: [210, 105, 30],
		coral: [255, 127, 80],
		cornflowerblue: [100, 149, 237],
		cornsilk: [255, 248, 220],
		crimson: [220, 20, 60],
		darkgoldenrod: [184, 134, 11],
		darkseagreen: [143, 188, 143],
		darkslateblue: [72, 61, 139],
		darkslategray: [47, 79, 79],
		darkturquoise: [0, 206, 209],
		deeppink: [255, 20, 147],
		deepskyblue: [0, 191, 255],
		dimgray: [105, 105, 105],
		dodgerblue: [30, 144, 255],
		feldspar: [209, 146, 117],
		firebrick: [178, 34, 34],
		floralwhite: [255, 250, 240],
		forestgreen: [34, 139, 34],
		gainsboro: [220, 220, 220],
		ghostwhite: [248, 248, 255],
		goldenrod: [218, 165, 32],
		gray: [128, 128, 128],
		greenyellow: [173, 255, 47],
		honeydew: [240, 255, 240],
		hotpink: [255, 105, 180],
		indianred: [205, 92, 92],
		ivory: [255, 255, 240],
		lavender: [230, 230, 250],
		lavenderblush: [255, 240, 245],
		lawngreen: [124, 252, 0],
		lemonchiffon: [255, 250, 205],
		lightcoral: [240, 128, 128],
		lightgoldenrodyellow: [250, 250, 210],
		lightsalmon: [255, 160, 122],
		lightseagreen: [32, 178, 170],
		lightskyblue: [135, 206, 250],
		lightslateblue: [132, 112, 255],
		lightslategray: [119, 136, 153],
		lightsteelblue: [176, 196, 222],
		limegreen: [50, 205, 50],
		linen: [250, 240, 230],
		mediumaquamarine: [102, 205, 170],
		mediumblue: [0, 0, 205],
		mediumorchid: [186, 85, 211],
		mediumpurple: [147, 112, 216],
		mediumseagreen: [60, 179, 113],
		mediumslateblue: [123, 104, 238],
		mediumspringgreen: [0, 250, 154],
		mediumturquoise: [72, 209, 204],
		mediumvioletred: [199, 21, 133],
		midnightblue: [25, 25, 112],
		mintcream: [245, 255, 250],
		mistyrose: [255, 228, 225],
		moccasin: [255, 228, 181],
		navajowhite: [255, 222, 173],
		oldlace: [253, 245, 230],
		olivedrab: [107, 142, 35],
		orangered: [255, 69, 0],
		orchid: [218, 112, 214],
		palegoldenrod: [238, 232, 170],
		palegreen: [152, 251, 152],
		paleturquoise: [175, 238, 238],
		palevioletred: [216, 112, 147],
		papayawhip: [255, 239, 213],
		peachpuff: [255, 218, 185],
		peru: [205, 133, 63],
		plum: [221, 160, 221],
		powderblue: [176, 224, 230],
		rosybrown: [188, 143, 143],
		royalblue: [65, 105, 225],
		saddlebrown: [139, 69, 19],
		salmon: [250, 128, 114],
		sandybrown: [244, 164, 96],
		seagreen: [46, 139, 87],
		seashell: [255, 245, 238],
		sienna: [160, 82, 45],
		skyblue: [135, 206, 235],
		slateblue: [106, 90, 205],
		slategray: [112, 128, 144],
		snow: [255, 250, 250],
		springgreen: [0, 255, 127],
		steelblue: [70, 130, 180],
		tan: [210, 180, 140],
		teal: [0, 128, 128],
		thistle: [216, 191, 216],
		tomato: [255, 99, 71],
		turquoise: [64, 224, 208],
		violetred: [208, 32, 144],
		wheat: [245, 222, 179],
		whitesmoke: [245, 245, 245],
		yellowgreen: [154, 205, 50]
	}
});


// We override the animation for all of these color styles
$.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
	$.fx.step[attr] = function(fx){
		//if ( fx.state == 0 ) {
		if ( !fx.start ) {
			fx.start = $.getRGB( $.getColor( fx.elem, attr ) );
			fx.end   = $.getRGB( fx.end );
		}

		fx.elem.style[attr] = 'rgb(' + [
			Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
			Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
			Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
		].join(',') + ')';
	};
});


})(jQuery);