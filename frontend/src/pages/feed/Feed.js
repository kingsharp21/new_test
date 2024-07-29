import React, { useState, useEffect,useLayoutEffect } from "react";
import Article from "../../components/Article";

import feedService from "../../services/feedService";

import featureService from "../../services/featureService";

import Preferences from "../../components/Preferences";
import Navbar from "../../components/Navbar";
import Error from "../../components/Error";


function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [filteredFeeds, setFilteredFeeds] = useState([]);
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [keyword, setKeyword] = useState('');

  const storedItem2 = localStorage.getItem("preferences");
  const preferences = JSON.parse(storedItem2);


  const [showModel, setShowModel] = useState(false);




  const [filters, setFilters] = useState({
    date: '',
    category: '',
    source: ''
  });

  useLayoutEffect(() => {
    getSources();
    getCategories();
    getAuthors()
  }, []);


  const getFeedByUserPreference = async () => {
    try {
      const category = preferences?.preferred_category || [];
      const source = preferences?.preferred_source || [];
      const author = preferences?.preferred_author || [];

      const res = await feedService.getUserPreferenceFeed({
          "preferred_category": category,
          "preferred_source": source,
          "preferred_author": author
      });

      setFeeds(res);
      setFilteredFeeds(res);
  } catch (err) {
      console.log(err);
  }
  }

  const searchKeyword = async (vv) => {
    try {
      const res = await feedService.search({ keyword: vv });
      setFeeds(res);
      setFilteredFeeds(res);
    } catch (err) {
      console.log(err);
    }
  }

  const getSources = async () => {
    try {
      const res = await featureService.getSources();
      setSources(res);
    } catch (err) {
      console.log(err);
    }
  }

  const getCategories = async () => {
    try {
      const res = await featureService.getCategories();
      setCategories(res);
    } catch (err) {
      console.log(err);
    }
  }

  const getAuthors = async () => {
    try {
      const res = await featureService.getAuthors();
      setAuthors(res);
    } catch (err) {
      console.log(err);
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  useEffect(() => {
    if (preferences) {
        getFeedByUserPreference();
    }
}, []);



  useEffect(() => {
    if (keyword === '' && !filters.date && !filters.category && !filters.source) {
      getFeedByUserPreference();
    } else {
      filterFeeds();
    }
  }, [feeds, filters, keyword]);

  const filterFeeds = () => {
    const filtered = feeds.filter((result) => {
      const matchesDate = filters.date ? new Date(result.published_at).toISOString().split('T')[0] === new Date(filters.date).toISOString().split('T')[0] : true;
      const matchesCategory = filters.category ? result.category === filters.category : true;
      const matchesSource = filters.source ? result.source === filters.source : true;

      return matchesDate && matchesCategory && matchesSource;
    });

    setFilteredFeeds(filtered);
  }


  // const getValueById = (data,id) => {
  //   console.log(data);
  //   const item = data.find(obj => obj.id === id);
  //   return item ? item.name : '';
  // };



  return (
    <div className="feed">
      {showModel && <Preferences sources={sources} authors={authors} categories={categories} modelfxn={setShowModel} modelstate={showModel}/>}
      
      <Navbar showPreferenceModel={setShowModel}/>
  

      <div className="container feed-container">
        <div className="feed-header">
          <h2>News</h2>
          <p>Read the news online and save the trees</p>
        </div>
        <div className="filter-input search">
          <label>Search News</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              searchKeyword(e.target.value);
            }}
            placeholder="Search news..."
          />
        </div>
        <div className="filter grid">
          <div className="filter-input source">
            <label>Filter By Sources</label>
            <select name="source" id="" onChange={handleFilterChange}>
              <option value={''}>select sources</option>
              {sources.map((val, index) => (
                <option key={index} value={val.id}>{val.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-input category">
            <label>Filter By Category</label>
            <select name="category" id="" onChange={handleFilterChange}>
              <option value={''}>select category</option>
              {categories.map((val, index) => (
                <option key={index} value={val.id}>{val.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-input date">
            <label>Select Start Date</label>
            <input
              type="date"
              name="date"
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <p className="total-feeds">
          {`Total ${filteredFeeds.length} news found in this search criteria`}
        </p>
        {filteredFeeds.length === 0 &&
         <Error/>
        }
        {filteredFeeds.length > 0 &&

          <div className="feed-cards grid">

            {filteredFeeds.map((val, index) => {
            const author = authors.find(obj => obj.id == val.author) || { name: val.author };
            const category = categories.find(obj => obj.id == val.category) || { name: 'Unknown Category' };
            const source = sources.find(obj => obj.id == val.source) || { name: 'Unknown Source' };
             return(
                <Article
                key={index}
                img={val.urlToImage}
                apiname={author.name}
                source={source.name}
                category={category.name}
                title={val.title}
                url={val.url}
                date={val.published_at}
                desc={val.content}
              />
             ) 
            }
            )
          }
          </div>
        }

      </div>
    </div>
  );
}

export default Feed;