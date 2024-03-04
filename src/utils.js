export const parseState = (state) => {
 return {
  temperature: state.split('_')?.[0],
  humidity: state.split('_')?.[1],
 }
}

export class LocalStorageService {
 static setItem(key, value){
    localStorage.setItem(key, JSON.stringify(value))
  }
  static getItem(key){
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null
  }
}


export const WEB_AUTH_TOKEN = 'hY2NvdWmFwcuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA4NTIyNzE3Mjc3LWVn29MTEzOTc5MDUyOTc3NTQ5NjQ0MDg4IiwiZW1haWwiXQiOjE2NDEyMTEzNzIsImV4cCI6MTY0MTITM1OTczODJjZmQ'


export const parseTime = (date) => {
  return new Date(date).toLocaleTimeString()
  }
export const parseDate = (date) => {
return new Date(date).toLocaleDateString()
}
// 
// 