/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import { Student, useStudentsData } from '../../contexts/studentsContext';
import { Modal } from 'react-responsive-modal';

const StudentView = () => {
  const { id } = useParams();
  const {
    state: { students, resources },
    dispatch,
    setResourcesAction,
    setStudentsAction,
  } = useStudentsData();

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

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
          students: [selectedStudent],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok && selectedStudent) {
        const studentUpdate = {
          ...selectedStudent,
          assignment: `Book ${selectedResource}`,
        };

        const newStudentSet = students.map(s => {
          if (s.id === id) return studentUpdate;
          return s;
        });
        console.log('newStudentSet: ', newStudentSet);
        dispatch(setStudentsAction(newStudentSet));
        onCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const foundStudent = students?.find(student => student.id === id);
    if (foundStudent) setSelectedStudent(foundStudent);
  }, [students]);

  useEffect(() => {
    fetchStudents();
    fetchResources();
  }, []);

  return (
    <div className={styles.studentView}>
      <div className="bg-white p-5 rounded-lg">
        <div className="text-right">
          <button
            className="bg-[#ffdd00] px-4 py-3"
            onClick={() => setOpen(true)}
          >
            Assign Homework
          </button>
        </div>

        <div className="flex items-center">
          <div className="bg-[#e6e6e6] shadow-md p-5 rounded-lg mr-10">
            <Icon icon="icon-park-solid:avatar" width="300" color="#bfbfbf" />
          </div>

          <span>
            <p className="font-thin">
              <span className="font-medium">Name:</span>{' '}
              {`${selectedStudent?.firstname} ${selectedStudent?.lastname}`}
            </p>
            <p>
              <span className="font-medium">Email:</span>{' '}
              {selectedStudent?.email}
            </p>
            <p>
              <span className="font-medium">Class:</span>{' '}
              {selectedStudent?.grade}
            </p>
            <p>
              <span className="font-medium">Assignment:</span>{' '}
              {selectedStudent?.assignment || 'None'}
            </p>
          </span>
        </div>
      </div>

      <Modal
        open={open}
        onClose={onCloseModal}
        classNames={{ modal: 'customModal' }}
        showCloseIcon={false}
      >
        <div className="w-[30rem] min-h-[30rem] mt-10">
          {resources?.map(r => (
            <div
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

export default StudentView;
