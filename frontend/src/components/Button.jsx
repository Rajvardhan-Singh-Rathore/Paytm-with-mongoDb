export function Button({label,onClick}){
    return(
        <button onClick={onClick} className="cursor-pointer min-w-[92%] text-white w-1/2 px-3 py-2 bg-zinc-800 rounded-md font-md text-xl">{label}</button>
    )
}