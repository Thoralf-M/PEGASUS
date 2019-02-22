import React , { Component } from 'react';
import { trytesToAscii } from '@iota/converter'


import './Data.css'

class Data extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.showHideData = this.showHideData.bind(this);

        this.state = {
            hidden : {}
        } 
    }

    componentWillMount(){
        this.setState( () => {
            let hidden = {};
            this.props.data.forEach ( channel => {
                hidden[channel.deviceName] = false;
            });
            return {
                hidden
            }
        });
    }

    showHideData(data){
        this.setState( state => {
            let hidden = this.state.hidden;
            hidden[data.deviceName] = !hidden[data.deviceName];
            return {
                hidden
            }
        })
    }

    render() {
      return (
          <div className="data">
            <div className="row">
                <div className="col-2">
                    <button onClick={() => this.props.onClose()} type="button" className="close btn-close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div className="col-10"/>
            </div>

             <div className="data-list">
                {this.props.data.map( channel => {
                    return (
                        <div className="container-data">
                            <div className="row data-item">
                                <div onClick={() => this.showHideData(channel)} className="col-12 text-center data-name">{channel.deviceName}</div>
                            </div>

                            <div className="data-hidden">
                                {this.state.hidden[channel.deviceName] ? 
                                channel.messages.map( message => {
                                    return (
                                        <div className="row data-item-hidden">
                                            <div className="col-12 text-center">{trytesToAscii(message)}</div>
                                        </div>
                                    )
                                })
                                : ''}
                            </div>
                        </div>
                    )
                })}
            </div>
          </div>
       
      );
    }
  }

export default Data;