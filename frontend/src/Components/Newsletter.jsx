import React from 'react'

function Newsletter() {
  return (
    <main className='h-[80vh] m-3 '>
        <form noValidate className='w-1/2 m-auto p-5 flex flex-col border'>
            <input autoFocus className='border p-2 m-5' type="email" />
            <input className="bg-red-500 rounded-xl p-2" type="button" value="Subscribe" />
        </form>
    </main>
  )
}

export default Newsletter