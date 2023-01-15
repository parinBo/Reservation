export interface IResponse {
  msg: string,
  status: string,
  data:any
}

export function responseData(msg:string, status:string, data?:any):IResponse {
  return {
    msg,
    status,
    data
  }
}

export const STATUS_CODE ={
  OK : '200',
  CREATED : '201',
  BAD_REQUEST: '400',
  UNAUTHORIZED: '401',
  NOT_FOUND: '404',
  METHOD_NOT_ALLOWED: '404',
  INTERNAL_SERVER_ERROR: '500',
  BAD_GATEWAY: '502',
  SERVER_UNAVAILABLE: '503',
  GATEWAY_TIMEOUT: '504',
}

export const STATUS_MESSAGE ={
  success : 'success',
  error: 'error'
}
