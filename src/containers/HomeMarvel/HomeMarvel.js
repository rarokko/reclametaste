import React, { Component } from 'react';
import Request from '../../helpers/Request/Request';
import MarvelApi from '../../helpers/Request/MarvelApi';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Select } from '../../components/Select/Select';
import { Grid } from '../../components/Grid/Grid';
import { Loader } from '../../components/Loader/Loader';
import { Tabs } from '../../components/Tabs/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './HomeMarvel.scss';

export class HomeMarvel extends Component {

  constructor() {
    super();

    this.offsetParam = 20;
    this.tasteType = 'marvel';

    this.state = {
      tab: 'search',
      moreResults: false,
      loading: true,
      keyword: "",
      type: "Characters",
      resultList: [],
      offset: 0,
      userLikes: {},
      lastSearch: []
    }
  }

  getUserLikes(cancelFind) {

    Request.getUserLikes(this.tasteType)
      .then((data) => {
        this.setState((state, props) => {
          return {
            userLikes: data.val() ? data.val() : {}
          }
        });

        if (!cancelFind) this.findCharacters();
      });
  }

  async findCharacters(event, loadMore) {
    if (event) event.preventDefault();

    //if any search is saved, fill and exits function
    if (this.state.lastSearch.length > 0) {

      this.setState((state, props) => {
        return {
          resultList: state.lastSearch,
          lastSearch: []
        }
      });

      return;
    }

    this.setState((state, props) => {
      return {
        loading: true,
        resultList: loadMore ? state.resultList : []
      }
    });

    try {

      let offset = this.state.offset;
      let resultList = [];

      if (loadMore) {
        offset += this.offsetParam;
        resultList = this.state.resultList;
      } else {
        offset = 0;
      };

      let keyword = this.state.keyword;

      let response = await MarvelApi[`get${this.state.type}`](keyword, offset);
      response = response.data.data;
      resultList = resultList.concat(response.results);
      let moreResultsCheck = (response.count + response.offset) === response.total ? false : true;

      this.setState((state, props) => {
        return {
          moreResults: moreResultsCheck,
          loading: false,
          offset: offset,
          resultList: [...resultList]
        }
      });

    } catch (e) { 

      this.setState((state, props) => {
        return {
          moreResults: false,
          loading: false,
          resultList: []
        }
      });

    }
  }

  toogleLike(item) {

    Request.toogleUserLike(this.tasteType, item, this.state.userLikes[item.id] ? !this.state.userLikes[item.id].like : true)
      .then((data) => {
        this.getUserLikes(true);
      })

  }

  showLikes() {
    
    let likesArray = Object.keys(this.state.userLikes);
    let resultList = [];
    
    likesArray.forEach((item, index) => {
      if (this.state.userLikes[item].item) resultList.push(this.state.userLikes[item].item)
    });

    this.setState((state, props) => {
      return {
        resultList: resultList,
        lastSearch: state.resultList
      }
    });

  }

  handleTypeChange(event) {

    let value = event.target.value;

    this.setState((state, props) => {
      return {
        type: value
      }
    })
  }

  handleKeywordChange(event) {

    let value = event.target.value;

    this.setState((state, props) => {
      return {
        keyword: value
      }
    })
  }

  handleScroll() {

    //Infinite scrolling
    const scrollHeight = (document.body.scrollHeight - document.documentElement.scrollTop) - 100;
    const offsetHeight = document.documentElement.offsetHeight;
    if (scrollHeight <= offsetHeight && this.state.moreResults && this.state.tab === 'search') {
      this.findCharacters.call(this, null, true);
    }
  }

  handleTab(tabId) {
    this.setState((state, props) => {
      return {
        tab: tabId
      }
    });

    switch (tabId) {
      case 'likes':
        this.showLikes.call(this);        
        break;
      case 'search':
        this.findCharacters.call(this);
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    this.getUserLikes();
    window.onscroll = () => this.handleScroll();
  }



  render() {
    return (
      <div className="home-marvel-wrapper">

        <section id="home-marvel-top-section">
          {/* <h1>Marvel Superheroes</h1> */}
        </section>

        <Tabs
          onClick={this.handleTab.bind(this)}
          tabs={[
            { name: "Search", id: "search" },
            { name: "Likes", id: "likes" }
          ]}
        />

        <section id="home-marvel-search" className="rt-flex-container home-marvel-search-container">

          <div className="rt-flex-item home-marvel-search-area">
            <h2>
              {(() => {
                switch (this.state.tab) {
                  case 'search':
                    return 'Find your favorite characters and comics';
                  case 'likes':
                    return 'Navigate through your most loved characters and comics';
                  default:
                    return null;
                }
              })()}
            </h2>

            {this.state.tab === 'search' &&
              <form onSubmit={(event) => this.findCharacters(event)} className="rt-flex-container home-marvel-filter-form">
                <div className="rt-input-group">
                  <Input value={this.state.keyword} onChange={(event) => this.handleKeywordChange(event)} className="rt-input" type="text" placeholder="Keyword" />
                  <Select onChange={(event) => this.handleTypeChange(event)}>
                    <option value="Characters">Character</option>
                    <option value="Comics">Comics</option>
                  </Select>
                  <Button>
                    <FontAwesomeIcon icon='search' />
                  </Button>
                </div>
              </form>
            }

            {this.state.resultList.length > 0 &&
              <Grid className="rt-grid-container">
                {
                  this.state.resultList.map((item, index) => {
                    return (
                      <div key={`result_${index}`}>
                        <figure>
                          <img alt={item.name} src={`${item.thumbnail.path}.${item.thumbnail.extension}`} />
                          <figcaption>{item.name || item.title}</figcaption>
                          <i>
                            <FontAwesomeIcon icon={
                              this.state.userLikes[item.id] && this.state.userLikes[item.id].like === true ? ['fas', 'heart'] : ['far', 'heart']}
                              onClick={() => this.toogleLike(item)}
                            />
                          </i>
                        </figure>
                      </div>
                    )
                  })
                }
              </Grid>
            }

            {(!this.state.loading && this.state.resultList.length === 0) &&
              <p>No registers.</p>
            }

            {this.state.loading &&
              <Loader />
            }

          </div>

        </section>

      </div>
    )
  }

}