import React , { Component } from 'react';
import {getCurrentNewtwork} from '../../wallet/wallet';

import options from '../../options/options'

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.onChangeOption = this.onChangeOption.bind(this);

    this.state = {
      value:''
    }
  }

  async componentWillMount(){
    const network = await getCurrentNewtwork();
    this.setState({network:network});
  }

  onChangeOption(event){
    this.props.changeNetwork(options.network[event.target.value]);
  }

  render() {

    return (

        <header>
          <form>
            <select onChange={this.onChangeOption}>
              <option value="default" selected disabled hidden>{this.state.network? this.state.network.provider : ''}</option>
              {options.network.map( (option,index) => {return(<option value={index}>{option.provider}</option>)} )}
            </select>
          </form>   
         
        </header>
    );
  }
}
  
  export default Header;