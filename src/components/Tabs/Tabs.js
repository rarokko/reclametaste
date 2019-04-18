import React, { Component } from 'react';
import './Tabs.scss';

export class Tabs extends Component {

  constructor(props) {
    super();

    this.state = {
      activeTab: 0,
      tabs: props.tabs,
      onClick: props.onClick
    }
  }

  activateTab(index, tabId) {
    this.setState((state, props) => {
      return {
        activeTab: index
      }
    });

    this.state.onClick(tabId);
  }

  render() {
    return (
      <div className="rt-tabs">
        {this.props.tabs.map((item, index) => {
          return (
            <div data-activated={this.state.activeTab === index ? 'true' : 'false'} key={`tabs_${index}`} onClick={() => this.activateTab(index, item.id)}>
              <span>{item.name}</span>
            </div>
          )
        })}
      </div>
    );
  }

}