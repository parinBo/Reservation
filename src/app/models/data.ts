export interface ResponseModel{
  status:string,
  msg: string,
  data:any
}

export interface Core{
  map:string,
  time: string
}


export interface Seat{
  status:number,
  id:string
}


export  class dataControl {
  static mapId:string = ''
  static date:string = ''
  static timeId:string = ''
  static seat:Seat[]
  static listBuilding:any[]
}

export interface OrderTable {
  level: number,
  name: string,
  seatId: string,
  placeId: string,
  startTime: string,
  endTime: Date
}
