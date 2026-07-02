import { Link } from "react-router-dom";

export function BottomWarning({label,to,linkText}){
    return(
        <div className="warning-box flex justify-center gap-1 items-center w-full px-3 py-1 text-zinc-700 font-md text-sm tracking-tight">
            <div className="warning  leading-none">{label}</div>
            <Link className="cursor-pointer underline hover:text-sky-700" to={to}>{linkText}</Link>
        </div>
    )
}