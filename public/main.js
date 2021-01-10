
const updateBtn = document.querySelector('#update-button')
const deleteBtn = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

updateBtn.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'kirk',
      quote: 'Beam me up Scotty!'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(() => {
      location.reload()
    })
})

deleteBtn.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'kirk'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'There are no quotes by kirk') {
        messageDiv.textContent = 'There are no quotes by kirk'
      } else {
        window.location.reload()
      }
    })
})