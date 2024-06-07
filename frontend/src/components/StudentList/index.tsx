import { Student } from '../../contexts/studentsContext';
import StudentCard from '../StudentCard';

type StudentListProps = {
  students: Student[];
};

const StudentList = ({ students }: StudentListProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-6">
      {students?.map(s => (
        <StudentCard
          key={s.id}
          id={s.id}
          name={`${s.firstname} ${s.lastname}`}
          email={s.email}
          grade={s.grade}
        />
      ))}
    </div>
  );
};

export default StudentList;
