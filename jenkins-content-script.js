// ==UserScript==
// @name         Jenkins编译辅助插件
// @version      0.9.0
// @icon         https://jenkins.mapbar.com/static/cafc1878/images/headshot.png
// @description  进行编译的时候，提供额外的筛选按钮
// @author       Leon Yang
// @updateURL    https://code.aliyun.com/smartcore/open-js/raw/jenkins-assist/jenkins-content-script.js
// @downloadURL  https://code.aliyun.com/smartcore/open-js/raw/jenkins-assist/jenkins-content-script.js
// @include      *://jenkins.mapbar.com/*job/*/build*
// @include      *://10.20.0.18:8081/*job/*/build*
// @run-at       document_end
// ==/UserScript==

var _headNode = document.getElementsByTagName('head')[0];

var script = document.createElement("script");  //创建一个script标签
script.type = "text/javascript";
script.src = "https://code.aliyun.com/smartcore/open-js/raw/jenkins-assist/jenkins-function-script.js";
_headNode.appendChild(script);

//第一次加载的时候初始化样式文件
var setting_main_nodes = document.getElementsByClassName("setting-main");
for (var loopIdx = 0; loopIdx < setting_main_nodes.length; ++loopIdx) {
	var input_node = document.createElement("input");
	var select_node = setting_main_nodes[loopIdx].getElementsByTagName("select")[0];
	
	if (select_node != undefined) {
		select_node.setAttribute("oninput", "showTip(this)");

		var select_value = select_node.options[select_node.selectedIndex].value;
		var input_node_id = setting_main_nodes[loopIdx].getElementsByTagName("input")[0].value + "_input_select";
		input_node.setAttribute("id", input_node_id);
		input_node.setAttribute("oninput", "showTip(this)");
		input_node.setAttribute("class", "setting-input");
		input_node.setAttribute("value", select_value);
		input_node.setAttribute("onfocus", "clickInput(this)");
		input_node.setAttribute("style", "width:400px;background-color:#F0F8FF");
		setting_main_nodes[loopIdx].getElementsByTagName("div")[0].insertBefore(input_node, select_node);

		var _cssNode = document.createElement("style");
		var _cssContent = "#" + input_node_id + "_div div{background-color:#F0F8FF;}";
		_cssContent += "#" + input_node_id + "_div div:hover{background-color:#BFEFFF;}";
		_cssNode.innerHTML = _cssContent;
		_headNode.appendChild(_cssNode);
	}
}
