/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dijit.Tooltip"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dijit.Tooltip"]){_4._hasResource["dijit.Tooltip"]=true;_4.provide("dijit.Tooltip");_4.require("dijit._Widget");_4.require("dijit._Templated");_4.declare("dijit._MasterTooltip",[_5._Widget,_5._Templated],{duration:_5.defaultDuration,templateString:_4.cache("dijit","templates/Tooltip.html","<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\">\n\t<div class=\"dijitTooltipContainer dijitTooltipContents\" dojoAttachPoint=\"containerNode\" waiRole='alert'></div>\n\t<div class=\"dijitTooltipConnector\"></div>\n</div>\n"),postCreate:function(){_4.body().appendChild(this.domNode);this.bgIframe=new _5.BackgroundIframe(this.domNode);this.fadeIn=_4.fadeIn({node:this.domNode,duration:this.duration,onEnd:_4.hitch(this,"_onShow")});this.fadeOut=_4.fadeOut({node:this.domNode,duration:this.duration,onEnd:_4.hitch(this,"_onHide")});},show:function(_7,_8,_9){if(this.aroundNode&&this.aroundNode===_8){return;}if(this.fadeOut.status()=="playing"){this._onDeck=arguments;return;}this.containerNode.innerHTML=_7;var _a=_5.placeOnScreenAroundElement(this.domNode,_8,_5.getPopupAroundAlignment((_9&&_9.length)?_9:_5.Tooltip.defaultPosition,this.isLeftToRight()),_4.hitch(this,"orient"));_4.style(this.domNode,"opacity",0);this.fadeIn.play();this.isShowingNow=true;this.aroundNode=_8;},orient:function(_b,_c,_d){_b.className="dijitTooltip "+{"BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_c+"-"+_d];},_onShow:function(){if(_4.isIE){this.domNode.style.filter="";}},hide:function(_e){if(this._onDeck&&this._onDeck[1]==_e){this._onDeck=null;}else{if(this.aroundNode===_e){this.fadeIn.stop();this.isShowingNow=false;this.aroundNode=null;this.fadeOut.play();}else{}}},_onHide:function(){this.domNode.style.cssText="";if(this._onDeck){this.show.apply(this,this._onDeck);this._onDeck=null;}}});_5.showTooltip=function(_f,_10,_11){if(!_5._masterTT){_5._masterTT=new _5._MasterTooltip();}return _5._masterTT.show(_f,_10,_11);};_5.hideTooltip=function(_12){if(!_5._masterTT){_5._masterTT=new _5._MasterTooltip();}return _5._masterTT.hide(_12);};_4.declare("dijit.Tooltip",_5._Widget,{label:"",showDelay:400,connectId:[],position:[],constructor:function(){this._nodeConnectionsById={};},_setConnectIdAttr:function(_13){for(var _14 in this._nodeConnectionsById){this.removeTarget(_14);}_4.forEach(_4.isArrayLike(_13)?_13:[_13],this.addTarget,this);},_getConnectIdAttr:function(){var ary=[];for(var id in this._nodeConnectionsById){ary.push(id);}return ary;},addTarget:function(id){var _15=_4.byId(id);if(!_15){return;}if(_15.id in this._nodeConnectionsById){return;}this._nodeConnectionsById[_15.id]=[this.connect(_15,"onmouseenter","_onTargetMouseEnter"),this.connect(_15,"onmouseleave","_onTargetMouseLeave"),this.connect(_15,"onfocus","_onTargetFocus"),this.connect(_15,"onblur","_onTargetBlur")];if(_4.isIE&&!_15.style.zoom){_15.style.zoom=1;}},removeTarget:function(_16){var id=_16.id||_16;if(id in this._nodeConnectionsById){_4.forEach(this._nodeConnectionsById[id],this.disconnect,this);delete this._nodeConnectionsById[id];}},postCreate:function(){_4.addClass(this.domNode,"dijitTooltipData");},startup:function(){this.inherited(arguments);var ids=this.connectId;_4.forEach(_4.isArrayLike(ids)?ids:[ids],this.addTarget,this);},_onTargetMouseEnter:function(e){this._onHover(e);},_onTargetMouseLeave:function(e){this._onUnHover(e);},_onTargetFocus:function(e){this._focus=true;this._onHover(e);},_onTargetBlur:function(e){this._focus=false;this._onUnHover(e);},_onHover:function(e){if(!this._showTimer){var _17=e.target;this._showTimer=setTimeout(_4.hitch(this,function(){this.open(_17);}),this.showDelay);}},_onUnHover:function(e){if(this._focus){return;}if(this._showTimer){clearTimeout(this._showTimer);delete this._showTimer;}this.close();},open:function(_18){if(this._showTimer){clearTimeout(this._showTimer);delete this._showTimer;}_5.showTooltip(this.label||this.domNode.innerHTML,_18,this.position);this._connectNode=_18;this.onShow(_18,this.position);},close:function(){if(this._connectNode){_5.hideTooltip(this._connectNode);delete this._connectNode;this.onHide();}if(this._showTimer){clearTimeout(this._showTimer);delete this._showTimer;}},onShow:function(_19,_1a){},onHide:function(){},uninitialize:function(){this.close();this.inherited(arguments);}});_5.Tooltip.defaultPosition=["after","before"];}}};});