import { Component } from "react"
import ContactsList from "../components/ContactsList/ContactsList"
import ContactsEditor from "../components/ContactsEditor/ContactsEditor"
import { nanoid } from 'nanoid'
import Filter from "../components/Filter/Filter"
import Notiflix from 'notiflix';
const KEY="contacts"
class App extends Component{
  state = {
    contacts:[],
    // contacts: [
    //   {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    //   {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    //   {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    //   {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    // ],
    
    filter:''
  }
  componentDidUpdate(_,prevState)
  {
    if(prevState.contacts!==this.state.contacts)
    {
      localStorage.setItem(KEY,JSON.stringify(this.state.contacts))
    }
  }
  componentDidMount()
  {
    const savedItems=localStorage.getItem(KEY)
    if(savedItems)
    {
      const items=JSON.parse(savedItems)
      this.setState({contacts:items})
    }
    
   
  }
  addContact=({name,number})=>{
    const isAdded=this.state.contacts.some(contact=>contact.name.toLowerCase()===name.toLowerCase() )
    if(isAdded)
    {
      Notiflix.Notify.warning(`${name} is already in contacts`);
      return 1;
    }
    const contact={
      id:nanoid(),
      name,
      number
    }
    
    this.setState((prevState)=>({
      contacts:[contact,...prevState.contacts]
    }))
    
  }
  changeFilter=(evt)=>{
    this.setState({filter:evt.currentTarget.value})
    
  }
  filterContacts=()=>{
    const filtered=this.state.filter.toLowerCase();
    const visibleContacts=this.state.contacts.filter((contact)=>contact.name.toLowerCase().includes(filtered))
    return visibleContacts
  }
  deleteContact=(id)=>{
    this.setState(prevState=>({
      contacts : prevState.contacts.filter(contact=>contact.id!==id)
    }))
  }
  render()
  {
   
    return(
      <div className="container">
          <h1 className="title">Phonebook</h1>
          <ContactsEditor onSubmit={this.addContact}/>
          <Filter value={this.state.filter} onChange={this.changeFilter}/>
          <h1 className="title">Contacts</h1>
          <ContactsList contacts={this.filterContacts()} onDelete={this.deleteContact} items={this.state.contacts}/>
      </div> 
    )
  }
};
export default App
