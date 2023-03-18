import { redirect } from 'next/navigation';

const Home = async () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const year  = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day   = date.getDate().toString().padStart(2, "0");
  const dateString = `${year}-${month}-${day}`; 
  redirect(`/${dateString}`);
}

export default Home
