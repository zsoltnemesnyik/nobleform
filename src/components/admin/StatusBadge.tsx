import { styles } from "@/lib/constants";


const StatusBadge = ({ status }: { status: string }) => {
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
            {status}
        </span>
    )
}

export default StatusBadge