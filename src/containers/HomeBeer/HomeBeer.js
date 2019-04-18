import React, { Component } from 'react';
import Request from '../../helpers/Request/Request';
import BeerApi from '../../helpers/Request/BeerApi';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Select } from '../../components/Select/Select';
import { Grid } from '../../components/Grid/Grid';
import { Loader } from '../../components/Loader/Loader';
import { Tabs } from '../../components/Tabs/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './HomeBeer.scss';

export class HomeBeer extends Component {

  constructor() {
    super();

    this.offsetParam = 1;
    this.tasteType = 'beer';

    this.state = {
      tab: 'search',
      moreResults: false,
      loading: true,
      keyword: "",
      filter: "beer_name",
      type: "beer",
      resultList: [],
      offset: 0,
      userLikes: {},
      lastSearch: []
    }
  }

  getUserLikes(cancelFind) {

    Request.getUserLikes('beer')
      .then((data) => {
        this.setState((state, props) => {
          return {
            userLikes: data.val() ? data.val() : {}
          }
        });

        if (!cancelFind) this.findBeers();
      });
  }

  async findBeers(event, loadMore) {
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
        offset = 1;
      };

      let keyword = this.state.keyword;

      let response = await BeerApi[`getBeers`](keyword, this.state.filter, offset);
      response = response.data;
      resultList = resultList.concat(response);
      let moreResultsCheck = response.length === 0 ? false : true;

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

    Request.toogleUserLike('beer', item, this.state.userLikes[item.id] ? !this.state.userLikes[item.id].like : true)
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

  handleFilterChange(event) {

    let value = event.target.value;

    this.setState((state, props) => {
      return {
        filter: value
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
    const scrollHeight = document.body.scrollHeight - document.documentElement.scrollTop;
    const offsetHeight = document.documentElement.offsetHeight;
    if (scrollHeight === offsetHeight && this.state.moreResults && this.state.tab === 'search') {
      this.findBeers.call(this, null, true);
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
        this.findBeers.call(this);
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
      <div className="home-beer-wrapper">

        <section id="home-beer-top-section">
        </section>

        <Tabs
          onClick={this.handleTab.bind(this)}
          tabs={[
            { name: "Search", id: "search" },
            { name: "Likes", id: "likes" }
          ]}
        />

        <section id="home-beer-search" className="rt-flex-container home-beer-search-container">

          <div className="rt-flex-item home-beer-search-area">
            <h2>
              {(() => {
                switch (this.state.tab) {
                  case 'search':
                    return 'Find your favorite beers';
                  case 'likes':
                    return 'Navigate through your most loved beers';
                  default:
                    return null;
                }
              })()}
              
            </h2>

            {this.state.tab === 'search' &&
              <form onSubmit={(event) => this.findBeers(event)} className="rt-flex-container home-beer-filter-form">
                <div className="rt-input-group">
                  <Input value={this.state.keyword} onChange={(event) => this.handleKeywordChange(event)} className="rt-input" type="text" placeholder="Keyword" />
                  <Select onChange={(event) => this.handleFilterChange(event)}>
                    <option value="beer_name">Beer name</option>
                    <option value="ibu_gt">IBU</option>
                    <option value="food">Matching food</option>
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
                          <img alt={item.name} src={`${item.image_url}`} className="home-beer-image-contain" />
                          <figcaption>{item.name}</figcaption>
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