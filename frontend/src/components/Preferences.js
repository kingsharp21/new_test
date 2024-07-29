import React, { useState, useEffect } from "react";

import preferenceService from "../services/preferenceService";

function Preferences({sources,categories,authors,modelfxn}) {
    const [checkedsources, setCheckedSources] = useState([]);
    const [checkedcategories, setCheckedCategories] = useState([]);
    const [checkedauthors, setCheckedAuthors] = useState([]);
    const storedItem = localStorage.getItem("user");
    const userData = JSON.parse(storedItem);
    const storedItem2 = localStorage.getItem("preferences");
    const preferences = JSON.parse(storedItem2);

    const[apiErrorMsg, setApiErrorMsg] = useState('')
    const[sucessMsg, setSucessMsg] = useState('')



  const handleCheckboxChange = (id,section) => {
    switch (section) {
      case 'sources':
        setCheckedSources((prevCheckedItems) => {
          if (prevCheckedItems.includes(id)) {
            return prevCheckedItems.filter(item => item !== id);
          } else {
            console.log([...prevCheckedItems, id]);
            return [...prevCheckedItems, id];
          }
        });
        break;
      case 'categories':
        setCheckedCategories((prevCheckedItems) => {
          if (prevCheckedItems.includes(id)) {
            return prevCheckedItems.filter(item => item !== id);
          } else {
            console.log([...prevCheckedItems, id]);
            return [...prevCheckedItems, id];
          }
        });
        break;
      case 'authors':
        setCheckedAuthors((prevCheckedItems) => {
          if (prevCheckedItems.includes(id)) {
            return prevCheckedItems.filter(item => item !== id);
          } else {
            console.log([...prevCheckedItems, id]);
            return [...prevCheckedItems, id];
          }
        });
        break;
      default:
        break;
    }
   
  };


  const handlePreferences = async (event)=>{
    event.preventDefault()
    try {
      const res = await preferenceService.savePreference({
        "user_id" : userData.id,
        "preferred_source" : checkedsources,
        "preferred_category" : checkedcategories,
        "preferred_author" : checkedauthors
      });

      console.log(res);
      if (res) {
        localStorage.setItem('preferences', JSON.stringify(res));
        setSucessMsg('Your preferences are updated !!')
      }
    } catch (err) {
      console.log(err);
      setApiErrorMsg('Sorry we could update your preferences, Try again later')
    }
  }

  const setPreferences = ()=>{
    setCheckedAuthors(preferences.preferred_author || []);
    setCheckedCategories(preferences.preferred_category || []);
    setCheckedSources(preferences.preferred_source || []);
  }

  useEffect(()=>{
    setPreferences()
  },[])
    return ( 
        <div className="modal fade show" tabIndex={-1}  aria-modal="true" role="dialog" style={{ display: 'block', background: '#11121233' }}>
        <div className="modal-dialog modal-dialog-centered">
          <form onSubmit={handlePreferences} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="uploadFilesModalLabel">Customize your news - set preferences</h5>
              <button type="button" onClick={()=>modelfxn(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <div className="modal-body">
              <div style={{ margin: '1rem auto' }}>
                <h5 className="modal-title">Sources</h5>
                <div className="d-flex flex-wrap gap-2">

                  {sources.map((val, index) => {
                    return (
                      <div className="form-check" key={index}>
                        <input className="form-check-input" type="checkbox" defaultValue id="" onChange={() => handleCheckboxChange(val.id,'sources')}
                          checked={checkedsources.includes(val.id)} />
                        <label className="form-check-label" htmlFor="">
                          {val.name}
                        </label>
                      </div>
                    )
                  })}


                </div>
              </div>
              <div style={{ margin: '1rem auto' }}>
                <h5 className="modal-title">Categories</h5>
                <div className="d-flex flex-wrap gap-2">

                  {categories.map((val, index) => {
                    return (
                      <div className="form-check" key={index}>
                       <input className="form-check-input" type="checkbox" defaultValue id="" onChange={() => handleCheckboxChange(val.id,'categories')}
                          checked={checkedcategories.includes(val.id)} />
                        <label className="form-check-label" htmlFor="">
                          {val.name}
                        </label>
                      </div>
                    )
                  })}


                </div>
              </div>
              <div style={{ margin: '1rem auto' }}>
                <h5 className="modal-title">Authors</h5>
                <div className="d-flex flex-wrap gap-2">

                  {authors.map((val, index) => {
                    return (
                      <div className="form-check" key={index}>
                       <input className="form-check-input" type="checkbox" defaultValue id="" onChange={() => handleCheckboxChange(val.id,'authors')}
                          checked={checkedauthors.includes(val.id)} />
                        <label className="form-check-label" htmlFor="">
                          {val.name}
                        </label>
                      </div>
                    )
                  })}

                </div>
              </div>


            </div>
            <span className="api-error-msg">{apiErrorMsg &&`${apiErrorMsg}.`}</span>
            <span className="api-valid-msg">{sucessMsg &&`${sucessMsg}.`}</span>
            <div className="modal-footer">
              <button type="button" onClick={()=>modelfxn(false)} className="btn btn-white" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
     );
}

export default Preferences;