import { Icon } from '@iconify/react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

type StudentCardProps = {
  id: string;
  name: string;
  email: string;
  grade: string;
};

const StudentCard = ({ id, name, email, grade }: StudentCardProps) => {
  return (
    <Link to={`/student/${id}`}>
      <div
        className={`${styles.studentCard} shadow-md rounded-lg flex justify-center items-center text-sm`}
      >
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Icon
              icon="icon-park-solid:avatar"
              width="100"
              height="100"
              color="#bfbfbf"
            />
          </div>
          <p>{name}</p>
          <p>{email}</p>
          <p>{grade}</p>
        </div>
      </div>
    </Link>
  );
};

export default StudentCard;
