//time functions
var day = new Date();
document.getElementById("currentDay").innerHTML = moment().format('LLL');




//storage and retrieval
var tasks = JSON.parse(localStorage.getItem("tasks")) || {};

var saveTasks = function(timeString, todoText){
    tasks[timeString] = todoText;
     localStorage.setItem("tasks", JSON.stringify(tasks));
};



//load tasks into the planner
var loadTasks = function() {
    $(".todo").each(function(index, todoDiv){
      //if there is a text entry for id then set p with text
      
      if (todoDiv.id in tasks) {
        todoDiv.firstElementChild.innerHTML = tasks[todoDiv.id];
      }   
    })
    
};
loadTasks();

//on click, change p to text area
$(".todo").on("click", "p", function() {
    var text = $(this)
      .text()
      .trim();
    
    var textInput = $("<textarea>")
    
    if (text !== "") {
      textInput.val(text);
    }
    
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
     
});

//Save when clicking off text area
$(".todo").on("blur", "textarea", function() {
    // get the textarea's current value/text
      var text = $(this)
        .val()
        .trim();
        
      //find id
      var timeString = $(this)
        .closest('div')
        .attr('id');
      //save the tasks to the object array
      saveTasks(timeString, text);
      // recreate p element
      var taskP = $("<p>")
        .addClass("m-1")
        .text(text);
    
      // replace textarea with p element
      $(this).replaceWith(taskP);
});


//color changing function
var colorCode = function(){
  
    var currentHour = moment().format("H");

    $(".todo").each(function(){
      var time = parseInt($(this).attr("id")); 
      if (currentHour > time ){
        $(this).addClass("past")
      }
      else if (currentHour < time ){
        $(this).addClass("future")
      }
      else{
        $(this).addClass("present")
      }
    })  
};

//keep track of the color changer
setInterval(colorCode, 5000);

//Sets initial color.
colorCode();