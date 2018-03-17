$(function (argument) {
	var index = $("#startingIndex").val();
	var gender = $("#gender").val();
	var startwith = $("#startWith").val();
	$.post("php/public/publicOps.php",{"OP":"GET_NAMES","Index":index,"gender":gender,"startwith":startwith},function (response) {
        data = jQuery.parseJSON(response);
       	var elementCount = 1;
       	var html = "";
       	var firstTime = true;
       	$(data).each(function () {
       		if(elementCount==1){
       			
       			if(firstTime){
       				html+="<div  class='row' style='display:none;padding-top:100px;padding-right:30px;padding-left:30px;padding-bottom:0px;direction: rtl;'>";
       				firstTime = false;
       			}else{
       				html+="<div  class='row' style='display:none;padding-right:30px;padding-left:30px;padding-top:0px;padding-bottom:0px;direction: rtl;'>";

       			}
       		}
       		g = "رەگەز: نێر،مێ";
       		if(this.gender=='M'){
       			g = "رەگەز:نێر";
       		}else if(this.gender=='F'){
       			g = "رەگەز:مێ";
       		}
       		// person-detail
       		html+='<div class="col-lg-3 col-md-6 col-sm-12"><div class="card   item "  data-nametitle="'+this.name+'" data-desc="'+this.desc+'">'+
	       				'<div class="card-block ">'+
	       					'<h4 class="card-title">'+this.name+'</h4>'+
	       					'<p class="card-text name-desc">'+this.desc+'</p>'+
		       			'</div>'+
		       			'<div class="card-footer">'+g+'</i></div>'+
		       		'</div></div>';

       		if(elementCount==4){
       			elementCount=0;
       			html+="</div>";
       		}	
       		elementCount++;
       	});
       	$(".bodyArea").append(html);
       	$(".row").fadeIn(400)

  	});// end of post reqest  
  	// namecount
  	$.post("php/public/publicOps.php",{"OP":"GET_NAME_COUNT"},function (response) {
        data = jQuery.parseJSON(response);
       	$("#namecount").html(data.total);

  	});// end of post reqest  
	$( document ).ajaxStart(function() {
        $("#loader").fadeIn(200);
    });

    $( document ).ajaxComplete(function() {
       $("#loader").fadeOut(200); 
    });
    $("#search-box").keypress(function(e) {
	    if(e.which == 13) {
	        
	    }// end of if
	});

    $(".load-more").click(function () {
    	
    	$("#not-found").remove();
    	var btn = $(this);
    	$(this).attr("disabled","disabled")
    	var index = $("#startingIndex").val();
    	if(index=='0' && $("#searched").val()!='1'){
    		index=8;
    	}else if(index==0 && $("#searched").val()=='1'){
    		index = 0;
    	}
    	else{
    		index=parseInt(index)+8;
    	} 

    	
		var gender = $("#gender").val();
		var startwith = $("#startWith").val();
		$.post("php/public/publicOps.php",{"OP":"GET_NAMES","Index":index,"gender":gender,"startwith":startwith},function (response) {
	        $(btn).removeAttr('disabled')
	        data = jQuery.parseJSON(response);
	       	var elementCount = 1;
	       	var html = "";
	       	var elemntsCount = $(".item").length;
	       	var firstTime = true;
	       	$(data).each(function () {

	       		if(elementCount==1){
       			
	       			if(firstTime && $("#searched").val()=='1'){
	       				html+="<div  class='row' style='display:none;padding-top:100px;padding-right:30px;padding-left:30px;;padding-bottom:0px;direction: rtl;'>";
	       				firstTime = false;
	       			}else{
	       				html+="<div  class='row' style='display:none;padding-right:30px;padding-left:30px;padding-top:0px;padding-bottom:0px;;padding-top:0;margin-top:0px !important;direction: rtl;'>";
	       			}
       			}

	       		g = "رەگەز: نێر،مێ";
	       		if(this.gender=='M'){
	       			g = "رەگەز:نێر";
	       		}else if(this.gender=='F'){
	       			g = "رەگەز:مێ";
	       		}
	       		html+='<div class="col-lg-3 col-md-6 col-sm-12"><div class="card   item "  data-nametitle="'+this.name+'" data-desc="'+this.desc+'">'+
	       				'<div class="card-block ">'+
	       					'<h4 class="card-title">'+this.name+'</h4>'+
	       					'<p class="card-text name-desc">'+this.desc+'</p>'+
		       			'</div>'+
		       			'<div class="card-footer">'+g+'</i></div>'+
		       		'</div></div>';

	       		if(elementCount==4){
	       			elementCount=0;
	       			html+="</div>";
	       		}	
	       		elementCount++;
	       	});
	       	if($("#searched").val()=='1'){
    			$(".bodyArea").html("");
    			$("#searched").val('-1');
    		}
    	
	       	$(".bodyArea").append(html);
	       	$("#startingIndex").val(index)
	       	$(".row").fadeIn(400)

  		});// end of post reqest 
  		
    });
    $("#search-btn").click(function () {
    	$("#searched").val('1');
    	$("#startingIndex").val(0);
    	var searchData = $("#search-box").val();
    	$("#startingIndex").val(0);
    	$.post("php/public/publicOps.php",{"OP":"SEARCH_NAMES","query":searchData},function (response) {
    		data = jQuery.parseJSON(response);
	       	var elementCount = 1;
	       	var html = "";
	       	var firstTime = true;
	       	$(data).each(function () {
	       		if(elementCount==1){
	       			if(firstTime){
	       				html+="<div  class='row' style='display:none;padding-top:100px;padding-right:30px;padding-left:30px;;padding-bottom: 0px;direction: rtl;'>";
	       				firstTime = false;
	       			}else{
	       				html+="<div  class='row' style='display:none;padding-right:30px;padding-left:30px;padding-top:0px;padding-bottom:0px;direction: rtl;'>";
	       			}
       			}
	       		g = "رەگەز: نێر،مێ";
		   		if(this.gender=='M'){
		   			g = "رەگەز:نێر";
		   		}else if(this.gender=='F'){
		   			g = "رەگەز:مێ";
		   		}
	       		html+='<div class="col-lg-3 col-md-6 col-sm-12"><div class="card   item "  data-nametitle="'+this.name+'" data-desc="'+this.desc+'">'+
	       				'<div class="card-block ">'+
	       					'<h4 class="card-title">'+this.name+'</h4>'+
	       					'<p class="card-text name-desc">'+this.desc+'</p>'+
		       			'</div>'+
		       			'<div class="card-footer">'+g+'</i></div>'+
		       		'</div></div>';
	       		if(elementCount==4){
	       			elementCount=0;
	       			html+="</div>";
	       		}	
	       		elementCount++;
	       	});
	       	$(".bodyArea").html(html);
	       	if(data.length==0){
       			$(".bodyArea").html("<div  class='row' style='display:none;padding:100px;padding-bottom: 0px;direction: rtl;'><h1 id='not-found'>ھیچ ئەنجامێک نەدۆزرایەوە</h1></div>");
	       	}
	       	$(".row").fadeIn(400)
    	});
    		
    });

	$(document).delegate('.item','click',function () {
		var row  = $(this).parents('.item');

		nametitle = $(this).data('nametitle');
		desc = $(this).data('desc');
		
		$("#modal-name").text(nametitle);
		$("#modal-desc").text(desc);
		$('#myModal').modal('toggle');
		
	});
	$(".aboutus").click(function () {
		$('#myModal2').modal('toggle');
	});
	$(".addname").click(function (argument) {
		var htmlcontent = "<input class='form-control' type='text' id='suggested-name' placeholder='...ناوێک بنووسە بۆ ناردن' /> ";
		htmlcontent += "<br><input class='form-control' type='text' id='suggested-desc' placeholder='...مانای ناوەکەت' /> ";
		htmlcontent += "<br><select style='direction: rtl;font-family: inherit;' id='suggested-gender' class='form-control'><option value='O'>ھاوبەش</option><option value='M'>نێر</option><option value='F'>مێ</option></select>";
		

		swal({
		  title: 'ناوێک زیاد بکە</u>',
		  type: 'question',
		  html:htmlcontent,
		  showCloseButton: true,
		  showCancelButton: true,
		  focusConfirm: false,
		  confirmButtonColor: "#39414a",
		  confirmButtonText:'ناردن <i class="fa fa-check"></i>',
		  confirmButtonAriaLabel: 'Thumbs up, great!',
		  cancelButtonText:'<i class="fa fa-times"></i>'
		 
		}).then(function () {
			name = $("#suggested-name").val();
			desc = $("#suggested-desc").val();
			gender = $("#suggested-gender").val();
			if(name.trim()!="" && name!=undefined){
				$.post("php/public/publicOps.php",{"OP":"NEW_NAME","Name":name,"gender":gender,"NameDesc":desc},function (response) {
	                data = jQuery.parseJSON(response);
	                if(data.status=='1'){
                      swal({
						    title:'سوپاس',
						    html:data.msg,
						    type:'success',
						    confirmButtonColor: "#39414a",
					  		confirmButtonText:'کۆتای <i class="fa fa-check"></i>',
						});
					       
	                }else{
	                  swal({
	                    title: "وەستێنرا",
	                    text: data.msg ,
	                    // confirmButtonColor: "#39414a",
	                    type: "error"
	                  });
	                }

              	});// end of post reqest  
			}else{
				swal({
				    title:'پێویستە',
				    html:'پێویستە ناوێک بنوسیت بۆ ناردن',
				    type:'error',
			  		confirmButtonText:'کۆتای <i class="fa fa-check"></i>',
				});
				 
			}

		});
	});

	
});