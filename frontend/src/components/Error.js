import emptyImg from '../assets/no_data.svg'
function error() {
    return ( 
        <div className="card-body card-body-height" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img width={100} className="avatar avatar-xxl mb-3" src={emptyImg} alt="" data-hs-theme-appearance="default" />
        <p className="card-text">No article to show at this moment</p>
        <p>
          You can also try by setting your <span>preference</span> or altering your filters
        </p>
      </div>
     );
}

export default error;