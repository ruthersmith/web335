$(document).ready(function(){
    setDate();
   
  
    $("button").click(function(e){
      e.preventDefault();
      var this_data = $('#todo_form').serialize();
  
       $.ajax({
          type: "POST",
          url: '/journal/add_todo',
          data:this_data,
          success: function(data,status){
          
          },
          error:function(jqXhr, textStatus, errorMessage){
            alert(errorMessage);
          }
      });
    });
  
  });
  
  function getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
  
    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }
      /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  function openNav() {
    document.getElementById("journal-entries").style.width = "250px";
    document.getElementById("journal-main").style.marginLeft = "250px";
    document.getElementById('openbtn').style.display = "none";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("journal-entries").style.width = "0";
    document.getElementById("journal-main").style.marginLeft = "0";
    document.getElementById('openbtn').style.display = "block";
  }

  function setDate(){
    var today = getDate();
    $('#journal_date').val(today);
    $('#today').val(today);
  }