import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { parseState, parseDate, parseTime, LocalStorageService } from '../utils';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import React from 'react';

export const DeviceDetail = React.forwardRef(({ deviceId, name }, ref) => {
  const AUTH_TOKEN = LocalStorageService.getItem('token')
  const [data, setData] = useState([])
  const [dataMode, setDataMode] = useState('history')
  const [alertData, setAlertData] = useState({})
  const downloadDataRef = useRef([])
  const [isLoading, setIsLoading] = useState(false)

  async function getAlert() {
    const alertUrl = `https://iotapi.mobiiot.in/msapp/v1/alerts/get_alert`
    fetch(alertUrl, {
      method: 'POST',
      body: JSON.stringify({
        deviceId
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    }).then(res => res.json())
      .then(({ response }) => {
        const { alertHigh, alertLow } = response;
        setAlertData({
          alertHigh, alertLow
        })
      }).catch(err => {
        console.log(err)
      })
  }
  async function getDeviceData() {
    const deviceDataUrl = `https://iotapi.mobiiot.in/msapp/v1/alerts/get_history/${deviceId}`
    fetch(deviceDataUrl, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    }).then(res => res.json())
      .then(({ response = [] }) => {
        if (response) {
          if (dataMode === 'history') {
            setData(response.map(d => (
              {
                ...d,
                ...parseState(d.state),
                createdAt: parseDate(d.createdAt),
                parsedTime: parseTime(d.updatedAt),
                updatedAt: parseDate(d.updatedAt)
              }
            )))
          } else {
            const today = new Date().toLocaleDateString()
            const parsedData = response.filter(d => {
              const updatedParsed = parseDate(d.updatedAt);
              return today === updatedParsed

            }).reverse().map(d => (
              {
                ...d,
                ...parseState(d.state),
                createdAt: parseDate(d.createdAt),
                parsedTime: parseTime(d.updatedAt),
                updatedAt: parseDate(d.updatedAt)
              }
            )).slice(0, 10)
            setData(parsedData)
          }
        } else {
          setData(null)
        }

      }).catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    let int
    if (deviceId) {
      getDeviceData();
      setAlertData({})
      getAlert();
      int = setInterval(() => {
        getDeviceData()
      }, 5000)

    }

    return () => {
      clearInterval(int);
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId, dataMode, AUTH_TOKEN])

  useImperativeHandle(ref, () => ({
    setLoading: () => setIsLoading(true)
  }))

  const update = (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    const payload = {}
    for (let [key, value] of formData.entries()) {
      payload[key] = value
    }
    payload['deviceId'] = deviceId;
    payload.active = true;
    payload.sent = false;
    fetch(`https://iotapi.mobiiot.in/msapp/v1/alerts/add_alert`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify(payload)
    }).then(res => {
      alert('Max and min updated !')
    }).catch(err => console.log(err))
  }

  const download = () => {
    downloadDataRef.current = data;

    const excelData = downloadDataRef.current.map(d => {
      return {
        Id: d.id,
        DeviceId: d.deviceId,
        Temperature: d.temperature ?? '',
        Humidity: d.humidity ?? '',
        UpdatedAt: d.updatedAt,
        CreatedAt: d.createdAt,
        Time: d.parsedTime
      }
    })

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetnl.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(excelData);

    const excelBuffer = XLSX.write({ Sheets: { "data": ws }, SheetNames: ['data'] }, { bookType: 'xlsx', type: 'array' });

    const fileData = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(fileData, 'logs' + fileExtension);

  }

  if(isLoading){
    return <div className="empty-placeholder flex-column">
      <div className="loader-5 center"><span></span></div>
    </div>
  }

  if (data === null) {
    return <div className="empty-placeholder flex-column">
      <h3>{name}</h3>
      No data exists for this device to display chart.
      Please contact ADMIN.
    </div>
  }
  if (data.length) {
    return <>
    <h3>{name}</h3>
      <LineChart width={800} height={500} data={data} >
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" dot={null} />
        <Line type="monotone" dataKey="humidity" stroke="red" dot={null} />
        <Legend />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey={dataMode === 'history' ? 'updatedAt' : 'parsedTime'} />
        <YAxis />
        <Tooltip />
      </LineChart>
      <div className="btn-wrapper">
        <div className="btn-content">
          <select value={dataMode} onChange={(e) => setDataMode(e.target.value)}>
            <option value="history">History</option>
            <option value="live">Live</option>
          </select>
          <button className="btn" onClick={download}>Download</button>
        </div>
        <div className="btn-content">
          <form onSubmit={update} className="max-min-form">
            <div className="max-min">
              <input type="text" name="alertHigh" placeholder="Max" defaultValue={alertData.alertHigh ?? ''} />
              <input type="text" name="alertLow" placeholder="Min" defaultValue={alertData.alertLow ?? ''} />
            </div>
            <button className="btn" type="submit">Update</button>
          </form>
        </div>
      </div>
    </>
  } else {
    return (
      <div className="empty-placeholder">
        Click on any of the TILE to view the chart
      </div>
    )
  }


})