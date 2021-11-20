import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ReactLoader from 'react-loader-spinner';

const Loader = props => {
  return (
    <ReactLoader
      className="Loader"
      type="TailSpin"
      color="#303f9f"
      height={50}
      width={50}
      timeout={3000} //3 secs
    />
  );
};

export default Loader;
