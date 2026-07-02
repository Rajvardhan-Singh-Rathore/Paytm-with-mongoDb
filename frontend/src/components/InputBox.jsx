export function InputBox({placeholder,label,onChange}){
    return(
        <div className="container text-zinc-900 p-1 flex flex-col gap-1 items-start">
            <h3 className="font-md text-2xl text-zinc-800">{label}</h3>
            <input onChange={onChange} className="leading-none w-full h-14 rounded-md font-xl text-zinc-700 font-thin px-3 py-2 outline-none border border-zinc-600 focus:border-2 focus:border-zinc-900 focus:text-zinc-900" placeholder = {placeholder}></input>
        </div>
    )
}