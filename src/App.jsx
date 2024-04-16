
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } 
  from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {

  // Util function: Add new job (pass this function to the child component)
  const addJob = async (newJob) => {
    const result = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    });
    return;
  };

  // Util function: Delete job (pass this function to the child component)
  const deleteJob = async (id) => {
    // console.log('delete', id);
    const result = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE'
    });
    return;
  };

  // Util function: Add new job (pass this function to the child component)
  const updateJob = async (job) => {
    const result = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job)
    });
    return;
  };

  // Main router function
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = '/' element = { <MainLayout /> } >
          <Route index 
                 element = { <HomePage /> } />
          <Route path = '/jobs' 
                 element = { <JobsPage /> } />
          <Route path = '/add-job'
                 element = { <AddJobPage addJobSubmit={ addJob } /> } />
          <Route path = '/jobs/:id'
                 element = { <JobPage deleteJob={ deleteJob } /> }
                 loader = { jobLoader } />
          <Route path = '/edit-job/:id'
                 element = { <EditJobPage updateJobSubmit={ updateJob } /> }
                 loader = { jobLoader } />
          {/* Catch-all route */}
          <Route path = '*' 
                 element = { <NotFoundPage /> } />
      </Route>
  ));

  return ( <RouterProvider router={router} /> );
}

export default App;

