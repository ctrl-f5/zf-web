/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.xmpp.bosh"],["require","dojo.io.script"],["require","dojo.io.iframe"],["require","dojox.xml.parser"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.xmpp.bosh"]){_4._hasResource["dojox.xmpp.bosh"]=true;_4.provide("dojox.xmpp.bosh");_4.require("dojo.io.script");_4.require("dojo.io.iframe");_4.require("dojox.xml.parser");_6.xmpp.bosh={transportIframes:[],initialize:function(_7){this.transportIframes=[];var _8=_6._scopeName+".xmpp.bosh";var c=_4.connect(_4.getObject(_8),"_iframeOnload",this,function(_9){if(_9==0){_7.load();_4.disconnect(c);}});for(var i=0;i<_7.iframes;i++){var _a="xmpp-transport-"+i;var _b=_4.byId("xmpp-transport-"+i);if(_b){if(window[_a]){window[_a]=null;}if(window.frames[_a]){window.frames[_a]=null;}_4.destroy(_b);}_b=_4.io.iframe.create("xmpp-transport-"+i,_8+"._iframeOnload("+i+");");this.transportIframes.push(_b);}},_iframeOnload:function(_c){var _d=_4.io.iframe.doc(_4.byId("xmpp-transport-"+_c));_d.write("<script>var isLoaded=true; var rid=0; var transmiting=false; function _BOSH_(msg) { transmiting=false; parent.dojox.xmpp.bosh.handle(msg, rid); } </script>");},findOpenIframe:function(){for(var i=0;i<this.transportIframes.length;i++){var _e=this.transportIframes[i];var _f=_e.contentWindow;if(_f.isLoaded&&!_f.transmiting){return _e;}}return false;},handle:function(msg,rid){var dfd=this["rid"+rid];var _10=_6.xml.parser.parse(msg,"text/xml");if(_10){dfd.ioArgs.xmppMessage=_10;}else{dfd.errback(new Error("Recieved bad document from server: "+msg));}},get:function(_11){var _12=this.findOpenIframe();var _13=_4.io.iframe.doc(_12);_11.frameDoc=_13;var dfd=this._makeScriptDeferred(_11);var _14=dfd.ioArgs;_12.contentWindow.rid=_14.rid;_12.contentWindow.transmiting=true;_4._ioAddQueryToUrl(_14);_4._ioNotifyStart(dfd);_4.io.script.attach(_14.id,_14.url,_13);_4._ioWatch(dfd,this._validCheck,this._ioCheck,this._resHandle);return dfd;},remove:function(id,_15){_4.destroy(_4.byId(id,_15));if(this[id]){delete this[id];}},_makeScriptDeferred:function(_16){var dfd=_4._ioSetArgs(_16,this._deferredCancel,this._deferredOk,this._deferredError);var _17=dfd.ioArgs;_17.id="rid"+_16.rid;_17.rid=_16.rid;_17.canDelete=true;_17.frameDoc=_16.frameDoc;this[_17.id]=dfd;return dfd;},_deferredCancel:function(dfd){dfd.canceled=true;if(dfd.ioArgs.canDelete){_6.xmpp.bosh._addDeadScript(dfd.ioArgs);}},_deferredOk:function(dfd){var _18=dfd.ioArgs;if(_18.canDelete){_6.xmpp.bosh._addDeadScript(_18);}return _18.xmppMessage||_18;},_deferredError:function(_19,dfd){if(dfd.ioArgs.canDelete){if(_19.dojoType=="timeout"){_6.xmpp.bosh.remove(dfd.ioArgs.id,dfd.ioArgs.frameDoc);}else{_6.xmpp.bosh._addDeadScript(dfd.ioArgs);}}return _19;},_deadScripts:[],_addDeadScript:function(_1a){_6.xmpp.bosh._deadScripts.push({id:_1a.id,frameDoc:_1a.frameDoc});_1a.frameDoc=null;},_validCheck:function(dfd){var _1b=_6.xmpp.bosh;var _1c=_1b._deadScripts;if(_1c&&_1c.length>0){for(var i=0;i<_1c.length;i++){_1b.remove(_1c[i].id,_1c[i].frameDoc);_1c[i].frameDoc=null;}_6.xmpp.bosh._deadScripts=[];}return true;},_ioCheck:function(dfd){var _1d=dfd.ioArgs;if(_1d.xmppMessage){return true;}return false;},_resHandle:function(dfd){if(_6.xmpp.bosh._ioCheck(dfd)){dfd.callback(dfd);}else{dfd.errback(new Error("inconceivable dojox.xmpp.bosh._resHandle error"));}}};}}};});