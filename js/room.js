
$(function(){
	var param = charUtil.loadChar();
	charUtil.viewStatus($("#status"), param);
	
	$("#content").css("background-image", "url('img/room"+param.id+".jpg')");
});
