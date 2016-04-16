/**
 * Created by JS on 2016/04/05/0005.
 */

// 获取模块
var todoApp = angular.module('TodoApp');
todoApp.service('Storage',['$window',function ($window) {
	// 随机生成id
	function getId() {
		return Math.random()
	};
	// 获取数据表里的值，存在客户端里的
	var todos = JSON.parse($window.localStorage.getItem('todosData') || '[]');
	this.get =  function () {
		return todos;
	};
	// 将数据保存起来，多个地方用到，封装起来
	this.save = function () {
		$window.localStorage.setItem('todosData',JSON.stringify(todos));
	};
	// 增加数据
	this.add = function (content) {
		todos.push({
			id:getId(),
			text:content,
			completed:false
		});
		this.save();
	};
	// 删除数据
	this.remove = function(current) {
		var index = todos.indexOf(current);
		todos.splice(index,1);
		this.save();
	};
	// 点击清除已经完成的
	this.clearCompleted = function () {
		var arr = [];
		todos.forEach(function (item) {
			if(!item.completed) {
				arr.push(item);
			}
		});
		todos = arr;
		return todos;
	};
}]);
