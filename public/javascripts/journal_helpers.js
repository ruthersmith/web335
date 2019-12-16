$(document).ready(function(){
    setDate();
    ajaxGet('/journal/get_todo',[],populateTodoList);
  
    $("button").click(function(e){
      e.preventDefault();
      var this_data = $('#todo_form').serialize();
      ajaxPost('/journal/add_todo', this_data,uppdateTodoList);
    });
  
  });

  function ajaxPost(get_url,get_data,successCall){
      $.ajax({
        type: "POST",
        url: get_url,
        data:get_data,
        success: successCall,
        error:function(jqXhr, textStatus, errorMessage){
          alert(errorMessage);
        }
    });
  }


  function ajaxGet(get_url, get_data,successCall){
    $.ajax({
      url: get_url,
      data: get_data,
      success: successCall,
    });
  }

  function uppdateTodoList(){
    $('add-todo-field').val('');
    ajaxGet('/journal/get_todo',[],populateTodoList);
  }

  function populateTodoList(result){
    document.getElementById('todo-list').innerHTML = '';
    result.forEach(element => {
      $('#todo-list').append(`
      <div class='todo-task mb-1'>${element.todo}
      <a href=""><i class="fas fa-trash-alt" aria-hidden="true"></i></a>
      <a href=""><i class="fas fa-check" aria-hidden="true"></i></a>
      </div>`);  
    });
  }
  
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