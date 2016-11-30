$("#more").height($(window).height());
$(".tmore").hover(
	function () {
		$("#more").show();
	},
	function () {
		$("#more").hide();
	}
)
$("#more").hover(
	function () {
		$("#more").show();
	},
	function () {
		$("#more").hide();
	}
)
if(localStorage.bgclass){
	$("body").removeClass();
	$("body").addClass(localStorage.bgclass);
	var c = $("body").attr('class');
	if(c=='bg'){
		$("#hf").css("color","#000000")
		$(".mnav").css("color","#000000")
	}else{
		$("#hf").css("color","#FFFFFF")
		$(".mnav").css("color","#FFFFFF")
	}
}
$("#hf").click(function () {
	var f = $("body").attr('class');
	if (f=='bg') {
		$("body").removeClass();
		$("body").addClass('bg2');
		$("#hf").css("color","#FFFFFF")
		$(".mnav").css("color","#FFFFFF")
		localStorage.bgclass="bg2";
	} else{
		$("body").removeClass();
		$("body").addClass('bg');
		$("#hf").css("color","#000000")
		$(".mnav").css("color","#000000")
		localStorage.bgclass="bg";
	}
})

$(".cli").bind('click',function () {
		var id = $(this).attr("id");
		$( ".tnav div" ).each(function(e) {
			if(id==$(this).attr("pid")){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	}
)