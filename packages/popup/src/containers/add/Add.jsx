import React, { Component } from 'react';
import IOTA from '@pegasus/lib/iota';

import Loader from '../../components/loader/Loader';
import { PopupAPI } from '@pegasus/lib/api';


class Add extends Component {
  constructor(props, context) {
    super(props, context);

    this.addAccount = this.addAccount.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goOn = this.goOn.bind(this);
    this.updateStatusInitialization = this.updateStatusInitialization.bind(this);
    this.randomiseSeedLetter = this.randomiseSeedLetter.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);

    this.state = {
      name: '',
      seed: [],
      randomLetters: 10,
      randomizedLetter: [],
      isLoading: false,
      initialization: [true, false, false],
      indexInitialization: 0,
    };
  }

  async componentDidMount() {
    const seed = await PopupAPI.generateSeed();
    this.setState({ seed });
  }

  goBack() {
    this.updateStatusInitialization(this.state.indexInitialization, false);
    this.setState({ indexInitialization: this.state.indexInitialization - 1 });
  }

  async goOn() {
    this.updateStatusInitialization(this.state.indexInitialization, true);
    this.setState({ indexInitialization: this.state.indexInitialization + 1 });

    if (this.state.indexInitialization === 2) {
      this.setState({ isLoading: true });
      await this.addAccount();
      this.setState({ isLoading: false });
      this.props.onBack();
    }
  }

  updateStatusInitialization(index, action) {
    this.setState(state => {
      const initialization = state.initialization;
      initialization[index] = false;
      action ? initialization[index + 1] = true : initialization[index - 1] = true;
      return {
        initialization,
      };
    });
  }

  async randomiseSeedLetter(index) {
    if (!this.state.randomizedLetter.includes(index) && this.state.randomLetters > 0) {
      this.setState({ randomizedLetter: [...this.state.randomizedLetter, index] });
      this.setState({ randomLetters: this.state.randomLetters - 1 });
    }

    const letter = await PopupAPI.generateSeed(1);
    this.setState(state => {
      const seed = state.seed;
      seed[index] = letter[0];
      return {
        seed
      };
    });
  }

  copyToClipboard(e) {
    const seed = this.state.seed.toString().replace(/,/g, '')
    const textField = document.createElement('textarea');
    textField.innerText = seed;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    this.setState({ isCopiedToClipboard: true });
  }

  async addAccount() {
    return new Promise(async (resolve, reject) => {
      try {
        const promisedSeed = await PopupAPI.generateSeed()
        const seed = promisedSeed.toString().replace(/,/g, '');
        const data = await IOTA.getAccountData(seed);
        const account = {
          seed: seed,
          name: this.state.name,
          network: this.props.network,
          data: data
        };
        await PopupAPI.addAccount(account, this.props.network, true);
        resolve(account);
      } catch (err) {
        console.log(err);
        reject('Impossible to create the account');
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.isLoading ?
          <Loader />
          : (<div>
            {
              this.state.initialization[0] ?
                <div className="container">
                  <div className='row mt-5 mb-3'>
                    <div className='col-12 text-center text-lg text-blue'>Let's add a name</div>
                  </div>
                  <div className='row mt-8'>
                    <div className='col-12'>
                      <label htmlFor='inp-name' className='inp'>
                        <input value={this.state.name} onChange={e => { this.setState({ name: e.target.value }); }} type='text' id='inp-name' placeholder='&nbsp;' />
                        <span className='label'>name</span>
                        <span className='border'></span>
                      </label>
                    </div>
                  </div>
                </div>
                : ''
              }
            {this.state.initialization[1] ?
              <div className="container">
                <div className='row mt-2'>
                  <div className='col-12 text-center text-lg text-blue'>
                    Let's generate a seed
                                    </div>
                </div>
                <div className='row mb-2 mt-1'>
                  <div className='col-12 text-center'>
                    Press <i className='text-blue text-bold'>{this.state.randomLetters >= 0 ? this.state.randomLetters : 0}</i> more letters to randomise them
                                    </div>
                </div>
                {[0, 9, 18, 27, 36, 45, 54, 63, 72].map(item => {
                  return (
                    <div className='row pl-3'>
                      <div className='col-1'></div>
                      {Array.from(new Array(9), (x, i) => i + item).map(index => {
                        return (
                          <div className='col-1'>
                            <div onClick={() => this.randomiseSeedLetter(index)} className='container-letter'>{this.state.seed[index]}</div>
                          </div>
                        );
                      })}
                      <div className='col-1'></div>
                    </div>
                  );
                })}
              </div>
              : ''
            }
            {
              this.state.initialization[2] ?
                <div className="container">
                  <div className='row mt-3 mb-3'>
                    <div className='col-12 text-center text-lg text-blue'>Let's export the seed</div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-12 text-center text-bold'>Take care to copy the seed in order to correctly reinitialize the wallet </div>
                  </div>
                  <div className='row mt-5'>
                    <div className='col-1'></div>
                    <div className='col-10 text-center text-no-overflow text-xxs'>
                      {this.state.seed.toString().replace(/,/g, '')}
                    </div>
                    <div className='col-1'></div>
                  </div>
                  <div className='row mt-6'>
                    <div className='col-12 text-center'>
                      <button onClick={this.copyToClipboard} className='btn btn-blue text-bold btn-big'><span className='fa fa-clipboard'></span> Copy to clipboard</button>
                    </div>
                  </div>
                </div>
              : ''
            }
            <div className='container-menu-init'>
              <div className='row'>
                <div className='col-6 text-center pl-0 pr-0'>
                  <button disabled={this.state.initialization[0] ? true : false} onClick={this.goBack} type='submit' className='btn btn-light-blue text-bold no-border'><span className='fa fa-arrow-left'></span></button>
                </div>
                <div className='col-6 text-center pl-0 pr-0'>
                  <button disabled={this.state.initialization[0] ? (this.state.name.length > 0 ? false : true) :
                    this.state.initialization[1] ? (this.state.randomLetters === 0 ? false : true) : ''}
                    onClick={this.goOn}
                    type='submit'
                    className='btn btn-blue text-bold no-border'
                  ><span className='fa fa-arrow-right'></span>
                  </button>
                </div>
              </div>
            </div>

          </div>
          )}
      </div>
    );
  }
}

export default Add;