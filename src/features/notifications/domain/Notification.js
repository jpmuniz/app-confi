
function Notification({ id, message, status, createdAt, userId }) {
    return Object.freeze({
      id,
      message,
      status, 
      createdAt,
      userId
    });
}

export { Notification }