export const API_URL =`${import.meta.env.VITE_REACT_APP_API_URL}/tasks`;


export const fetchTasks=async()=>{
    const res=await fetch(API_URL);
    return res.json();
}

export const addTaskApi=async(task)=>{
    const res=await fetch(API_URL,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(task),
    })
    return res.json();
}

export const deleteTaskApi=async(id)=>{
    await fetch(`${API_URL}/${id}`,{method:"DELETE"})
}