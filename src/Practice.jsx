import { ToastContainer, toast } from 'react-toastify';

function MyComponent() {
  const notify = () => toast('Hello, this is a toast!');

  return (
    <div>
      <button onClick={notify}>Show Toast</button>
      <ToastContainer />
    </div>
  );
}
export default MyComponent;