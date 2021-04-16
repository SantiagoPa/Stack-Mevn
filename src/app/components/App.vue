<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand p-2">MEVN Stack</a>
        </nav>

        <div class="container-fluid">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTask">
                                <div class="form-group">
                                    <input type="text" v-model="task.title" placeholder="Insert a Task" class="form-control">
                                </div>
                                <div class="form-group pt-2">
                                    <textarea  cols="30" rows="10" class="form-control" v-model="task.description" placeholder="Insert a description"></textarea>
                                </div>
                                <div class="d-grid py-2">
                                    <div v-if="edit === false" class="d-grid py-2">
                                        <button class="btn btn-primary">Send</button>
                                    </div>
                                    <div v-else class="d-grid py-2">
                                        <button class="btn btn-primary">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks" :key="task._id">
                                <td>{{task.title}}</td>
                                <td>{{task.description}}</td>
                                <td>
                                    <div class="row row align-items-center">
                                        <div class="col">
                                             <button @click="deleteTask(task._id)
                                            " class="btn btn-danger 
                                            btn-sm">
                                                delete
                                            </button>
                                        </div>
                                        <div class="col">
                                            <button @click="editTask(task._id)"
                                            class="btn btn-secondary btn-sm">
                                                edit
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
    class Task{
        constructor(title,description){
            this.title = title;
            this.description = description;
        }
    }

    export default{
        data(){
            return{
                task: new Task(),
                tasks: [],
                edit: false,
                taskToEdit: ''
            }
        },
        created(){
            this.getTasks();
        },
        methods:{
            sendTask(){
                if (this.edit === false){
                    fetch('/api/tasks',{
                        method: 'POST',
                        body: JSON.stringify(this.task),
                        headers:{
                            'Accept':'application/json',
                            'Content-type': 'application/json'
                        }
                    }).then(res => res.json())  
                      .then(data => {
                        this.getTasks()
                        });
                }else{
                    fetch('/api/tasks/' + this.taskToEdit,{
                        method: 'PUT', 
                        body: JSON.stringify(this.task),
                        headers:{
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    }).then(res => res.json())
                      .then(data => {
                          this.getTasks();
                          this.edit = false;
                      });
                }
                this.task = new Task();
            },
            getTasks(){
                fetch('/api/tasks')
                        .then(res => res.json())
                        .then(data => {
                            this.tasks = data;
                        });
            },
            deleteTask(id){
                fetch('api/tasks/' + id, {
                    method: 'DELETE',
                    headers:{
                        'Accept': 'Aplication/json',
                        'Content-type': 'Aplication/json'
                    }
                }).then(res => res.json())
                  .then(data => {
                      this.getTasks();
                  });
            },
            editTask(id){
                fetch('/api/tasks/'+ id)
                    .then(res => res.json())
                    .then(data=> {
                        this.task = new Task(data.title,data.description);
                        this.taskToEdit = data._id;
                        this.edit=true;
                    });
            }
        }
    }
</script>
