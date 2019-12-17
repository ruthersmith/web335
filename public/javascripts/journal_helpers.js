function ajax(my_type,my_url,my_data,successCall){
    $.ajax({
      type: my_type,
      url: my_url,
      data: my_data,
      success: successCall,
      error:function(jqXhr, textStatus, errorMessage){
        alert(errorMessage);
      }
    });
  }

  function updateTodoList(){
    document.getElementById('add-todo-field').innerText = " ";
    ajax('GET','/journal/get_todo',[],populateTodoList);
  }

  function populateTodoList(result){
    document.getElementById('todo-list').innerHTML = '';
    result.forEach(element => {
      $('#todo-list').append(`
      <div class='todo-task mb-1'>${element.todo}
      <a onclick="delete_todo(${element.todo_id})"><i class="fas fa-trash-alt" aria-hidden="true"></i></a>
      <a href=""><i class="fas fa-check" aria-hidden="true"></i></a>
      </div>`);  
    });
  }

  
  function populateJournalEntryLink(result){
    result.forEach(element => {
      $('#journal-entries').append(`<a href="/journal/saved_entry/${element.id}">${element.title}</a>`);
    });
  }

  function populateJournalEntry(result){
    populateJournalEntryLink(result);
    
    //var currentUser = JSON.parse('{{{ entry_id}}}');
    // let this_entry = result.find(element => element.id == entry_id);
    console.log(result);
  }


  function delete_todo(todo_id){
    ajax('DELETE',`/journal/delete_todo/${todo_id}`,[],updateTodoList());
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

  function saveJournal(e){
    data = {}
    data.title = document.getElementById('journal-title').value;
    data.journal_entry = document.getElementById('journal-entry-area').value;
    data.date = getDate();
    ajax('POST','/journal/save_journal',data);
  }

