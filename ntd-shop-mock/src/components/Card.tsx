import '../styles/main.scss';
import '../styles/navbar.scss';
import { CardProps } from '../types/nav.types';
import HeartIcon from './HeartIcon';

const Card = ({ product }: CardProps) => {

  return (
    <div className='card'>
      <img src="/src/assets/placeholder.webp" alt="" />
      <div className='container1'>
        <span>
          {product.title}
        </span>
        <div className='container2'>
          <span>
            {product.type}
          </span>
          <HeartIcon containerSize='34' heartSize='18' beamSize='1.2' translateYFrom='-70%' translateYTo='-100%' scaleY='.3'/>
        </div>
      </div>
    </div>
  );
}


export default Card;
