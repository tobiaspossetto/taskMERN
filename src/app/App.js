import React, { Component} from 'react';
import {render} from 'react-dom';


class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            _id: '',
            tasks: []
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.deleteTask = this.deleteTask.bind(this);
    }
    addTask(e){
        e.preventDefault();

        if(this.state._id){
            fetch('/api/tasks/' + this.state._id,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

                .then(
                    
                    M.toast({html: 'Tarea Actualizada'}),
                    this.setState({
                        title: '',
                        description: '',
                        _id: ''
                    }),
                    this.fetchTasks()
                )
        }else{
            fetch('/api/tasks',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
    
                 .then(res =>res.json())
                 .then(data => {
                     console.log(data)
                     M.toast({html: 'Tarea Guardada'})
    
                     this.setState({
                         title: '',
                         description: ''
                     });
                     this.fetchTasks();
    
    
                })
                 .catch(err => console.log(err));
        }
        


    }

    deleteTask(id){
        if(confirm('Are you sure you want to delete')){

            fetch('/api/tasks/'+id,{
                method: 'DELETE',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(
                    this.fetchTasks(),
                    M.toast({html: 'Tarea Eliminada'})
                )
        }


    }

    editTask(id){
        fetch('/api/tasks/'+id,{})
            .then(res => res.json())
            .then(data => {
                console.log(data),
                this.setState({title: data.title, description: data.description,_id: data._id})
                
            
                }
            )
    }


    //Funcion que monta lo que pongamos ni bien carga la app
    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/tasks')
            .then( res => res.json())
            .then(data => {
                console.log(data)
                this.setState({tasks:data})
                console.log(this.state.tasks)
            })
    }

    handleChange(e){
        const {name,value} = e.target;
        this.setState({
            [name]:value
        });
    }
    render() {
        return(
            <div>
                
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN STACK</a>
                    </div>
                </nav>


                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input value={this.state.title} name='title' onChange={this.handleChange} type="text" placeholder="Task Title"></input>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea value = {this.state.description} name='description' onChange={this.handleChange} className='materialize-textarea' placeholder="Task Description"></textarea>
                                            </div>
                                        </div>

                                        <button className="btn light-blue darken-4" type="submit">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>

                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task =>{
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                     <td>{task.description}</td>
                                                     <td>
                                                         <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4" style={{margin:'4px'}}><i className="material-icons">delete</i></button>
                                                         <button  onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{margin:'4px'}}><i className="material-icons">edit</i></button>
                                                     </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;