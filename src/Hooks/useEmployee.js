import { useEffect, useState } from "react"

const useEmployee = () => {


    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch("http://localhost:4000/getEmployee")
            .then(res => res.json())
            .then(data => {
                setEmployees(data)
                setLoading(true)
            })
    }, [])



    return [employees, setEmployees]
}

export default useEmployee;