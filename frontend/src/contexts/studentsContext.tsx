/* eslint-disable react-refresh/only-export-components */
import {
  useContext,
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';

const SET_STUDENTS = 'SET_STUDENTS';
const SET_ASSIGNMENT = 'SET_ASSIGNMENT';
const SET_RESOURCES = 'SET_RESOURCES';

export interface Student {
  avatar: string;
  email: string;
  firstname: string;
  grade: string;
  id: string;
  lastname: string;
  schoolId: string;
  assignment?: string;
}

interface Resource {
  id: string;
  type: string;
}

type StateType = {
  students: Student[];
  classAssignment: string;
  resources: Resource[];
};

type ActionType =
  | {
      type: 'SET_STUDENTS';
      payload: Student[];
    }
  | {
      type: 'SET_ASSIGNMENT';
      payload: string;
    }
  | {
      type: 'SET_RESOURCES';
      payload: Resource[];
    };

const initialState: StateType = {
  students: [],
  classAssignment: '',
  resources: [],
};

interface StudentsContextProps {
  state: StateType;
  dispatch: Dispatch<ActionType>;
}

const StudentsContext = createContext<StudentsContextProps | undefined>(
  undefined
);

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case SET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case SET_ASSIGNMENT:
      return {
        ...state,
        classAssignment: action.payload,
      };
    case SET_RESOURCES:
      return {
        ...state,
        resources: action.payload,
      };
    default: {
      return state;
    }
  }
};

const StudentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StudentsContext.Provider value={{ state, dispatch }}>
      {children}
    </StudentsContext.Provider>
  );
};

const setStudentsAction = (payload: Student[]): ActionType => ({
  type: SET_STUDENTS,
  payload,
});

const setAssignmentAction = (payload: string): ActionType => ({
  type: SET_ASSIGNMENT,
  payload,
});

const setResourcesAction = (payload: Resource[]): ActionType => ({
  type: SET_RESOURCES,
  payload,
});

function useStudentsData() {
  const context = useContext(StudentsContext);

  if (context === undefined) {
    throw new Error('useStudentData must be used within StudentsProvider');
  }

  const { state, dispatch } = context;

  return {
    state,
    dispatch,
    setStudentsAction,
    setResourcesAction,
    setAssignmentAction,
  };
}

export { StudentsProvider, useStudentsData };
