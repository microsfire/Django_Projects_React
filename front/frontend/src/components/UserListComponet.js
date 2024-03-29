import React ,{Component} from "react";
import ListComponet from "./ListComponet";
import LoginComponent from "./LoginComponent";


class UserListComponet extends Component {
    state = {list: [], loading: true}

    async componentDidMount() {
        const config = {
            headers: {'Content-Type':'application/json'}
        }
        config.headers['Authorization'] = 'Token ' + localStorage.getItem('token')

        let url = 'http://localhost:8000/list/';
        const response = await fetch(url, config);
        const data = await response.json();
        this.setState({list: data, loading: false});
    }

    render() {
        const listApi = this.state.list;
        let token = localStorage.getItem('token')
        if (!token){
            return <LoginComponent />
        }else{
            return (
            <div>
                {listApi.map(list => <ListComponet key={list.id} listName={list.name} items={list.item_set}/>)}
            </div>
        )
        }

    }
}

export default UserListComponet