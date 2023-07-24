import './styles/Loading.css';

export default function Loading() {
  return (
    <>
      <div className="container">
        <div className="row">
            <div className="circle loading-animation"></div>
            <div className="column">
                <div className="line line1 loading-animation"></div>
                <div className="line line2 loading-animation"></div>
            </div>
        </div>
        <div className="column">
            <div className="line line3 loading-animation"></div>
            <div className="line line4 loading-animation"></div>
            <div className="line line5 loading-animation"></div>
        </div>
        <div className="row">
            <div className="box loading-animation"></div>
            <div className="box loading-animation"></div>
        </div>
    </div>
    </>
  );
}
