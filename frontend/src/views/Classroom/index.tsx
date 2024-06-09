/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useStudentsData } from '../../contexts/studentsContext';
import StudentList from '../../components/StudentList';
import { Modal } from 'react-responsive-modal';

const Classroom = () => {
  const {
    setStudentsAction,
    setResourcesAction,
    setAssignmentAction,
    state,
    dispatch,
  } = useStudentsData();
  const { students, resources, classAssignment } = state;
  const NameOfClass = students[0]?.grade;

  const [open, setOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState('');

  const onCloseModal = () => {
    setSelectedResource('');
    setOpen(false);
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:3000/students');
      const data = await res.json();
      dispatch(setStudentsAction(data.students));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchResources = async () => {
    try {
      const res = await fetch('http://localhost:3000/resources');
      const data = await res.json();

      dispatch(setResourcesAction(data.resources));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssign = async () => {
    try {
      const res = await fetch('http://localhost:3000/assignment', {
        method: 'POST',
        body: JSON.stringify({
          name: `Book ${selectedResource}`,
          date: 'Monday',
          resources: [`Book ${selectedResource}`],
          students,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        dispatch(setAssignmentAction(`Book ${selectedResource}`));
        onCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!students.length) {
      fetchStudents();
    }
    if (!resources.length) {
      fetchResources();
    }
  }, []);

  return (
    <div className={`${styles.classroom}`}>
      <div className="flex justify-between items-center mb-10">
        <div className="text-xl">
          <p>Class: {NameOfClass}</p>
          <p>Homework: {classAssignment || 'None'}</p>
        </div>
        <button
          className="bg-[#ffdd00] px-4 py-3"
          onClick={() => setOpen(true)}
        >
          Assign Homework
        </button>
      </div>

      <StudentList students={students} />

      <Modal
        open={open}
        onClose={onCloseModal}
        classNames={{ modal: 'customModal' }}
        showCloseIcon={false}
      >
        <div className="w-[30rem] min-h-[30rem] mt-10">
          {resources?.map((r, i) => (
            <div
              data-testid={`book-[${i + 1}]`}
              key={r.id}
              className="bg-white shadow-md mb-5 p-5 rounded-lg cursor-pointer"
              onClick={() => {
                if (selectedResource === r.id) {
                  setSelectedResource('');
                } else {
                  setSelectedResource(r.id);
                }
              }}
            >
              <p>Book {r.id}</p>

              {selectedResource === r.id && (
                <button
                  className="bg-[#ffdd00] px-4 py-2 rounded-lg mt-5"
                  onClick={handleAssign}
                >
                  Assign
                </button>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Classroom;
