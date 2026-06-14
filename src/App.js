import { useState, useEffect } from "react"
import './App.css'

function App() {
  const [jobs, setJobs] = useState([])
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState("Applied")

  useEffect(()=>{
    fetch("http://localhost:5000/jobs")
       .then((res)=>res.json())
       .then((data)=>setJobs(data))
  },[])

  async function addJob() {
    const newJob = { company: company, status: status }
    const res = await fetch("http://localhost:5000/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newJob)
    })
    const savedJob = await res.json()
    setJobs([...jobs, savedJob])
    setCompany("")
  }
  
  async function deleteJob(id) {
  await fetch(`http://localhost:5000/jobs/${id}`, {
    method: "DELETE"
  })
  setJobs(jobs.filter((job) => job._id !== id))
  }

  return (
  <div>
    <h1>Job Tracker</h1>
    <p>Total Jobs:{jobs.length}</p>

    <div className="form">
      <input
        placeholder="Company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <select onChange={(e) => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <button className="add-btn" onClick={addJob}>Add Job</button>
    </div>

    {jobs.map((job, index) => (
      <div className="job-card" key={index}>
        <div className="job-info">
          <h3>{job.company}</h3>
          <p>{job.status}</p>
        </div>
        <button className="delete-btn" onClick={() => deleteJob(job._id)}>Delete</button>
      </div>
    ))}
  </div>
)
}

export default App
