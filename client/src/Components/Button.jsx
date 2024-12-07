import React from "react"

const Button = ({ name, clickHandler ,classes}) => {
  return (
    <div class={`${classes} m-1 bg-transparent items-center rounded-md justify-center flex border-2 border-[#db569f] shadow-lg hover:bg-[#db569f] text-[#db569f] hover:shadow-[0_0_8px_#9d174d,0_0_16px_#9d174d,0_0_22px_#9d174d] hover:text-white duration-300 cursor-pointer active:scale-[0.98]`}>
      <button onClick={clickHandler} class="px-2 py-1.5 text-nowrap whitespace-nowrap">
        {name}
      </button>
    </div>
  )
}

export default Button
