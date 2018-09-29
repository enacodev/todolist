import React, { Component } from 'react';
import Ionicon from 'react-ionicons'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { todo: "", items: [], node: null, message: "" };
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClickItem = this.onClickItem.bind(this);
    }


    render() {
        return (
                <div className="container">
                    <div className="clearfix"><br/></div>
                    <div className="row text-center">
                        <div className="col-md-8 offset-md-2">
                            <h1>TO DO LIST</h1>   
                            <div><br/></div>
                            <input style={{width:'100%'}} type="text" value={this.state.todo} onKeyPress={event => this.onKeyPress(event)} onChange={event => this.onChange(event)}/>  
                        </div>                      
                    </div>
                    <div className="clearfix col-md-8 offset-md-2">
                        <br/>
                        {/* {
                            this.state.message ?
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <Ionicon icon="md-checkmark"/>
                                {this.state.message}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                            </div>
                            : ""
                        }*/}
                    </div>
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <ul className="list-group">
                                {
                                    this.state.items.map((item, i) => 
                                        <li onClick={event => this.onClickItem(event, i, item)} key={i} className={"list-group-item " + (item[0] ? 'list-group-item-success' : '')}>
                                            <div className="row justify-content-between">
                                                <div className="col-4">
                                                    <Ionicon icon={item[0] ? "md-checkbox-outline" : "ios-square-outline"} />
                                                    &nbsp;{item[1]}
                                                </div>
                                                {
                                                    item[0] ?
                                                    <div className="col-4 float-right">
                                                        <Ionicon onClick={event => this.onRemoveItem(event, i, item)} icon="md-close" className="float-right"/>
                                                    </div> :
                                                    ""                                                 
                                                }
                                                
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>   
                    </div>
                </div>
        );
    }

    onChange(event){
         this.setState({todo: event.target.value})
    }

    onKeyPress(event) {
        if (event.key === 'Enter' && this.state.todo.trim() != "") {
          this.state.items.push([false, this.state.todo])
          this.setState({items: this.state.items, todo:''})
          console.log(this.state.items);
        }
    }

    onClickItem(event, index, item){
        this.state.message = "";
        this.state.items[index] = [!this.state.items[index][0], item]; 
        this.setState({items: this.state.items})
        this.state.message = this.state.items[index][0] ? "Marked as done." : "";
    }

    onRemoveItem(event, index, item){
        this.state.items.splice(index, 1);
        this.setState({items: this.state.items})
        this.state.message = "Item removed successfully."
        event.stopPropagation();
    }
}

export default App;
