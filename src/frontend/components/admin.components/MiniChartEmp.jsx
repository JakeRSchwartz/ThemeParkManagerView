import { useState } from 'react'
import '../../styles/admin.styles/tiktitle.css'
import { BsTools } from 'react-icons/bs'
import axios from 'axios'
import { useEffect } from 'react'
import { FaPerson } from 'react-icons/fa6'
import axiosApi from '../../axiosInstance'


function MiniChartEmp () {
  const [num, setNum] = useState('')
  useEffect(() => {
    axiosApi.get('/admin/NumEmpNow').then(res => {
      const number = res.data.count
      setNum(number)
    })
  }, [])

  return (
    <>
      <div className='TikTitle'>
        <h3>Employees Working:</h3>
        <div className='TikNum'>
          {num ? num : '0'}
          <FaPerson size={50} style={{marginLeft:'5px'}} />
        </div>
      </div>
    </>
  )
}

export default MiniChartEmp
