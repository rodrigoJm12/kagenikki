export function notify(message){
  if(Notification.permission === 'granted'){
    new Notification('KageNikki', { body: message });
  }
}
