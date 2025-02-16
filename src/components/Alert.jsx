import { AlertTriangle, Logs } from "lucide-react";

export default function Alert({ level, title, description, date }) {

    const formatStyles = (lev) => {
        const styles = {
            High: "red",
            Medium: "yellow",
            Low: "green",
        }

        return styles[lev];
    }

    const dt = new Date(date);

    return (
        <div className={`p-4 rounded-lg bg-${formatStyles(level)}-50`}>
            <div className="flex items-center">
                {level == "Low" ?
                    <Logs size={30} className={`text-${formatStyles(level)}-500`} />
                    :
                    <AlertTriangle size={30} className={`text-${formatStyles(level)}-500`} />
                }

                <h3 className={`ml-2 font-semibold text-${formatStyles(level)}-700`}>{title}</h3>
            </div>
            <p className={`px-9 mt-2 text-sm text-${formatStyles(level)}-600`}>
                {description}
            </p>

            <span className="text-xs text-gray-600 float-end">{dt.toDateString() + " - " + dt.toLocaleTimeString()}</span>
        </div>
    )
}