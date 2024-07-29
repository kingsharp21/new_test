import { Link } from "react-router-dom";

function Article({img,apiname,source,title,desc,date,url}) {

    const format_date =(date) =>{
        const arr = date.split(" ");
        let published_date = arr[0];
        return published_date;
    }
    

    return (
      <Link to={url} target='_blank'>
        <article>
          <div class="article-wrapper">
            <figure>
              <img src={img} alt="" />
            </figure>
            <div class="article-body">
              <span>{`${apiname} - `}<span className='source'>{source}</span></span>
              <p className="title">{title}</p>
              <p className="desc">{desc}</p>
              <div className="source-info">
                <span>{source}</span>
                <p>{format_date(date)}</p>
              </div>
            </div>
          </div>
        </article>
      </Link>
    
    );
}

export default Article;