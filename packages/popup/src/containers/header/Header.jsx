import React, { Component } from 'react';

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.switchNetwork = this.switchNetwork.bind(this);
    this.addCustomNetwork = this.addCustomNetwork.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      showNetworks: false
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showNetworks: false });
    }
  }

  switchNetwork(network) {
    this.setState({ showNetworks: false });
    this.props.changeNetwork(network);
  }

  addCustomNetwork() {
    this.setState({ showNetworks: false });
    this.props.addCustomNetwork();
  }

  render() {
    return (
      <header>
        <div className='row'>
          <div className='col-2 container-header-logo'>
            <img src='./material/logo/pegasus-64.png' height='40' width='40' alt='pegasus logo' />
          </div>
          <div className='col-1'></div>
          <div className='col-8'>
            <div className='row container-selection'>
              <div className='col-2'> <i className='fa fa-signal'></i></div>
              <div className='col-8 text-center'>{this.props.network.name}</div>
              <div className='col-2'>
                <div onClick={e => { this.setState({ showNetworks: !this.state.showNetworks }); }} className='float-right'>
                  {this.state.showNetworks ? <span className='fa fa-chevron-up'></span> : <span className='fa fa-chevron-down '></span>}
                </div>
              </div>
            </div>
          </div>
          <div className='col-1'></div>
        </div>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-9 '>
            {
              this.state.showNetworks ?
                <div ref={ref => this.wrapperRef = ref} className='container-hidden-network'>
                  <div className='container-hidden-network-header'>Nodes</div>
                  <div className='container-hidden-network-body'>
                    {
                      this.props.networks.map((network, index) => {
                      return (
                        <div onClick={() => this.switchNetwork(network)} className='container-hidden-network-item'>

                          <div className='container-icon-check'>
                            {this.props.network.name === network.name ?
                              <span className='fa fa-check'></span>
                              : ''}
                          </div>
                          {this.props.network.name === network.name ?
                            <div className='container-hidden-network-item-name-selected'>{network.name}</div>
                            : <div className='container-hidden-network-item-name-not-selected'>{network.name}</div>}
                        </div>
                        );
                      })
                    }
                    <hr className="bg-grey ml-1 mr-1 mt-1 mb-1" />
                    <div onClick={() => this.addCustomNetwork()} className='container-hidden-network-item'>
                      <div className='container-hidden-network-item-name-not-selected'>Add custom Node</div>
                    </div>
                  </div>
                </div>
              : ''}
          </div>
          <div className='col-1'></div>
        </div>
      </header>
    );
  }
}

export default Header;