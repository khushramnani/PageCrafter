"use client"
import { useParams } from 'next/navigation';

const Username = () => {
  const params = useParams();
  const username = params.username;

  return (
    <div >
      {username}
    </div>
  );
};

export default Username;
