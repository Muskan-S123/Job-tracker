import { useState, useEffect } from "react"
import './App.css'

function App() {
  const [jobs, setJobs] = useState([])
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState("Applied")
  const [editingId, setEditingId] = useState(null)

  useEffect(()=>{
    fetch("https://job-tracker-backend-e3uk.onrender.com/jobs")
       .then((res)=>res.json())
       .then((data)=>setJobs(data))
  },[])

  async function addJob() {
    
  console.log("editingId is:", editingId)
 
  
    const newJob = { company: company, status: status }
    if(editingId){
      console.log("PUT URL:", `https://job-tracker-backend-e3uk.onrender.com/jobs/${editingId}`)
      const res = await fetch(`https://job-tracker-backend-e3uk.onrender.com/jobs/${editingId}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(newJob)
      })
      const updatedJob = await res.json()
      setJobs(jobs.map((job) => job._id === editingId ? updatedJob:job))
      setCompany("")
      setEditingId(null)


    }
    else{
      const res = await fetch("https://job-tracker-backend-e3uk.onrender.com/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newJob)
    })
    const savedJob = await res.json()
    setJobs([...jobs, savedJob])
    setCompany("")
    }
    
  }
  
  async function deleteJob(id) {
  await fetch(`https://job-tracker-backend-e3uk.onrender.com/jobs/${id}`, {
    method: "DELETE"
  })
  setJobs(jobs.filter((job) => job._id !== id))
  }

  function editJob(job) {
  setCompany(job.company)
  setStatus(job.status)
  setEditingId(job._id)
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
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
        <button className="edit-btn" onClick={() => editJob(job)}>Edit</button>
      </div>
    ))}
  </div>
)
}

export default App
