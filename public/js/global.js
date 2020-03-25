console.log('hello');

$(document).ready(function(){
  $("a.load_doc").on("click", function() {
    var preview_url = $(this).attr('data-url');
    console.log(preview_url);
    $(".document").attr('src', preview_url);
  });

  $("div.form-container").on("submit", function() {
    console.log('submitted');
  });
});

