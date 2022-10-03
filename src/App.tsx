import { useState } from 'react';

export class Education {
  SchoolName: string;
  FromYear: Date;
  ToYear: Date;

  constructor(schoolName: string, fromYear: Date, toYear: Date) {
    this.SchoolName = schoolName;
    this.FromYear = fromYear;
    this.ToYear = toYear;
  }
}

export interface EducationCardProps {
  education: Education;
  onEdit(education: Education): void;
}

function EducationCard(props: EducationCardProps): JSX.Element {
  const { education, onEdit } = props;

  function onEditClickedListener() {
    onEdit(education);
  }

  // format date to YYYY-MM-DD
  const formatFromDate = education.FromYear.toISOString().split('T')[0];
  const formatToDate = education.ToYear.toISOString().split('T')[0];

  return (
    <div
      className="border m-2 border-1 rounded-lg border-slate-400 bg-yellow-200 shadow-teal-400 px-6 py-4"
      onClick={onEditClickedListener}
    >
      <h1 className="text-lg font-bold">{education.SchoolName}</h1>
      <h3 className="text-sm">
        <span className="italic font-normal text-sm">{'(' + formatFromDate + ')'}</span>-
        <span className="italic font-normal text-sm">{'(' + formatToDate + ')'}</span>
      </h3>
    </div>
  );
}

function FormInput(props: { addEducation(education: Education): void }): JSX.Element {
  const [schoolName, setSchoolName] = useState('');
  const [fromYear, setFromYear] = useState('2022-01-01');
  const [toYear, setToYear] = useState('2022-05-01');

  function onAddClickedListener() {
    const fromYearInDate = new Date(fromYear);
    const toYearInDate = new Date(toYear);
    props.addEducation(new Education(schoolName, fromYearInDate, toYearInDate));
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-bold">School Name</label>
      <input
        className="border border-gray-400 rounded-lg p-2"
        type="text"
        placeholder="School Name"
        autoComplete="off"
        value={schoolName}
        onChange={e => {
          setSchoolName(e.target.value);
          console.log(schoolName);
        }}
      />

      <label className="text-sm font-bold">
        From Year <span className="text-sm text-slate-900 font-thin">(m-d-y)</span>
      </label>
      <input
        className="border border-gray-400 rounded-lg p-2"
        type="date"
        placeholder="From Year"
        value={fromYear}
        onChange={e => {
          const date = new Date(e.target.value);
          // input format yyyy-MM-dd
          // add 0 to month and day if less than 10
          const formattedDate = `${date.getFullYear()}-${
            date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
          }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;

          setFromYear(formattedDate);
          console.log(fromYear);
        }}
      />

      <label className="text-sm font-bold">
        To Year <span className="text-sm text-slate-900 font-thin">(m-d-y)</span>
      </label>
      <input
        className="border border-gray-400 rounded-lg p-2"
        type="date"
        placeholder="To Year"
        value={toYear}
        onChange={e => {
          const date = new Date(e.target.value);
          // format yyyy-MM-dd
          // add 0 to month and day if less than 10
          const formattedDate = `${date.getFullYear()}-${
            date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
          }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;

          setToYear(formattedDate);
          console.log(toYear);
        }}
      />

      <div className="flex flex-row my-2 justify-end gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 transition duration-400 px-3 py-2 text-white rounded-lg p-2 mt-2 w-full"
          onClick={onAddClickedListener}
        >
          Save
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 px-3 py-2 transition duration-400 text-white rounded-lg p-2 mt-2 w-full"
          onClick={() => {
            setSchoolName('');
            setFromYear('2022-01-01');
            setToYear('2022-05-01');
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function EducationList(): JSX.Element {
  const [educationList, setEducationList] = useState<Education[]>([
    new Education('School 1', new Date('2020-01-01'), new Date('2020-05-01')),
    new Education('School 2', new Date('2020-05-01'), new Date('2020-09-01')),
    new Education('School 3', new Date('2020-09-01'), new Date('2021-01-01')),
    new Education('School 4', new Date('2021-01-01'), new Date('2021-05-01')),
    new Education('School 5', new Date('2021-05-01'), new Date('2021-09-01')),
  ]);

  const handleEdit = (education: Education): void => {
    console.log(education.SchoolName);
  };

  const handleAdd = (education: Education): void => {
    setEducationList([...educationList, education]);
  };

  // map and sort from last to first
  const educationListItems = educationList
    .map(education => <EducationCard key={education.SchoolName} education={education} onEdit={handleEdit} />)
    .reverse();

  return (
    <div className="flex flex-col w-full max-w-xl border border-1 border-slate-500 p-10 rounded-lg shadow-lg shadow-slate-400">
      <FormInput addEducation={handleAdd} />
      <div className="mt-3 scroll-smooth overflow-x-hidden overflow-y-scroll  border border-1 border-slate-2 p-3 rounded-md shadow-md max-h-80">
        {educationListItems}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <div className="m-10 flex flex-col justify-center items-center min-w-5xl">
        <h1 className="m-5 text-lg font-sans font-bold px-5 py-3 border border-1 border-slate-300 rounded-2xl">
          EDUCATION
        </h1>
        <EducationList />
      </div>
    </>
  );
}
