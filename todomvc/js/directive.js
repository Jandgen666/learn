/**
 * Created by JS on 2016/04/05/0005.
 */
var todoApp = angular.module('TodoApp');
todoApp.directive('autoFocus',[function () {
	// 双击后自动获得焦点，功能性的指令
	return {
		link:function (scope,element,attributes) {
			element.on('dblclick',function () {
				angular.element(this).find('input').eq(1)[0].focus();
			})
		}
	}
}]);
