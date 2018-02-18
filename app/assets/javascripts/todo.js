jQuery(document).ready(function($){
function getAll(){

        $.get("/projects/", function(data){
            $.each(data, function(indexProjects, project) {
                    if (project.user_id == user_id) {
                       $('.todolisttab').append(addProject(project.id, project.name));
                        $.get("/projects/" + project.id + "/tasks/", function (data){
                            $.each(data, function(indexTasks, task){
                                addTask(project.id, task.id, task.name, task.status, task.priority);
                                   });  
                        });
                    }
            });
            $('.todolisttab').append('</table>');
        });
    }
    
    
    function addeditBtnContent(project_id){
        return '<div class="glyphicon glyphicon-pencil editprojectbtn left middle" data-project_id="'+ project_id +'" aria-hidden="true"></div><span class="btn-separator"></span>';
    }
    
    function adddelBtnContent(project_id){
        return '<div class="glyphicon glyphicon-trash delprojectbtn left middle" data-project_id="'+ project_id +'" aria-hidden="true"></div>';
    }
    
    function addinputtextContent(project_id){
        return '  <input type="text" id="addlist' + project_id + '" class="form-control text600" placeholder="Start typing here to create a task">';
    }
    
    function addtaskBtnContent(project_id){
        return '<button data-project_id="'+ project_id +'" type="button" class="btn btn-default addtaskbtn btn-success left width120" data-dismiss="modal">Add Task</button>';
    }
    
    function addeditBtnContentTask(task_id, project_id){
        return '<div class="glyphicon glyphicon-pencil edittaskbtn left middle" data-task_id="'+ task_id +'" data-project_id="'+ project_id +'" aria-hidden="true"></div><span class="btn-separator"></span>';
    }
    
    function adddelBtnContentTask(task_id, project_id){
        return '<div class="glyphicon glyphicon-trash deltaskbtn left middle" data-task_id="'+ task_id +'" data-project_id="'+ project_id +'"  aria-hidden="true"></div>';
    }
    
    function addTask(project_id, task_id, task_name, task_status, task_priority){
        $('#list' + project_id).append('<tr><td>' + addStatusCheckbox(task_id, task_status) + '</td><td></td><td id="listcell' + task_id + '" align="left" class="text600">' + task_name + '</td><td><div class="btn-group collapse actionbtn actncolor">' + addPriorityTask(task_id, project_id) + addeditBtnContentTask(task_id, project_id) + adddelBtnContentTask(task_id, project_id) + '</td></div></tr>');
    }
    
    function addProject(project_id, project_name){
        return '<table class="table-hover" id="list' + project_id + '"><tr class="trgrad"><th colspan="2"><span class="glyphicon glyphicon-list-alt"></span></th><th class="projectlistcell text600">' + project_name + '</th><th class="width150"><div class="projectactionbtn collapse">' + addeditBtnContent(project_id) + adddelBtnContent(project_id) + '</div></th></tr>' + '<tr class="trgray"><td><span class="glyphicon glyphicon-plus plusbtn aria-hidden="true"></span></td><td class="no-hover"></td><td class="text600">' + addinputtextContent(project_id) + '</td><td>' + addtaskBtnContent(project_id) + '</td></tr>';
    }
    
    function addStatusCheckbox(task_id, task_status) {
        if(task_status == 'completed'){
        return '<input type="checkbox" value="" data-task_id="' + task_id + '" class="status" checked disabled>';
        } else {
        return '<input type="checkbox" value="" data-task_id="' + task_id + '" class="status">';
        }
    }
    
    function addPriorityTask(task_id, project_id){
        return '<div class="btn-group-vertical left"><span class="glyphicon glyphicon-chevron-up upprioritytaskbtn" data-task_id="'+ task_id +'" data-project_id="'+ project_id +'" aria-hidden="true"></span><hr/><span class="glyphicon glyphicon-chevron-down downprioritytaskbtn" data-task_id="'+ task_id +'" data-project_id="'+ project_id +'" aria-hidden="true"></span></div><span class="btn-separator"></span>';
    }
    
    
        $('.todolisttab').on('click','.upprioritytaskbtn', function(event){
            var project_id = $(event.currentTarget).data('project_id');
            var task_id = $(event.currentTarget).data('task_id');
            var currentRow = $(event.currentTarget).parents('tr');
            var currentRowHtml = $(currentRow).html();
            
             $.ajax({
                  url: '/projects/' + project_id + '/tasks/' + task_id + '/up',
                   type: 'GET',
                  success: function(data){
                        if(!data.errors){
                                $(currentRow).prev().before('<tr>' + currentRowHtml + '</tr>');
                                $(currentRow).remove();
                        }
                  }
              });
            
        });
    
        $('.todolisttab').on('click','.downprioritytaskbtn', function(event){
            var project_id = $(event.currentTarget).data('project_id');
            var task_id = $(event.currentTarget).data('task_id');
            var currentRow = $(event.currentTarget).parents('tr');
            var currentRowHtml = $(currentRow).html();
            
             $.ajax({
                  url: '/projects/' + project_id + '/tasks/' + task_id + '/down',
                   type: 'GET',
                  success: function(data){
                            if(!data.errors){
                                $(currentRow).next().after('<tr>' + currentRowHtml + '</tr>');
                                $(currentRow).remove();
                            }
                  }
              });
             
        });
    
        $('.todolisttab').on('click', '.editprojectbtn', function(event){
            var project_id = $(event.currentTarget).data('project_id');
            $("#myModaledit #hiddenValue").val(project_id);
            $('#myModaledit').modal('show');
            console.log('clickeditprojectbtn');
            $('#name_edit').val('');
        });
        
        $('.todolisttab').on('click', '.delprojectbtn', function(event){
            var project_id = $(event.currentTarget).data('project_id');
            var str = $('#addlist' + project_id).val();
            console.log('clickdelprojectbtn');
            $.ajax({
                url: '/projects/' + project_id,
                type: 'DELETE',
                success: function(data) {
                    console.log(data);
                    $('#list' + project_id).remove();
                }
            });
        });
        
        $('.todolisttab').on('click', '.addtaskbtn', function(event){
            var project_id = $(event.currentTarget).data('project_id');
            var str = $('#addlist' + project_id).val();
            $('#addlist' + project_id).val('');
            console.log('clickaddtask');
            if (str) { 
            $.ajax({
                url: '/projects/' + project_id + '/tasks/',
                type: 'POST',
                data: {"task": {"name": str, "status":"created"}},
                    success: function(data) {
                    console.log(data);
                        if (data.id){
                                    addTask(project_id, data.id, data.name, data.status, data.priority);
                        }
                    }
                });
            }
        });
        
        $('.todolisttab').on('click', '.edittaskbtn', function(event){
            var task_id = $(event.currentTarget).data('task_id');
            var project_id = $(event.currentTarget).data('project_id');
            $("#myModaledittask #hiddenValuetask").val(task_id);
            $("#myModaledittask #hiddenValueproject").val(project_id);
            $('#myModaledittask').modal('show');
            $('#name_edit_task').val('');
            console.log('clickedittask');
        });
        
        $('.todolisttab').on('mouseenter mouseleave', 'tr', function(event){
            if (event.type === "mouseenter"){
                $(event.currentTarget).find('.actionbtn, .projectactionbtn').removeClass("collapse");
            } else {
                $(event.currentTarget).find('.actionbtn, .projectactionbtn').addClass("collapse");
            }    
        });
    
        $('.todolisttab').on('click', '.deltaskbtn', function(event){
            var task_id = $(event.currentTarget).data('task_id');
            var project_id = $(event.currentTarget).data('project_id');
            console.log('clickdeltask');
            $.ajax({
                url: '/projects/' + project_id + '/tasks/' + task_id,
                type: 'DELETE',
                success: function(data) {
                    console.log(data);
                    $(event.currentTarget).parents('tr').remove();
                    }
            });
                 
        });
    
        $('#myModaladd').on('click', '#add', function(e){
            var name = $('#name_add').val();
            $('#name_add').val('');
            if(name){
                $.ajax({
                    url: '/projects/',
                    type: 'POST',
                    data: {"project": {"name": name}},
                    success: function(data) {
                        console.log(data);
                        $('.todolisttab').append(addProject(data.id, data.name));
                    } 
                });
            }
        });
    
        $('#myModaledit').on('click', '#edit', function(e){
                var name = $('#name_edit').val();
                var project_id=$("#hiddenValue").val();
            $.ajax({
                url: '/projects/' + project_id,
                type: 'PUT',
                data: {"project": {"name": name}},
                success: function(data) {
                    console.log(data);
                    $("#list" + project_id + " .projectlistcell").html(name);
                }
            }); 
        });
    
    
        $('#myModaledittask').on('click', '#edittask',function(e){
            var name = $('#name_edit_task').val();
            var project_id=$("#hiddenValueproject").val();
            var task_id=$("#hiddenValuetask").val();
            $.ajax({
                url: '/projects/' + project_id + '/tasks/' + task_id,
                type: 'PUT',
                data: {"task": {"name": name}},
                success: function(data) {
                    console.log(data);
                    $("#list" + project_id + " " + "#listcell" + task_id).html(name);
                }
            });
        });
    
        $('.todolisttab').on('click', '.status', function(e){
            var project_id = $(e.currentTarget).data('project_id');
            var task_id = $(e.currentTarget).data('task_id');
           if ($(e.currentTarget).prop("checked")){
               $.ajax({
                   url: '/projects/' + project_id + '/tasks/' + task_id,
                   type: 'PUT',
                   data: {"task": {"status":"completed"}},
                   success: function() {     
                   }
               });
            } else {
                $.ajax({
                   url: '/projects/' + project_id + '/tasks/' + task_id,
                   type: 'PUT',
                   data: {"task": {"status":"created"}},
                   success: function() {     
                   }
               });
            }
        });
    
        $('#addbtn').click(function(e){
                $('#myModaladd').modal('show');
        });
    
        getAll();
    
});