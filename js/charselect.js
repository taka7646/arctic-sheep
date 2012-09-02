
$(function(){
	$("#main a").click(function(e){
		var $a = $(this);
		var id = $a.data("id");
		var base = charParams[id];
		var $popup = $("#popup");
		$popup.data("id", id);
		$popup.find("img").attr("src", $a.find("img").attr("src"));
		$popup.find("span[data-name=name]").text(base.name);
		$("#popup-bg").show();
	});	
	$("#popup a[data-name=yes]").click(function(e){
		e.preventDefault();
		var $popup = $("#popup");
		var id = $popup.data("id");
		var param = charUtil.createParam(id);
		charUtil.saveChar(param);
		window.location = "room.html";
	});
	$("#popup a[data-name=no]").click(function(e){
		e.preventDefault();
		$("#popup-bg").hide();
	});
});
