import { INQUIRY_STATUS_CONFIG } from "@/lib/constants";


const StatusBadge = ({ status }: { status: string }) => {
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${INQUIRY_STATUS_CONFIG[status as keyof typeof INQUIRY_STATUS_CONFIG]}`}>
            {status}
        </span>
    )
}

export default StatusBadge