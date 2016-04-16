/**
 * Created by JS on 2016/04/05/0005.
 */

	// 获取模块
var todoApp = angular.module('TodoApp');
	// 定义一个控制器
todoApp.controller('MainController',['$scope','$location','Storage',function($scope,$location,Storage) {
	//暴露行为
	// 初始化数据
	$scope.input = '';
	// 任务列表,相当于数据库里的一张表，id是数据的标识
	$scope.todos = Storage.get();
	// 编辑任务
	$scope.currentEditId = 0;
	$scope.Edit = function (current) {
		$scope.currentEditId = current;
	}
	// 保存数据
	$scope.save = function () {
		$scope.currentEditId = 0;
		Storage.save();
	};

	
	// 增加数据
	$scope.add = function () {
		if(!$scope.input) {
			return;
		}
		Storage.add($scope.input);
		$scope.input = '';
	};
	// 删除数据
	$scope.remove = Storage.remove;
	// 判断是否有已完成的任务,只是用于页面显示的
	$scope.hasCompleted = function() {
		return $scope.todos.some(item => item.completed);

	};
	// 点击清除已经完成的
	$scope.clearCompleted = function () {
		var temp = Storage.clearCompleted();
		$scope.todos = temp;
	};
	// 全选
	$scope.checked = false;
	$scope.toggleAll = function () {
		$scope.todos.forEach(item => {
			item.completed = $scope.checked;
		})
	};
	// 筛选
	$scope.filterData = {};
	// url
	$scope.location = $location;
	$scope.$watch('location.url()',function (now,old) {
		switch(now) {
			case  '/completed':
				$scope.filterData = {completed:true};
				break;
			case '/active':
				$scope.filterData = {completed:false};
				break;
			default :
				$scope.filterData = {};
				break;
		}
	});
}]);
