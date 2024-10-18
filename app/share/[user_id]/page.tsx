import React from 'react';

interface ISharePageProps {
  params: { user_id: string };
}

// http://localhost:3000/share/cde553b9-27bf-44be-9be0-6632645cab37
const page: React.FC<ISharePageProps> = ({params}) => {
  return (
    <div>
      share page
    </div>
  );
};

export default page;
