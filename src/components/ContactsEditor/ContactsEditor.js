import { Component } from "react"
import PropTypes from 'prop-types';
import css from "../ContactsEditor/ContactsEditor.module.css"

class ContactsEditor extends Component{
    static propTypes={
        onSubmit:PropTypes.func.isRequired
    }
    state={
        name:"",
        number: ''
    }
    handleChange=(evt)=>{
        const {name,value}=evt.currentTarget;
        this.setState({[name]: value,})

    }   
    handleSubmit=(evt)=>{
        evt.preventDefault();
        if(this.props.onSubmit(this.state)!==1)
        {
            this.reset();
        }
        
    }
    reset=()=>{
        this.setState({name:"",number:""})
    }
render(){
    return(
        <form className={css.form__add} onSubmit={this.handleSubmit}>
            
            <div className={css.form__field}>
                <label className={css.label} htmlFor="name">Name</label>
                <input
                className={css.input}
                type="text" 
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                id="name"
                onChange={this.handleChange}
                value={this.state.name}
                /> 
            </div>
            <div className={css.form__field}>
                <label className={css.label} htmlFor="number">Number</label>
                <input
                className={css.input}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                id="number"
                onChange={this.handleChange}
                value={this.state.number}
                />
            </div>
            <button className={css.form__button} type="submit">Add contact</button>
      
      </form>
    )
}
}




export default ContactsEditor
