fetch('/users/register', {
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'jack@lost.com', password: 'passpass', name: 'jack' }),
    method: 'POST'
}).then((res)=> res.json())
    .then((data)=> console.log(data))
    .catch((err)=> console.log(err.message))