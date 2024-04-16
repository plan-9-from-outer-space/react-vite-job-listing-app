
import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {

  // const jobListings = isHome ? jobs.slice(0, 3) : jobs;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
        // 'http://localhost:5555/jobs?_limit=3' : 'http://localhost:5555/jobs';
      try {
        const results = await fetch(apiUrl);
        const data = await results.json();
        setJobs(data);
      } catch (error) {
        console.log('Error fetching daata', error);
      } finally {
        // Insert a fake delay to see the spinner
        // setTimeout(() => { setLoading(false); }, 500);
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          { isHome ? 'Recent Jobs' : 'Browse Jobs' }
        </h2>
          {/* Loop over the jobs and display a card for each one */}
          { loading ? ( <Spinner loading={loading} /> ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job}/>
              ))}
            </div>
          )}
      </div>
    </section>
  );
};

export default JobListings;

