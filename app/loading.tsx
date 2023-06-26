import "./loading.css";

export default async function CustomLoading() {
  return (
    <div className="loading__container">
      <div className="preloader">
	    <div className="preloader__square"></div>
	    <div className="preloader__square"></div>
	    <div className="preloader__square"></div>
	    <div className="preloader__square"></div>
	  </div>
	  <div className="status">
        Loading
        <span className="status__dot">.</span>
        <span className="status__dot">.</span>
        <span className="status__dot">.</span>
      </div>
    </div>
  );
}