
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import "../Css/Error.css"

const Err404 = () => {
    const navigate = useNavigate();

    const buttonRock = () => {
      navigate(-1);
    };
  return (
    <>
    <div className='fondo-img'>

    <Button onClick={buttonRock}  className='button-retroced'>Volver hacia atras</Button>

    </div>
    </>
  )
}

export default Err404
