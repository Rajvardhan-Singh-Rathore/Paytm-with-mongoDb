export function AppBar(){
    return (
        <div className="topBar text-zinc-800">
            <div className="header w-full h-16 shadow-sm px-6 py-2 flex justify-between items-center">
                <div className="box1 text-xl  font-md"><h2>payTM App</h2></div>
                <div className="box2 flex gap-2">
                    <span><h2 className="text-2xl mt-2">Hello</h2></span>
                    <div className="w-12 flex items-center justify-center text-2xl font-semibold h-12 rounded-full bg-slate-300">U</div>
                </div>
            </div>
        </div>
    )
}