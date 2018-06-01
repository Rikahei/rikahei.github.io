// Tap jQuery
$('.menu .item').tab();

// progress bar
var progressbars = $('#htmBar, #cssBar, #jsBar');
progressbars.progress('set duration', 2000);

$('#tab2').click(function(){
  
  $('#htmBar').progress('set percent', 95);
  $('#cssBar').progress('set percent', 80);
  $('#jsBar').progress('set percent', 90);
  
  // shape reset for framework bug
  $('.shape').shape('reset').delay(1000);
});

// shape function
function fram(){ $('.shape').shape('flip up');}
var framShaping = setInterval(fram, 2000);
