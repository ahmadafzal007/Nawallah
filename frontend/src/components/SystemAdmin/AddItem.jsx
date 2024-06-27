import React from 'react'

const AddItem = () => {
  return (
    <div>
          <div class="absolute p-4 w-full max-w-lg  ">
          <div class="absolute bg-gradient-to-r from-[#0000003D] to-[#6A6A6A00]  rounded-lg px-4 py-2">
            <button
              type="button"
              class="text-gray-400 bg-white bg-transparent rounded-full  p-0.5 ml-auto flex items-center "
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <h3 class="text-xl text-center font-semibold text-white">
              Adding Sub-Category for mental skills
            </h3>

            <div class="p-3 ">
              <input
                type="text"
                class="bg-[#212121]  text-gray-200 text-sm rounded-lg  block w-full pl-10 p-2.5 mb-5"
                placeholder="Title"
                required=""
              />
            </div>
            <div className="flex items-center justify-center my-2">
              <button class="inline-flex items-center py-2 px-4  text-sm font-medium text-white bg-green-500 rounded-[4px] ">
                ADD
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AddItem