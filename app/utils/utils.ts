export function daysInThisMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}

export function getTodayDate(): number{
  return new Date().getDate()
  
}